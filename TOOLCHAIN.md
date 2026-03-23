# Video Production Toolchain — Multi-Agent Pipeline Reference

**Audience:** Cthulhu (platform), Ithaqua (animation/production), Dagon (TTS/audio), Hastur (QA)
**Status:** Living document — update as tools evolve

---

## 1. TTS (Text-to-Speech) APIs

### MiniMax TTS API

MiniMax is our current in-pipeline TTS provider. It's cost-effective and supports multiple languages including Chinese and English.

**How it works:**
- REST API: send JSON payload with text, voice ID, and audio settings
- Returns MP3 audio file
- Authentication via API key in request header

**Typical call shape:**
```bash
curl -X POST https://api.minimax.io/v1/t2a_v2 \
  -H "Authorization: Bearer $MINIMAX_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "speech-02-hd", "text": "...", "voice_setting": {...}}'
```

**Voice options:**
- Multiple built-in voices with different genders, accents, and tones
- Voice settings: speed (0.5–2.0), pitch, volume
- `speech-02-hd` = higher quality, `speech-02` = standard

**Pricing:** Significantly cheaper than OpenAI — approximately $0.20–0.50/1K characters depending on voice model. Check current rates on MiniMax developer portal.

**Pros:**
- Affordable at scale
- Good non-English language support
- Fast turnaround

**Cons:**
- Documentation less polished than OpenAI's
- Fewer voice customization options
- Less predictable latency (varies by region)

---

### OpenAI TTS API

OpenAI's TTS is the industry standard for quality.

**Models:**
| Model | Quality | Latency | Price (per 1K chars) |
|---|---|---|---|
| `tts-1` | Standard | Faster | ~$0.015 |
| `tts-1-hd` | High definition | Slower | ~$0.030 |

**Voice styles (built-in):**
- `alloy`, `echo`, `fable`, `onyx`, `nova`, `shimmer`
- Each has a distinct character — `nova` is warm/British-ish, `onyx` is deep/male, `shimmer` is bright/female

**Features:**
- `voice_settings`: `stability` (0–1, how consistent across repeated calls), `similarity_boost` (0–1, how close to the original voice), `style` (0–2, expressiveness), `use_speaker_boost` (boolean)
- Streaming: supports chunked transfer for progressive audio playback
- `instructions` parameter (beta): adjust voice attributes post-generation without re-generating

**Pros:**
- Best-in-class audio quality, especially `tts-1-hd`
- Extremely stable API — never goes down unexpectedly
- Excellent documentation and SDKs
- Good latency for `tts-1` even at high volume

**Cons:**
- ~15–60× more expensive than MiniMax per character
- English-only (or limited multilingual compared to competitors)
- No voice cloning on standard tier

---

### Comparison

| Dimension | MiniMax | OpenAI TTS |
|---|---|---|
| Quality (`tts-1-hd` vs `speech-02-hd`) | Very good | Excellent |
| Non-English support | Good (Chinese, etc.) | Limited |
| Latency | Moderate | Low (`tts-1`), Medium (`tts-1-hd`) |
| Cost | Low | High |
| API stability | Good | Excellent |
| Voice variety | Good | Decent |
| Voice cloning | Available | Not on standard tier |

---

### Recommendation: **Dual strategy**

- **Use MiniMax for production** — cost savings at scale are real. Generate all standard voiceovers with MiniMax.
- **Use OpenAI TTS-1 for QA and previews** — when Dagon or Hastur need to validate script timing or test audio sync, OpenAI is faster and the quality makes review easier.
- **Use OpenAI TTS-1-HD for final polish passes** — short-form content (under 60s) where quality is paramount. Not worth it for long-form.

### API Key Status

| Provider | Config Status | TTS Endpoint | Notes |
|---|---|---|---|
| MiniMax | ✅ API key set in `minimax-cn` provider | `POST https://api.minimax.io/v1/t2a_v2` | Works, confirmed |
| OpenAI TTS | ⚠️ OAuth via `openai-codex` | `POST https://api.openai.com/v1/audio/speech` | May not work — TTS uses different API family than Codex Responses API. **Needs test.** |

**Action needed (winoooops):** Verify OpenAI TTS works with current OAuth token. If it returns 401, need to add a raw OpenAI API key to config.

### Cost Estimate — 4-minute video

| TTS Option | Script length | Cost per video |
|---|---|---|
| MiniMax `speech-02-hd` | ~650 chars | ~$0.20–0.30 |
| OpenAI `tts-1` | ~650 chars | ~$0.01 |
| OpenAI `tts-1-hd` | ~650 chars | ~$0.02 |

