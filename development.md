# Development System — Remotion Video Pipeline

> Technical rules and patterns for building videos with Remotion.
> Every scene, component, and animation must follow these conventions.

---

## 1. Project Structure

```
remotion-video/
├── src/
│   ├── index.ts              # Entry point — registerRoot(RemotionRoot)
│   ├── Root.tsx               # Composition + TransitionSeries assembly
│   ├── animations.ts          # Shared animation hooks + springConf
│   ├── theme.ts               # Color palette, typography tokens (per-video)
│   ├── scenes/
│   │   ├── HE01_HookScene.tsx
│   │   ├── HE02_SymphonyScene.tsx
│   │   └── ...                # One file per scene
│   ├── components/
│   │   ├── WordReveal.tsx     # Reusable animation components
│   │   ├── FadeIn.tsx
│   │   ├── CodeBlock.tsx
│   │   └── ...
│   └── assets/
│       ├── audio/             # TTS files: part_01.mp3 ... part_NN.mp3
│       ├── images/            # Static images, diagrams
│       └── clips/             # Video clips for compositing
├── public/
│   └── fonts/                 # Custom fonts (.ttf/.woff2)
├── out/                       # Render output (gitignored)
├── scripts/                   # Script + storyboard markdown
├── remotion.config.ts         # Remotion CLI config
├── development.md             # This file
├── art-direction.md           # Visual language reference
├── KANBAN.md                  # Pipeline status board
└── TOOLCHAIN.md               # Tool research + audit
```

## 2. Naming Conventions

### Scenes
- Pattern: `{PREFIX}{NN}_{PascalCaseName}Scene.tsx`
- Example: `HE01_HookScene.tsx`, `HE12_CloseScene.tsx`
- Prefix = 2-letter video abbreviation (HE = Harness Engineering)
- Number = zero-padded 2-digit scene order
- Export: `export const HE01_HookScene: React.FC = () => ...`
- Default export: `export default HE01_HookScene;`

### Components
- Pattern: `{PascalCaseName}.tsx`
- Example: `WordReveal.tsx`, `CodeBlock.tsx`, `DiagramNode.tsx`
- Must be reusable across scenes. If it's scene-specific, inline it in the scene file.

### Audio Files
- Pattern: `part_{NN}.mp3` matching scene numbers
- Example: `part_01.mp3` for Scene 01
- All files in `src/assets/audio/`

### Theme Files
- Per-video theme: `theme-{prefix}.ts` (e.g., `theme-he.ts`)
- Global shared theme: `theme.ts`

## 3. Composition Architecture

### Root.tsx Pattern
```tsx
import { Composition } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

// Frame counts — padded to compensate for crossfade overlaps
const S01 = 342, S02 = 559; // etc.
const XFADE = 20; // ~0.67s crossfade
const TOTAL = sum(durations) - (N_transitions * XFADE);

const VideoComposition: React.FC = () => (
  <TransitionSeries>
    {scenes.map(({ dur, Comp }, i) => (
      <React.Fragment key={i}>
        <TransitionSeries.Sequence durationInFrames={dur}>
          <Comp />
        </TransitionSeries.Sequence>
        {i < scenes.length - 1 && (
          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: XFADE })}
          />
        )}
      </React.Fragment>
    ))}
  </TransitionSeries>
);

export const RemotionRoot: React.FC = () => (
  <Composition
    id="VideoName"
    component={VideoComposition}
    durationInFrames={TOTAL}
    fps={30}
    width={1920}
    height={1080}
  />
);
```

### Rules
- **One Composition per video.** Multiple videos = multiple Composition entries in RemotionRoot.
- **TransitionSeries over Series.** Always use `@remotion/transitions` for scene assembly. Never use raw `Series` — it creates dead black gaps.
- **Crossfade budget.** When adding N crossfades of F frames each, pad scene durations so `sum(durations) - N*F = target_total_frames`. This preserves the original timeline length.
- `index.ts` only calls `registerRoot(RemotionRoot)`. No other logic.

