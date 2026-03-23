# Motion Primitives — Harness Engineering Video

> Reusable motion building blocks for all 12 scenes.
> Defines spring configs, timing rules, entrance/exit patterns, and stagger conventions.
> Reference: `art-direction.md` §5 (Motion Language), `development.md` §5 (Animation System).

---

## 1. Spring Configs

### Default Spring — `springConf`
All standard entrances use this config:
```ts
const springConf = { damping: 20, stiffness: 200, mass: 0.5 };
```
**Feel:** Fast, slightly bouncy. Settles in ~300ms (~9 frames @ 30fps).
**Use for:** FadeIn, WordReveal, DiagramNode entrances.

### Settling Spring — softer variant
For scenes that need slower, heavier feel (Scene 11, end card):
```ts
{ damping: 22, stiffness: 150, mass: 0.8 }
```
**Feel:** Slower settle, more weight. ~500ms to reach stillness.
**Use for:** Thesis/resolve phase scenes (emotional arc: Thesis).

### Emphasis Spring — stiffer variant
For badges, callouts, and elements that need a sharp "pop":
```ts
{ damping: 18, stiffness: 250, mass: 0.4 }
```
**Feel:** Snappy, immediate. ~200ms.
**Use for:** ScaleIn on badges, ✗ marks, scale entrances.

---

## 2. Timing Reference