**Total TTS cost per video:** < $0.35 (Chinese + English dual-track, using MiniMax for production)

### Implementation Plan

**File structure:**
```
src/
  tts/
    tts-pipeline.ts      # Unified wrapper — routes to MiniMax or OpenAI based on language
    minimax-tts.ts       # MiniMax TTS integration
    openai-tts.ts        # OpenAI TTS integration
assets/
  audio/                 # Generated TTS files — gitignored
    {scene-id}.mp3
```

**Remotion integration:**
- TTS generates `.mp3` files before Remotion render starts
- Import into Remotion via `staticFile('assets/audio/scene-01.mp3')`
- Audio duration read via `getAudioDuration()` from `@remotion/media`
- Sync TTS start time with `<Sequence>` component

**Next step:** Write `src/tts/tts-pipeline.ts`. Requires: (1) confirm OpenAI TTS auth works, (2) MiniMax API key verified.

---

## 2. Remotion Advanced Capabilities

### @remotion/three — 3D via React Three Fiber

**When to use:**
- Animated 3D models, shapes, logo reveals
- Data visualizations with depth (3D bar charts, rotating globes)
- Product showcases with perspective shifts

**Key rules:**
- MUST wrap 3D content in `<ThreeCanvas>` with `width` and `height` props
- MUST include lighting (`<ambientLight>`, `<directionalLight>`)
- **No `useFrame()` from `@react-three/fiber`** — it causes flickering during renders because it runs outside Remotion's frame loop
- All animation MUST be driven by `useCurrentFrame()`:
```tsx
const frame = useCurrentFrame();
const rotationY = frame * 0.02;
<mesh rotation={[0, rotationY, 0]}>...</mesh>
```
- Sequences inside `<ThreeCanvas>` must use `layout="none"`

**Performance:** 3D renders are CPU/GPU intensive. Avoid complex scenes on long compositions. Use `<OffthreadVideo>` (see below) for heavy video layers to unblock 3D rendering.

---

### @remotion/transitions — TransitionSeries

**What it does:** Manages scene sequencing with proper overlap handling at cut points.

**Two modes:**
1. **`<TransitionSeries.Transition>`** — visual blend between scenes (fade, slide, wipe, etc.). Shortens total timeline because scenes overlap during transition.
2. **`<TransitionSeries.Overlay>`** — render an effect on top of a cut without shortening timeline.

Available transitions:
- `fade()` — crossfade
- `slide({ direction: "from-left" | "from-right" | "from-top" | "from-bottom" })`
- `wipe({ direction, borderWidth? })`
- `flip()` — card-flip style
- `clockWipe()` — radial wipe

Timing options:
```tsx
// Constant speed
linearTiming({ durationInFrames: 20 })

// Organic spring physics
springTiming({ config: { damping: 200 } })
```

**Duration math:** If two 60-frame scenes have a 15-frame transition between them, total = 60 + 60 − 15 = **105 frames** (not 135). Transitions always overlap.

**Use Overlay when:** You want a light leak, sound effect, or graphic over a cut without changing timing. Overlay does NOT affect total duration.

---

### @remotion/motion-blur

**How it works:** Frame-rate aware motion blur simulation. In real-world cameras, motion blur occurs because the shutter is open for the entire exposure duration. Remotion's motion blur samples the animation at intermediate temporal positions and blends them.

**When it helps:**
- Fast-moving elements (text sliding across screen, objects spinning)
- Cinematic feel — makes motion look more organic, less robotic
- Reducing strobing on repeated-frame content

**When it doesn't help:**
- Slow, deliberate animations (blurs into mush)
- Already smooth animations (double-smoothing = muddy)
- Very short clips where overhead isn't worth it

**Not in our current project.** Install via `npx remotion add @remotion/motion-blur`. Worth adding to the toolchain when we produce content with fast cuts.

---

### @remotion/paths — Animated SVG Paths

**What it does:** Provides utilities to draw and animate SVG paths — stroke-dasharray, stroke-dashoffset tricks — driven by `useCurrentFrame()`.

**Use cases:**
- Drawing line animations (logo reveals, map traces, signature effects)
- Path-based transitions between shapes
- Any SVG where you want the "pen" effect — line appears to be drawn