## 4. Scene Component Rules

### Every scene component MUST:
1. Call `useVideoConfig()` directly — never rely on parent scope for `fps`
2. Call `useCurrentFrame()` directly — never pass `frame` as a prop
3. Use `<AbsoluteFill>` as the root element with `backgroundColor: BG`
4. Import `spring` from `"remotion"` and `springConf` from `"../animations"`
5. Be a named export AND a default export

### Every scene component MUST NOT:
1. Import `fps` or `frame` from a parent — TypeScript won't see them in closure
2. Use `setTimeout`, `setInterval`, or any imperative timing — Remotion is declarative
3. Use browser APIs (`document`, `window`) — Remotion renders in a headless environment
4. Hard-code pixel positions for layout — use flexbox/grid. Absolute positioning only for overlays.
5. Contain multi-word strings in array-driven reveal components — split into individual words

### Pattern: Spring Animation
```tsx
const { fps } = useVideoConfig();
const frame = useCurrentFrame();
const t = Math.max(0, frame - triggerFrame);
const entry = spring({ frame: t, fps, config: springConf });
// Use `entry` (0→1) for opacity, scale, translateY, etc.
```

### Pattern: FadeIn Wrapper
```tsx
const FadeIn: React.FC<{ triggerFrame: number; children: React.ReactNode }> = ({ triggerFrame, children }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });
  return (
    <div style={{ opacity: entry, transform: `translateY(${(1 - entry) * 20}px)` }}>
      {children}
    </div>
  );
};
```

### Pattern: Word-by-Word Reveal
```tsx
// ALWAYS split into individual words. Never pass "multiple words" as one array element.
<WordReveal words={["The", "bottleneck", "isn't", "the", "AI."]} startFrame={20} />
// NOT: words={["The bottleneck", "isn't the AI."]}
```

## 5. Animation System

### Shared Config
All spring animations use `springConf` from `src/animations.ts`:
```ts
export const springConf = { damping: 20, stiffness: 200, mass: 0.5 };
```

### Available Hooks (from `animations.ts`)
| Hook | Purpose | Params |
|------|---------|--------|
| `useFadeInUp` | Fade in + slide up | `delay, duration` |
| `useFadeInLeft` | Fade in + slide left | `delay, duration` |
| `useScaleIn` | Scale from 0.9→1 + fade | `delay, duration` |
| `useTypewriter` | Character-by-character text reveal | `text, startFrame, speed` |

### Adding New Animations
1. Add to `animations.ts` as a hook (`use*` prefix)
2. Must use `useCurrentFrame()` internally
3. Return a CSS style object
4. Document in this table

## 6. Transitions

### Between Scenes
- Use `@remotion/transitions` `TransitionSeries` + `fade()` presentation
- Default crossfade: 20 frames (0.67s) with `linearTiming`
- Available presentations: `fade`, `slide`, `wipe`, `flip`, `clockWipe`, `iris`
- To change transition style per-scene boundary, replace the `presentation` prop on that specific `TransitionSeries.Transition`

### Within Scenes
- Use `spring()` for element entrances (staggered by `triggerFrame`)
- Use `interpolate()` for continuous animations (progress bars, counters, fades)
- Avoid `Easing` — spring physics feel more natural for motion graphics

## 7. Audio Integration

### During Development
- Audio files are NOT embedded in Remotion compositions
- TTS is generated separately by Dagon and composited with ffmpeg post-render
- This keeps render times fast and avoids audio sync debugging during animation work

### Post-Render Composite
```bash
# Extract audio from previous composite (if re-rendering video only)
ffmpeg -y -i old-composite.mp4 -vn -acodec copy /tmp/audio.aac

# Mux new video + existing audio
ffmpeg -y -i new-video.mp4 -i /tmp/audio.aac -c:v copy -c:a aac -shortest output.mp4
```