### Frame → Time Conversions
| Frames | Seconds | Use Case |
|--------|---------|---------|
| 8 | 0.27s | Minimum stagger between sequential items |
| 10 | 0.33s | Default stagger for word/element reveals |
| 12 | 0.40s | Medium stagger |
| 20 | 0.67s | Crossfade duration between scenes |
| 30 | 1.00s | Short pause between groups |
| 45 | 1.50s | Long pause / beat (Scene 03's dramatic beat) |
| 60 | 2.00s | Minimum hold after all elements visible |

### Hold Rule
**Every scene holds for at least 60 frames (2s) after the last element enters before transitioning out.** This lets the viewer read before the scene ends.

### Stagger Pattern
- **Words in WordReveal:** 10 frames between each word
- **Nodes in a list:** 10–12 frames between each
- **Lines in a text stack:** 75–90 frames between each line
- **Code blocks (stacked):** 45 frames between each block

---

## 3. Entrance Patterns

### 3.1 FadeInUp (default)
**Hook:** `useFadeIn` / `<FadeIn triggerFrame={N}>`
```tsx
// Opacity: 0 → 1 over ~9 frames (spring)
// translateY: 20px → 0px over ~9 frames
<FadeIn triggerFrame={30}>...</FadeIn>
```
**Use for:** Default element entrance. Any text, diagram, or container.

### 3.2 WordReveal (hero text)
**Hook:** `<WordReveal words={[]} startFrame={N} wordDelay={10}>`
```tsx
// Individual words: spring entrance, staggered
<WordReveal
  words={["The", "bottleneck", "isn't", "the", "AI."]}
  startFrame={20}
  wordDelay={8}
/>
```
**Stagger:** 8–10 frames between words. 8 for urgency (Scene 12), 10 for normal.
**Spring:** `springConf` default.

### 3.3 CountUp (numbers)
**Hook:** `<CountUp target={N} startFrame={N} duration={20}>`
```tsx
// Interpolates 0 → target over duration frames
<CountUp target={3} startFrame={15} duration={20} />
<CountUp target={1000000} startFrame={105} duration={25} />
```
**Duration:** 20 frames for small numbers, 25 frames for large numbers (impressive count).
**Display:** `toLocaleString()` for comma separators.

### 3.4 ScaleIn (emphasis)
**Hook:** `<ScaleIn triggerFrame={N}>`
```tsx
// Scale: 0 → 1, Opacity: 0 → 1, ~9 frames
<ScaleIn triggerFrame={20}>...</ScaleIn>
```
**Use for:** Badges, ✗ marks, callout boxes, emphasis moments.

### 3.5 LineDrawn (SVG paths)
**Hook:** `<LineDrawn fromX N fromY N toX N toY N startFrame N duration N>`
```tsx
// Stroke-dashoffset animation via evolvePath
// Background dashed line always visible; foreground draws on
<LineDrawn fromX={100} fromY={200} toX={300} toY={200}
  startFrame={80} duration={40} stroke="#4ade80" />
```
**Duration:** 40 frames for directional arrows, 20 frames for short connectors.

### 3.6 Typewriter (code terminals)
**Hook:** `useTypewriter(text, startFrame, speed)`
```tsx
// Characters appear 1 per 2 frames
const text = useTypewriter("ERROR: getConcurrencyHelper() defined here.", 200, 2);
// Returns "" until frame 200, then chars accumulate
```
**Speed:** 2 frames/char for readable terminal output.

---

## 4. Exit Patterns

### 4.1 FadeOut (default)
```tsx
// Opacity: 1 → 0 over 20 frames at scene end
const opacity = interpolate(frame, [sceneEnd - 20, sceneEnd], [1, 0]);
```
**Use for:** Most elements. Simple opacity fade.

### 4.2 Crossfade (between scenes)
**Duration:** 20 frames (0.67s)
**Type:** `TransitionSeries.Transition` with `fade()` presentation + `linearTiming`
**Overlap:** Each transition overlaps the preceding scene by 20 frames. Total = `sum(durations) - N_transitions × 20`.

### 4.3 Dim (for secondary content)
```tsx
// Secondary lines dim to 50% when a new line appears
const dimOpacity = interpolate(frame, [line3Frame, line3Frame + 20], [0.7, 0.3]);
// Applied to earlier lines after pivot line appears
```

### 4.4 Fade to Black (scene end)
```tsx
// Final scene fades to pure black over 30 frames
// Either: animate all content opacity → 0
// Or: overlay AbsoluteFill with BG color, opacity 0 → 1
```

---

## 5. Per-Component Motion Specs

### FadeIn
| Property | Value |
|----------|-------|
| Spring | `springConf` default |
| TranslateY | 20px → 0 |
| Settle time | ~9 frames |
| Trigger prop | `triggerFrame` |

### WordReveal
| Property | Value |
|----------|-------|
| Spring | `springConf` default |
| Scale | 0 → 1 (with opacity) |
| Per-word stagger | 10 frames (8 for tight, 10 for normal) |
| Gap between words | `0.35em` (flexbox) |

### CountUp
| Property | Value |
|----------|-------|
| Interpolation | Linear (not spring) |
| Easing | None — straight interpolation |
| Display | `toLocaleString()` formatted |
| Color | Per spec (TEXT or RED for zero) |

### ScaleIn
| Property | Value |
|----------|-------|
| Spring | Emphasis config (`{d:18, s:250, m:0.4}`) |
| Scale | 0.9 → 1 |
| Settle time | ~6 frames |
| Trigger prop | `triggerFrame` |

### DiagramNode
| Property | Value |
|----------|-------|
| Entrance | `ScaleIn` (default) or `FadeIn` (specifiable) |
| Settle time | ~6–9 frames |
| Border color | Default `rgba(255,255,255,0.15)`, or accent |

### Badge
| Property | Value |
|----------|-------|
| Entrance | `ScaleIn` with emphasis spring |
| Settle time | ~6 frames |
| Size | 18px, uppercase, letter-spacing 0.1em |

### LineDrawn
| Property | Value |
|----------|-------|
| Progress | `evolvePath(progress, pathD)` |
| Progress calc | `t / duration` where t = max(0, frame - startFrame) |
| Background | Always visible at 30% opacity |
| Foreground | Evolves from 0 → full over `duration` |

### CodeBlock
| Property | Value |
|----------|-------|
| Entrance | `FadeIn` trigger |
| Syntax colors | CYAN (keyword), GREEN (string), DIM (comment) |
| Header | 32px bar, bg `rgba(255,255,255,0.05)` |

### LightLeak
| Property | Value |
|----------|-------|
| Fade in | 0 → `peakOpacity` over `fadeInEnd` frames |
| Hold | Until `holdUntil` frame |
| Fade out | `peakOpacity` → 0 over `fadeOutDuration` frames |
| Blend mode | `screen` |
| Position | Radial gradient, offset 40% 30% from center |

### CalloutBox
| Property | Value |
|----------|-------|
| Entrance | `FadeIn` (wraps children) |
| Background | Accent at 10% opacity |
| Border | 1px solid accent |

### Strikethrough
| Property | Value |
|----------|-------|
| Line animation | Width 0% → 100% over `duration` frames |
| Duration | 20 frames |
| Position | `absolute`, vertically centered on text |
| Color | RED default |

---

## 6. Scene Motion Profiles

### Scene 01 — Hook
- **Energy:** HIGH
- **Timing:** Fast stagger (8–10 frames), quick settles
- **Special:** Number count-up, RED ScaleIn for "0"

### Scene 02 — Context
- **Energy:** MEDIUM
- **Timing:** Slower stagger (75–90 frames), deliberate pacing
- **Special:** Lines dim to 70% when pivot appears

### Scene 03 — Problem
- **Energy:** RISING
- **Timing:** Standard stagger with dramatic 60-frame dead hold before line 3
- **Special:** 60-frame pause = critical for dramatic timing

### Scene 04 — Diagram
- **Energy:** PEAK
- **Timing:** Center node fast (ScaleIn), satellite stagger 10 frames, then simultaneous dim
- **Special:** Satellite nodes dim to 20% at frame 170

### Scene 05 — Anchor
- **Energy:** PEAK
- **Timing:** WordReveal with 10-frame stagger, slow supporting line reveals
- **Special:** LightLeak atmospheric overlay, fade in/out over full scene

### Scene 06 — Code
- **Energy:** PEAK
- **Timing:** Code blocks stagger 45 frames, annotation at frame 180
- **Special:** Three identical blocks stacked with z-offset

### Scene 07 — Split
- **Energy:** PEAK
- **Timing:** Left/right panels stagger 140 frames apart
- **Special:** Right panel pulse (opacity 1→0.85→1 over 30 frames)

### Scene 08 — Architecture
- **Energy:** PEAK
- **Timing:** Nodes fast (ScaleIn), then directional arrows with LineDrawn
- **Special:** Red arrow stops at 60% (blocked)

### Scene 09 — Before/After
- **Energy:** STEADY
- **Timing:** Column-by-column, then infrastructure items stagger 10 frames
- **Special:** CalloutBox fade-in at frame 320

### Scene 10 — Surface Area
- **Energy:** STEADY
- **Timing:** Center node, then 7 satellites stagger 12 frames
- **Special:** Underline LineDrawn on "worth copying" at frame 250

### Scene 11 — Thesis
- **Energy:** SETTLING
- **Timing:** Slower spring (mass 0.8, stiffness 150), 60-frame line stagger
- **Special:** LightLeak (softer than Scene 05), breath gap between groups

### Scene 12 — Close
- **Energy:** SETTLING
- **Timing:** WordReveal 8-frame stagger (tight), manifesto lines 20-frame stagger
- **Special:** Phase A→B crossfade at frame 400, final fade to black at 585

---

## 7. What NOT to Do

- **No easing functions** — spring physics only. No `Easing.in`, no cubic-bezier.
- **No bounce** — overshoot > 5% looks cheap. `damping: 20` prevents this.
- **No infinite loops** — every animation settles. No continuous spinning or pulsing unless explicitly specified.
- **No simultaneous entrances** — stagger everything. Never have all elements appear at once.
- **No horizontal slides** — vertical only (fade/scale/scroll). Horizontal movement is reserved for reveals.
- **No rotation** — not unless it's a loading spinner or clock (none in this video).

---

*Motion primitives defined by Ithaqua 🌬️ — 2026-03-23*
*All motion behavior frozen. Scene Execution in Phase 7.*