**Typical pattern:**
```tsx
const frame = useCurrentFrame();
const progress = interpolate(frame, [0, 60], [0, 1]);
const pathLength = 1000; // measured via getTotalLength()
const strokeDashoffset = pathLength * (1 - progress);
<path d="..." strokeDasharray={pathLength} strokeDashoffset={strokeDashoffset} />
```

**Performance:** SVG path animation is CPU-light. Great for long compositions.

---

### Lottie Integration — @remotion/lottie

**When to use Lottie:**
- Already have a motion graphics asset (from After Effects with Bodymovin export)
- Complex vector animations from designers
- Consistent brand animations that are maintained separately

**When to use Remotion native instead:**
- The animation needs to react to audio data (frequency bars, waveform)
- The animation needs to be data-driven (charts, dynamic numbers)
- We need precise frame-level control synced to other elements

**Lottie in Remotion requires:**
- `delayRender()` / `continueRender()` pattern for async loading
- Animation data (JSON) must be fetched — local file or URL
- `useCurrentFrame()` does NOT drive Lottie (it's its own playback) — use Remotion-native for frame sync

```tsx
const [handle] = useState(() => delayRender());
useEffect(() => {
  fetch(url).then(json => {
    setAnimationData(json);
    continueRender(handle);
  });
}, []);
```

**Verdict:** Use Lottie for designer-supplied assets. Use Remotion-native for anything that needs to be synchronized or data-driven.

---

### Light Leaks — @remotion/light-leaks

**What it does:** WebGL-based light leak overlay — that analog photography artifact where light bleeds into the frame. Reveals during first half of duration, retracts during second half.

**Use cases:**
- Transition overlay between scenes (put in `<TransitionSeries.Overlay>`)
- Aesthetic overlay for cinematic feel
- Dream/memory sequences

**Customization:**
- `seed` — changes the pattern/shape of the leak
- `hueShift` — 0 = warm yellow/orange, 120 = green, 240 = blue

```tsx
// Blue-tinted light leak
<LightLeak seed={5} hueShift={240} />
```

**Works great as TransitionSeries overlay:**
```tsx
<TransitionSeries.Overlay durationInFrames={30}>
  <LightLeak seed={3} />
</TransitionSeries.Overlay>
```

---

### Video Embedding — @remotion/media

**Compositing real footage with animated graphics:**
- Install: `npx remotion add @remotion/media`
- Use `<Video>` component from `@remotion/media` (not the built-in `Video` from `remotion`)
- Position video absolutely and layer animated elements on top

**Key features:**
- `trimBefore` / `trimAfter` — non-destructive trimming (in seconds)
- `volume` — static or dynamic callback `(frame) => number`
- `playbackRate` — speed multiplier (0.25–10×)
- `toneFrequency` — pitch shift without speed change (server-side only)
- `loop` — infinite loop with `loopVolumeCurveBehavior`

**Compositing pattern:**
```tsx
<AbsoluteFill>
  <Video src={staticFile("gameplay.mp4")} style={{ objectFit: "cover" }} />
  <AnimatedLowerThird />
  <CaptionedText />
</AbsoluteFill>
```

**Supported formats:** MP4, WebM, MOV (browser-decodable). For best compatibility, use H.264 MP4.

---

### OffthreadVideo — Heavy Video Decoding

**The problem:** Browser-based video decoding in Remotion runs on the main thread (or worker thread, but still in the same process). For very large video files, high-resolution footage, or many simultaneous video layers, this blocks rendering and causes memory pressure.

**What OffthreadVideo does:** Moves video decoding to a separate process entirely (via ffmpeg + native binary), preventing heavy video I/O from blocking the render.

**When to use:**
- 4K or higher resolution source footage
- More than 2–3 simultaneous video layers
- Very long video files (>5 minutes)
- Server-side rendering (Lambda, Docker) where memory is constrained

**When NOT needed:**
- Short clips (<30s)
- Low resolution (720p or below)
- Single video layer with simple compositing

**Install:** Part of `@remotion/media` on newer Remotion versions. Check with `npx remotion add @remotion/media`.

---

## 3. ffmpeg Pipeline

### Operations We Need

| Operation | Use Case | Command Pattern |
|---|---|---|
| **Trim** | Cut clip to specific start/end | `-ss T -i INPUT -to DURATION -c:v libx264 -c:a aac` |
| **Concat** | Stitch multiple clips together | `concat demuxer` (for different formats) or `concat f` (same format) |
| **Speed change** | 2× timelapse, 0.5× slow-mo | `-filter:v "setpts=2*PTS"` (slower) / `setpts=0.5*PTS` (faster) |
| **Format conversion** | MOV→MP4, WebM→MP4 | `-c:v libx264 -c:a aac` (universal H.264+AAC) |
| **Audio normalization** | Consistent loudness across clips | `-af loudnorm=I=-16:TP=-1:LRA=11` |
| **Extract frame** | Thumbnail, poster image | `-vf "select=eq(n\,30)" -frames:v 1` |
| **Silent strip** | Remove dead air from voice clips | `-af silenceremove=start_periods=1:start_threshold=-50dB` |
| **Audio mix** | Overlay SFX on voice | `-filter_complex amix=inputs=2:duration=longest` |
| **Scale/resize** | Standardize dimensions | `-vf scale=1920:1080:force_original_aspect_ratio=decrease` |

### Recommended Commands

**Trim without frozen frames (critical — always re-encode):**
```bash
ffmpeg -ss 00:00:05 -i input.mp4 -to 00:00:10 -c:v libx264 -c:a aac output.mp4
```
⚠️ Do NOT use `-c:v copy` for trimming — it causes frozen frames at splice points.

**Concatenate clips (same codec):**
```bash
# Create list.txt: "file 'clip1.mp4'\nfile 'clip2.mp4'"
ffmpeg -f concat -safe 0 -i list.txt -c copy output.mp4
```

**Normalize audio to broadcast standard:**
```bash
ffmpeg -i input.wav -af loudnorm=I=-16:TP=-1:LRA=11:print_format=json -f null -
# Read the measured values, then:
ffmpeg -i input.wav -af loudnorm=I=-16:TP=-1:LRA=11:measured_I=...:measured_TP=...:measured_LRA=... output.wav
```

**Speed up audio (2×, pitch-corrected):**
```bash
ffmpeg -i input.mp3 -filter:a "atempo=2.0" output.mp3
```

**Extract audio from video:**
```bash
ffmpeg -i video.mp4 -vn -c:a libmp3lame -q:a 2 audio.mp3
```

### CLI vs Node.js Wrapper

**Use ffmpeg CLI directly when:**
- Scripting in shell or build scripts
- One-off operations (trim, extract audio, normalize)
- Pipeline tasks that don't need conditional logic
- Running in CI/CD scripts

**Use fluent-ffmpeg (or Node.js wrapper) when:**
- Chaining complex filter graphs programmatically
- Need to probe files for metadata before deciding what to do
- Building a Node.js-based pipeline that orchestrates video processing
- Conditional branching based on input properties

**Remotion provides:** `bunx remotion ffmpeg` and `bunx remotion ffprobe` — these are pre-wrapped versions that don't require a separate ffmpeg installation. Use these for Remotion-related operations.

**Recommendation:** Start with CLI scripts for simple operations. Graduate to fluent-ffmpeg only if the pipeline grows complex enough that conditional processing is needed.

---

## 4. Animation Libraries Compatible with Remotion

### Remotion's Built-in Animation (useCurrentFrame)

Remotion provides first-party animation primitives:

**`spring()`** — Physics-based spring animation:
```tsx
const scale = spring({ frame, fps, config: { damping: 200 } });
// Recommended configs:
// { damping: 200 }    — smooth, no bounce (subtle reveals)
// { damping: 20, stiffness: 200 } — snappy (UI elements)
// { damping: 8 }      — bouncy (playful, entrances)
// { damping: 15, stiffness: 80, mass: 2 } — heavy, slow
```

**`interpolate()`** — Map frame numbers to values with easing:
```tsx
const opacity = interpolate(frame, [0, 30], [0, 1], {
  easing: Easing.inOut(Easing.quad),
  extrapolateRight: "clamp",
});
```

**`Easing`** — Built-in easing functions:
- `Easing.in/out/inOut` + `Easing.quad/sin/exp/circle`
- Custom cubic bezier: `Easing.bezier(0.8, 0.22, 0.96, 0.65)`

**Rule: CSS animations are FORBIDDEN.** They don't render correctly in Remotion's headless environment. Tailwind animation classes are also forbidden. Everything must be driven by `useCurrentFrame()`.

**Verdict:** Remotion's built-ins are sufficient for 90% of animations. Learn them well.

---

### react-spring

react-spring v9+ is Remotion-compatible — it can accept `useCurrentFrame()` as the `frame` or `t` parameter:

```tsx
import { useSpring, animated } from "@react-spring/three"; // or @react-spring/react
const frame = useCurrentFrame();
const { scale } = useSpring({ from: { scale: 0 }, to: { scale: 1 }, frame });
```

**When to prefer react-spring over built-ins:**
- You want declarative, physics-based spring animations with the react-spring API
- You have existing react-spring code you want to port
- You prefer react-spring's API ergonomics

**When Remotion built-ins are better:**
- Most cases — no extra dependency
- Precise frame-level control
- Simpler bundle size

**Verdict:** Nice to have but not essential. If Ithaqua is already comfortable with react-spring, it's fine to use. Not worth adopting just for the pipeline.

---

### Framer Motion

Framer Motion is designed for DOM-based UIs, not server-side video rendering. Many Framer Motion features (layout animations, exit animations, gestures) won't work in Remotion's headless environment.

**If using Framer Motion in Remotion:**
- Only use `motion.div` with explicit `animate` values driven by `useCurrentFrame()`
- Don't rely on `AnimatePresence`, `layoutId`, or gesture-based animations
- Essentially becomes a slightly different syntax for the same `useCurrentFrame()`-driven animations

**Verdict:** Not recommended for Remotion. Use Remotion's built-in spring/interpolate instead.

---

### GSAP (GreenSock)

**Short answer:** Yes, GSAP can be used in Remotion, but with caveats.

**The GSAP + Remotion challenge:** GSAP tweens run on its own timeline. To use GSAP in Remotion:
- Use GSAP's `quickTo()` with `useCurrentFrame()` as the time source
- Or use `gsap.to()` with `onUpdate` driven by `useCurrentFrame()`
- Essentially wrapping GSAP to be frame-driven rather than time-driven

**When GSAP makes sense:**
- Complex timeline sequencing (GSAP's Timeline is excellent)
- Animating SVG properties that are awkward in pure React
- When the team already knows GSAP deeply

**When GSAP is overkill:**
- Most Remotion animations are simpler than typical GSAP use cases
- Adds bundle bloat
- Can conflict with Remotion's own timing model

**Verdict:** Avoid unless there's a specific reason. Remotion's built-ins + Sequence component handle complex sequencing adequately. If we ever need GSAP-level timeline control, consider it as an addition, not a replacement.

---

### When to Use Pure CSS/JS vs Library-Driven

| Approach | Best For | Avoid When |
|---|---|---|
| **Remotion built-ins** | Most animations — fades, slides, scaling, simple springs | Complex physics beyond springs |
| **SVG paths (manual stroke-dashoffset)** | Line-drawing effects, logo reveals | Complex path morphing |
| **react-spring** | Teams already using it, physics-heavy UI animations | Simpler use cases, bundle size concerns |
| **GSAP** | Complex multi-element timelines, SVG morphing | Simple fades/slides, SSR renders |

---

## 5. Video Compositing Options (Outside Remotion)

### DaVinci Resolve (Free) vs Adobe Premiere vs Final Cut Pro

**DaVinci Resolve (free):**
- Professional-grade color correction and audio post-processing
- Excellent for: color grading, audio mixing, export encoding
- Free version is remarkably full-featured
- **Best choice for:** When we need professional color work or audio mastering after Remotion renders the animated layers
- **Limitation:** Steeper learning curve, heavier than necessary for simple tasks

**Adobe Premiere Pro:**
- Industry-standard for collaborative video workflows
- Excellent for: multi-track editing, integration with other Adobe tools, frequent revision workflows
- **Subscription required** (~$23/mo)
- **Best choice for:** Teams already in the Adobe ecosystem
- **Limitation:** Subscription cost compounds at scale

**Final Cut Pro (macOS only):**
- Fast, efficient, excellent performance
- **Best choice for:** macOS-only teams producing content quickly
- **Limitation:** Locked to Apple ecosystem — not viable for our Linux/WSL pipeline

**Recommendation:**
- Use **DaVinci Resolve (free)** for color grading and audio mastering of final exports
- If the team already has Premiere licenses, continue using it
- Skip Final Cut unless there's a specific reason

---

### Shotcut (Free, Open Source)

**Strengths:**
- Free, open source, cross-platform (Windows, macOS, Linux)
- Supports FFmpeg under the hood
- Basic multi-track editing, filters, transitions
- Decent for: quick assembly edits, format conversion, basic cutting

**Limitations:**
- Not as polished as Resolve for color/audio work
- UI can be clunky
- Less reliable for complex projects

**When to use:** Quick preview cuts, format conversions, Linux-native simple editing. Not a full compositing solution.

---

### Compositing in Remotion vs External Editing

**Compositing in Remotion:**
- ✅ Single tool for animated content
- ✅ Frame-perfect sync between animation and video
- ✅ Reproducible — code is the source of truth
- ✅ Works in our existing CI/CD pipeline
- ❌ Heavy processing on long compositions
- ❌ Less control over video footage (no color grading in-process)

**External editing (Resolve/Premiere) after Remotion:**
- ✅ Industry tools for what they're best at
- ✅ Better video footage manipulation
- ✅ Audio mastering tools
- ❌ Adds a manual step to the pipeline
- ❌ Version management of project files

**Recommendation:** Keep compositing in Remotion for animated-first content. Export individual layers from Remotion (or use transparent video export) and composite in Resolve only when:
1. Color grading of real footage is needed
2. Complex audio mixing beyond what we can do in ffmpeg
3. The project requires footage that simply can't be handled in-browser

For most of our pipeline — animated graphics over screen recordings, voiceover-driven content — **Remotion is the right compositing tool**.

---

## 6. Subtitle/CC Tools

### autosub

**What it is:** Python-based tool that uses Whisper for transcription, generates SRT/JSON subtitles.

**Usage:**
```bash
pip install autosub
autosub -i input.mp4 -o output.srt --model medium --language en
```

**Pros:** Simple, supports multiple Whisper models, outputs multiple formats
**Cons:** Not actively maintained (last update ~2022). Consider `whisper-auto-caption` fork or direct Whisper.cpp.

---

### Whisper.cpp (via @remotion/install-whisper-cpp)

**The Remotion-native approach:**
```bash
npx remotion add @remotion/install-whisper-cpp
```

**Remotion's recommended workflow:**
1. Install Whisper.cpp via Remotion helper: `installWhisperCpp()`
2. Download a model (e.g., `medium.en`)
3. Transcribe: `transcribe()` → `toCaptions()` → outputs `Caption[]` JSON
4. Put JSON in `public/` folder
5. Display via `@remotion/captions`

**Models available:**
| Model | Size | Accuracy | Speed |
|---|---|---|---|
| `tiny.en` | ~75MB | Low | Fast |
| `base.en` | ~140MB | Medium | Fast |
| `small.en` | ~500MB | Good | Medium |
| `medium.en` | ~1.5GB | Very good | Slow |
| `large` | ~3GB | Best | Slowest |

**For our pipeline:** Use `medium.en` as default — good accuracy without the memory/latency cost of `large`.

**Preprocessing:** Whisper prefers 16KHz audio. Convert first:
```bash
ffmpeg -i input.mp4 -ar 16000 -ac 1 audio.wav -y
```

---

### Other Options

**Whisper (OpenAI's official):**
- Python: `pip install openai-whisper`
- Much larger model weights, GPU recommended
- Good if you have GPU budget

**faster-whisper:**
- Optimized CPU implementation of Whisper
- ~4× faster than OpenAI Whisper on CPU
- Good alternative when GPU isn't available

**DeepL/Google Speech-to-Text:**
- Not suitable for subtitle generation — no timestamp alignment
- Only use for translation, not transcription

---

### Remotion-caption Integration

**Display flow:**
1. Generate `Caption[]` JSON (via Whisper.cpp or parse SRT)
2. Use `createTikTokStyleCaptions()` to group words into pages
3. Render with `<Sequence>` per page
4. Optional: word-by-word highlighting with token timestamps

**Import SRT files:**
```tsx
import { parseSrt } from "@remotion/captions";
const { captions } = parseSrt({ input: srtText });
```

**TikTok-style (recommended for our content):**
- Groups words into pages based on `combineTokensWithinMilliseconds` (e.g., 1200ms = ~2-3 words per page)
- Highlights active word with color
- Clean, readable at small sizes

---

### Manual vs Auto Workflow Tradeoffs

| Aspect | Auto (Whisper.cpp) | Manual |
|---|---|---|
| Speed | Slow (especially `medium`/`large`) | Fast for short clips |
| Accuracy | Very good for clean audio; degrades with noise/music/accents | Perfect by definition |
| Cost | Free (compute only) | Human time cost |
| Post-editing | Almost always needed | None |
| Best for | Long content, large volume, consistent audio quality | Short content, technical terms, brand names, <5 min clips |

**Recommendation for our pipeline:**
- **Auto-first with post-edit**: Run Whisper auto, then do a QA pass in a text editor
- **For short clips (<2 min)**: Manual typing is often faster than auto + fix cycle
- **For long content (>5 min)**: Always auto — manual transcription is impractical
- **Use `medium.en`** model by default; upgrade to `large` for heavy accents or poor audio

---

## 7. Recommended Toolchain for Our Pipeline

### Tier 1 — Must-Have (Adopt Now)

These are the tools that should be integrated into the pipeline immediately.

**TTS:**
- **MiniMax TTS API** — primary TTS engine for all production voiceovers
- **OpenAI TTS-1** — QA/preview TTS; short-form final polish (tts-1-hd)

**Remotion Packages:**
- `@remotion/media` — video/audio embedding, trimming, speed change, volume control
- `@remotion/transitions` — scene transitions (fade, slide, wipe, flip, clockWipe)
- `@remotion/light-leaks` — cinematic overlay effects at cut points
- `@remotion/captions` — subtitle display and TikTok-style word highlighting
- `@remotion/install-whisper-cpp` — auto-transcription for captions
- `@remotion/lottie` — for designer-supplied Lottie assets only

**Post-Production:**
- **ffmpeg CLI** — all audio/video preprocessing (trim, normalize, concat, extract audio)
- **DaVinci Resolve (free)** — color grading and audio mastering of final exports

**Animation:**
- **Remotion built-ins** (`spring`, `interpolate`, `Easing`, `useCurrentFrame`) — 90% of all animations
- **SVG path animation** (manual stroke-dashoffset) — line drawing effects

---

---

## Remotion Project Audit — Claude Code Skills Video

**Audited by:** Ithaqua 🌬️ | **Date:** 2026-03-23 | **Project:** `remotion-video` (Claude Code Skills series)

---

### Current Package Inventory

```
@remotion/cli              v4.0.0
@remotion/fonts            v4.0.438
@remotion/transitions      v4.0.438   ← installed but UNUSED in code
@remotion/zod-types        v4.0.0
@remotion/paths            v4.0.438   ← INSTALLED but ZERO usage (!!)
remotion                   v4.0.0
react                      19.2.3
zod                        4.3.6
```

**Notable gaps:** No `@remotion/media`, no `@remotion/motion-blur`, no `@remotion/three`, no `@remotion/captions`.

---

### Current Composition Structure

- **Single composition:** `SkillVideoS08`, 7650 frames @ 30fps, 1920×1080
- **21 scenes** in a linear `Series.Sequence` — no parallel tracks, no branching
- **Audio:** Baked-in via `<Audio src={staticFile("voiceover.mp3")} />` — single stereo track
- **Animation:** `interpolate()` for fades/slides, `spring()` available in HelloWorld examples but not used in production scenes
- **Total weight:** ~15MB export (video) + ~3MB (audio)

---

### What Is NOT Enabled

| Feature | Package | Status | Notes |
|---------|---------|--------|-------|
| Video embedding | `@remotion/media` | NOT INSTALLED | No `<Video>` or `<OffthreadVideo>` — real footage can't be composited |
| Scene transitions | `@remotion/transitions` | INSTALLED, UNUSED | Only manual interpolate fades used — no wipe/slide/glitch |
| SVG motion paths | `@remotion/paths` | INSTALLED, UNUSED | Zero path animations — line draws, morphs, etc. |
| Motion blur | `@remotion/motion-blur` | NOT INSTALLED | No fast-action scenes — not needed yet |
| 3D elements | `@remotion/three` | NOT INSTALLED | No depth effects, no 3D title cards |
| Auto-captions | `@remotion/captions` | NOT INSTALLED | Manual SRT burning — works but slow |
| Audio visualization | `@remotion/media-utils` | NOT INSTALLED | No frequency bars, waveforms, or audiograms |

---

### What CAN Be Added Without Breaking the Pipeline

**Phase 3 (this week):**
- `@remotion/media` — enables `<Video>` and `<OffthreadVideo>` for real clip compositing
- `@remotion/transitions` — TransitionSeries components (wipe, slide, clockWipe) ready to drop in
- `fluent-ffmpeg` — CLI-based clip trimming/normalized before import

**Phase 4 (nice-to-have):**
- `@remotion/three` — only if the script calls for 3D title cards or product showcases
- `@remotion/motion-blur` — only if scenes involve fast camera pans or motion
- `@remotion/captions` — only if auto-subtitling workflow improves turnaround

---

### Video Embedding Proof of Concept (Needed)

Before committing to `@remotion/media`, we need to verify:
1. An mp4 clip can be placed inside a Remotion scene as a background layer
2. Animated React elements can overlay on top of the video
3. `OffthreadVideo` handles decode without blocking render

**Action:** Create `Scene22_VideoEmbedDemo.tsx` — 5-second clip embedded in a scene with animated text overlay. Test on current Remotion v4.0.0.

---

### Tier 2 — Nice-to-Have (Add When Needed)

These tools solve specific problems — adopt when the use case arises.

**Remotion Packages:**
- `@remotion/three` — 3D logo reveals, product showcases, data visualizations with depth. Add when content requires it, not preemptively.
- `@remotion/motion-blur` — fast-moving content where cinematic blur helps. Add per-project.
- `@remotion/media-utils` — audio visualization (frequency bars, waveforms) when we do audiogram-style content or music videos.

**Animation Libraries:**
- **react-spring** — if Ithaqua prefers its API for physics-based springs. Not essential but acceptable.
- **GSAP** — only if we hit the limits of Remotion's built-in timeline sequencing. Unlikely for most projects.

**Video Editing:**
- **Shotcut** — quick Linux-native preview cuts and format conversion. Not a replacement for Resolve.

**Subtitle Workflow:**
- **faster-whisper** (CPU-optimized Whisper) — if rendering is CPU-bound and transcription speed matters.

**Compositing:**
- **OffthreadVideo** — when we start working with 4K footage or multiple simultaneous video layers at scale.

---

### What NOT to Use

These are either redundant, overkill, or actively problematic for our pipeline:

**❌ Framer Motion in Remotion** — Wrong paradigm for server-side rendering. Use built-ins.

**❌ CSS animations or Tailwind animation classes** — Don't render correctly in Remotion. Everything via `useCurrentFrame()`.

**❌ GSAP as default** — Overkill for most Remotion animations. Adds complexity without benefit unless we specifically need its timeline tools.

**❌ Final Cut Pro** — macOS only. Doesn't fit our cross-platform pipeline.

**❌ Premiere subscription** — Only if already in Adobe ecosystem. DaVinci Resolve free version is equally capable for our needs.

**❌ `autosub` as primary tool** — Largely unmaintained. Use `@remotion/install-whisper-cpp` directly.

**❌ Full Adobe Suite** — After Effects is overkill for what Remotion handles. If we need AE, it's because we've outgrown Remotion — at that point, re-evaluate the whole pipeline.

---

### Pipeline Architecture Summary

```
[Script/Content] 
       ↓
[MiniMax TTS] ──→ [Audio Files]
       ↓
[Remotion Project] ← (animated graphics, compositing)
  ├── @remotion/media (video layers from screen recordings)
  ├── @remotion/transitions (scene cuts)
  ├── @remotion/light-leaks (overlay effects)
  ├── @remotion/captions (subtitle display)
  └── @remotion/three (3D elements, if needed)
       ↓
[ffmpeg] ──→ (audio normalization, concat, trim source footage)
       ↓
[Remotion Render] ──→ [MP4 Video]
       ↓
[DaVinci Resolve] ──→ (color grade + audio master)
       ↓
[Final Output]
```

**QA checkpoints:**
- After TTS generation: Dagon reviews audio sync and timing
- After Remotion render: Ithaqua reviews animation smoothness
- After Resolve pass: Hastur reviews final output quality

---

*Document version 1.0 — Last updated: 2026-03-23*

---

## Appendix: Harness Engineering — Video Topic Brief

**Core thesis:** In the agent-first world, scaffolding — linters, architecture, docs, review loops, observability — matters more than the code itself.

**The story:** OpenAI Symphony team: 3 engineers, 5 months, 1M lines of code. Every line written by Codex. The real innovation was what they built *around* Codex.

**Key concepts:**
- The Gap Is Always Yours — bad agent output = gap in what we provided, not model capability
- Lint > Documentation — encode constraints where they can't be ignored, not notes that get ignored
- Architecture as Progressive Disclosure — directional boundaries enforced by build, not aspirational docs
- Taste Compounds — each engineer's taste encoded into shared infrastructure makes all agents better
- Everything is agent-generated: CI, tools, docs, eval harnesses, review comments, dashboards
- Goal = Autonomy: agents that work longer, more reliably, less hand-holding

**Audience:** Developers using AI coding tools (Claude Code, Copilot, Codex). Technical. Struggles with unreliable agent output.

**Viewer takeaway:** The bottleneck isn't the AI — it's your scaffolding. Fix your lint rules, docs, architecture. The fix is yours, not the model's.

**Emotional arc:** Hook ("3 engineers, 1M lines, zero typing") → validate the struggle → reframe → empowering close.