### Future: Embedded Audio
When audio is stable and scene timings are locked:
```tsx
import { Audio, staticFile } from "remotion";
<Audio src={staticFile("audio/part_01.mp3")} />
```

## 8. Rendering

### Development Preview
```bash
npx remotion preview    # Opens browser preview at localhost:3000
```

### Draft Render (fast, low quality)
```bash
npx remotion render VideoName --out=out/draft.mp4
# Default quality — fast iteration
```

### Production Render
```bash
npx remotion render VideoName --out=out/final.mp4 --quality=80 --codec=h264
# Higher quality — for QA review and publishing
```

### Verification
```bash
ffprobe -v error -show_entries stream=codec_type,codec_name,width,height,duration \
  -of default=noprint_wrappers=1 out/output.mp4
```
Expected: h264, 1920×1080, duration within ±0.1s of target.

## 9. TypeScript Rules

- `tsconfig.json`: `strict: true`, `noUnusedLocals: true`, `skipLibCheck: true`
- `skipLibCheck` is required — `@types/web` and `@types/dom-webcodecs` conflict with Remotion's bundled types
- Before every render: `npx tsc --noEmit --skipLibCheck` — zero errors in `src/scenes/HE*` files
- Pre-existing unused variable warnings in legacy files (HelloWorld, SkillVideo) are acceptable
- New scene/component files must have zero TS errors

## 10. Git Conventions

### Commit Messages
```
feat: add HE09_TasteScene with BEFORE/AFTER comparison
fix: word spacing in HE12_CloseScene WordReveal
refactor: migrate Root.tsx from Series to TransitionSeries
docs: add development.md and art-direction.md
chore: update kanban board
```

### Branch Strategy
- `main` — stable, renders clean
- `feat/{scene-name}` — work-in-progress scenes
- `fix/{defect-id}` — QA defect fixes

### What NOT to Commit
- `node_modules/`, `out/`, `dist/`, `.cache/`
- `*.mp4`, `*.mp3`, `*.aac` — media files are too large for git
- `sample-clips/` — reference footage

## 11. Known Constraints

| Constraint | Impact | Workaround |
|-----------|--------|------------|
| Remotion v4 `spring()` requires `fps` | Every child component needs `useVideoConfig()` | Call it at top of every `React.FC` |
| `@types/web` conflicts with Remotion types | TS errors in node_modules | `skipLibCheck: true` |
| No browser APIs in render | Can't use `document`, `window`, `fetch` | Use `staticFile()` for assets, `delayRender()`/`continueRender()` for async |
| `<Video>` tag can be slow for preview | Large clips lag in preview mode | Use `<OffthreadVideo>` from `@remotion/media` |
| Mono 24kHz TTS | Below YouTube broadcast standard | Post-process with ffmpeg: `-ar 48000 -ac 2` |

## 12. Package Inventory

### Installed
| Package | Version | Purpose |
|---------|---------|---------|
| `remotion` | 4.0.0 | Core framework |
| `@remotion/cli` | 4.0.0 | Render CLI |
| `@remotion/fonts` | 4.0.438 | Font loading |
| `@remotion/transitions` | 4.0.438 | TransitionSeries + fade/slide/wipe |
| `@remotion/media` | 4.0.438 | `<OffthreadVideo>`, `<Video>` |
| `@remotion/paths` | 4.0.438 | SVG path animations (stroke-dashoffset) |
| `@remotion/zod-types` | 4.0.0 | Schema validation for props |
| `react` | 19.2.3 | UI framework |
| `zod` | 4.3.6 | Schema validation |

### Available but Not Yet Used
| Package | Purpose | Install When |
|---------|---------|-------------|
| `@remotion/three` | 3D scenes via Three.js | Need 3D visualizations |
| `@remotion/lottie` | Lottie animation import | Need After Effects exports |
| `@remotion/gif` | GIF embedding | Need animated GIFs |
| `fluent-ffmpeg` | Programmatic ffmpeg | Need complex audio processing in Node |

---

*This document is the law. Follow it or the wind follows you.* 🌬️
