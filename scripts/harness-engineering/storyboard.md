# What Is Harness Engineering — Storyboard
## 12 Scenes · 6300 Frames · 3:30 @ 30fps

> Produced by Nyarlathotep 🌙 — 2026-03-23
> For implementation by Ithaqua 🌬️
> Based on: script.md, development.md, art-direction.md

---

## Scene 01 — The Hook — 11s (330 frames)

### Emotional Arc Phase
**Hook** — Curiosity / surprise. High visual energy: bold numbers, fast stagger, accent colors.

### Layout Pattern
**Single Statement** — centered hero text, four sequential lines stacked vertically.

### Visual Description
Full `BG` (#0a0a0f) background. Four text blocks stacked vertically in the center of the frame, each occupying its own line. Each block contains a number + label. The numbers use a counting animation (interpolate from 0 → final value). The blocks appear one after another with spring-driven pop entrances. The final line ("0 lines typed by a human") uses `RED` (#ff6b6b) for the "0" — the shocking contrast that hooks the viewer. A very subtle grain texture overlays the entire frame for atmosphere.

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG` frame. |
| 15 | Line 1 enters: `3 engineers` — number counts 0→3 over 20 frames. |
| 60 | Line 2 enters: `5 months` — number counts 0→5 over 20 frames. |
| 105 | Line 3 enters: `1,000,000 lines of code` — number counts 0→1,000,000 over 25 frames. |
| 165 | Line 4 enters: `0 lines typed by a human` — "0" fades in `RED`, no counting (it IS zero). |
| 210 | All lines visible, hold. |
| 330 | Scene ends. Crossfade begins. |

### Text on Screen
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `3` | Arial, sans-serif | 64px | 800 | `TEXT` (#f0f0f0) |
| `engineers` | Arial, sans-serif | 48px | 600 | `TEXT` (#f0f0f0) |
| `5` | Arial, sans-serif | 64px | 800 | `TEXT` (#f0f0f0) |
| `months` | Arial, sans-serif | 48px | 600 | `TEXT` (#f0f0f0) |
| `1,000,000` | Arial, sans-serif | 64px | 800 | `TEXT` (#f0f0f0) |
| `lines of code` | Arial, sans-serif | 48px | 600 | `TEXT` (#f0f0f0) |
| `0` | Arial, sans-serif | 64px | 800 | `RED` (#ff6b6b) |
| `lines typed by a human` | Arial, sans-serif | 48px | 600 | `TEXT` (#f0f0f0) |

### Animation Notes
- **Numbers (lines 1–3):** `interpolate(frame, [triggerFrame, triggerFrame+20], [0, finalValue])` rounded to integer, displayed with locale formatting (commas).
- **Line entrance:** `useFadeInUp` with spring (`springConf`: damping 20, stiffness 200, mass 0.5). Stagger: 45 frames between lines 1–3; longer pause (60 frames) before line 4 for dramatic beat.
- **"0" on line 4:** Uses `ScaleIn` instead of counting — scales from 0.9→1 with opacity 0→1, in `RED`.
- No simultaneous entrances. Each line settles before the next triggers.

### Assets Needed
None.

### Transition Out
**Fade** (20 frames / 0.67s) → Scene 02.

---

## Scene 02 — The Symphony Team — 18s (540 frames)

### Emotional Arc Phase
**Context** — Understanding. Medium visual energy: sequential text, story setup.

### Layout Pattern
**Single Statement** — centered text stack, lines appear sequentially as spoken.

### Visual Description
Full `BG` (#0a0a0f) background. Five lines of text appear one after another, centered vertically and horizontally. Clean, editorial presentation — no diagrams, no decoration. The first three lines establish facts. The fourth and fifth lines form the pivot: "The real innovation wasn't Codex. / It was what they built around it." These final two lines use slightly larger sizing and a brief hold to land the reframe.

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG` frame. |
| 20 | Line 1 fades up: "OpenAI's Symphony team." |
| 95 | Line 2 fades up: "Three engineers." |
| 155 | Line 3 fades up: "Everything — every single line — written by Codex." |
| 270 | Line 4 fades up: "The real innovation wasn't Codex." |
| 360 | Line 5 fades up: "It was what they built around it." |
| 420 | All lines visible, hold. |
| 540 | Scene ends. |

### Text on Screen
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `OpenAI's Symphony team.` | Arial, sans-serif | 38px | 600 | `TEXT` (#f0f0f0) |
| `Three engineers.` | Arial, sans-serif | 38px | 600 | `TEXT` (#f0f0f0) |
| `Everything — every single line — written by Codex.` | Arial, sans-serif | 38px | 600 | `TEXT` (#f0f0f0) |
| `The real innovation wasn't Codex.` | Arial, sans-serif | 42px | 800 | `TEXT` (#f0f0f0) |
| `It was what they built around it.` | Arial, sans-serif | 42px | 800 | `TEXT` (#f0f0f0) |

### Animation Notes
- **All lines:** `useFadeInUp` (opacity 0→1, translateY 20→0) with `springConf`.
- **Stagger:** ~75 frames between lines 1–3, ~90 frames pause before line 4 (tempo shift), ~90 frames between lines 4–5.
- Lines 1–3 slightly dim (`DIM` opacity 0.7) after line 4 appears, drawing focus to the pivot.
- No WordReveal — full sentence entrance per line to match deliberate narration pacing.

### Assets Needed
None.

### Transition Out
**Fade** (20 frames) → Scene 03.

---

## Scene 03 — The Instinct — 17.5s (525 frames)

### Emotional Arc Phase
**Context** — Understanding. Medium energy building toward tension.

### Layout Pattern
**Single Statement** — centered text, three sequential reveals with dramatic pacing.

### Visual Description
Full `BG` (#0a0a0f). Three centered text lines. Line 1 is a quote — appears in quotation marks with slightly `DIM` rendering to feel like a reported statement. Line 2 ("So we blamed the model.") appears below it with `RED` (#ff6b6b) on "blamed the model" to convey blame. Line 3 ("We were wrong.") enters after a deliberate 60-frame beat — also in `RED`, slightly larger, the emotional payoff of the scene.

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. |
| 20 | Line 1 fades up: `"The code Codex wrote was bad."` |
| 140 | Line 2 fades up: `So we blamed the model.` |
| 310 | Beat. Pause. Nothing moves for 60 frames. |
| 370 | Line 3 fades up: `We were wrong.` |
| 420 | All visible, hold. |
| 525 | Scene ends. |

### Text on Screen
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `"The code Codex wrote was bad."` | Arial, sans-serif | 42px | 600 | `DIM` (rgba(240,240,240,0.7)) |
| `So we` | Arial, sans-serif | 38px | 600 | `TEXT` (#f0f0f0) |
| `blamed the model.` | Arial, sans-serif | 38px | 800 | `RED` (#ff6b6b) |
| `We were wrong.` | Arial, sans-serif | 48px | 800 | `RED` (#ff6b6b) |

### Animation Notes
- **Line 1:** `useFadeInUp`, standard spring.
- **Line 2:** `useFadeInUp`. "blamed the model" portion rendered as a separate `<span>` with `RED` color.
- **Line 3:** `useScaleIn` — scales 0.9→1 with opacity. Slightly larger than other lines to signify the turn. The 60-frame dead hold before it appears is critical for dramatic timing.

### Assets Needed
None.

### Transition Out
**Fade** (20 frames) → Scene 04.

---

## Scene 04 — What Codex Can't See — 17.5s (525 frames)

### Emotional Arc Phase
**Problem** — Tension. Rising energy: diagram reveals what's invisible.

### Layout Pattern
**Diagram + Caption** — central node with surrounding faded nodes, caption below.

### Visual Description
Full `BG` (#0a0a0f). Center of frame: a rounded rectangle node labeled "Codex" with `CYAN` (#67e8f9) border accent. Surrounding it in a loose radial arrangement: five smaller nodes — "Google Docs", "Slack threads", "Decisions in someone's head", "Notion pages", "Meeting notes". Dashed lines connect each satellite node to the center "Codex" node. The satellite nodes are rendered at 20% opacity (`rgba(240,240,240,0.2)`) with strikethrough or a red ✗ overlay — they represent things Codex CANNOT access. Below the entire diagram, a bold caption: `What Codex can't see — doesn't exist.`

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. |
| 20 | "Codex" center node scales in (`useScaleIn`). |
| 60 | Dashed lines begin drawing outward (stroke-dashoffset animation via `@remotion/paths`). Stagger: 10 frames between each line start. |
| 90 | First satellite node fades in at full opacity: "Google Docs". |
| 100 | Second: "Slack threads". |
| 110 | Third: "Decisions in someone's head". |
| 120 | Fourth: "Notion pages". |
| 130 | Fifth: "Meeting notes". |
| 170 | All satellite nodes simultaneously dim to 20% opacity. Red ✗ marks appear over each. |
| 250 | Caption fades up below diagram: "What Codex can't see — doesn't exist." |
| 330 | Hold. |
| 525 | Scene ends. |

### Text on Screen
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `Codex` (center node) | Arial, sans-serif | 32px | 700 | `TEXT` (#f0f0f0), node bg `#1a1a2e`, border `CYAN` (#67e8f9) |
| `Google Docs` | Arial, sans-serif | 20px | 600 | `TEXT` → dims to 20% opacity |
| `Slack threads` | Arial, sans-serif | 20px | 600 | `TEXT` → dims to 20% opacity |
| `Decisions in someone's head` | Arial, sans-serif | 20px | 600 | `TEXT` → dims to 20% opacity |
| `Notion pages` | Arial, sans-serif | 20px | 600 | `TEXT` → dims to 20% opacity |
| `Meeting notes` | Arial, sans-serif | 20px | 600 | `TEXT` → dims to 20% opacity |
| `What Codex can't see — doesn't exist.` | Arial, sans-serif | 42px | 800 | `RED` (#ff6b6b) |

All satellite node text ≥ 20px (satisfies 18px mobile readability rule). Node boxes use diagram style: bg `#1a1a2e`, border `2px solid rgba(255,255,255,0.15)`, border-radius 10px, padding 12px 20px.

### Animation Notes
- **Center node:** `useScaleIn` (scale 0.9→1, opacity 0→1).
- **Dashed lines:** `LineDrawn` via `@remotion/paths` — `evolvePath(0→1)` with `interpolate`. Stroke: `rgba(255,255,255,0.3)`, strokeWidth 2, dasharray pattern.
- **Satellite nodes:** `useFadeInUp`, stagger 10 frames. After full appearance, `interpolate` opacity from 1→0.2 over 30 frames starting at frame 170.
- **Red ✗ marks:** `ScaleIn` over satellite nodes at frame 170, color `RED`, size 24px.
- **Caption:** `useFadeInUp` at frame 250. The word "doesn't exist" is the emphasis — could be `RED` or underlined.
- Accent colors this scene: `CYAN` (Codex node) + `RED` (caption, ✗ marks). Two accents — within limit.

### Assets Needed
None.

### Transition Out
**Fade** (20 frames) → Scene 05.

---

## Scene 05 — The Gap Is Always Yours — 17.5s (525 frames)

### Emotional Arc Phase
**Problem** — Tension peak. This is the anchor phrase — cinematic treatment.

### Layout Pattern
**Single Statement** — hero text centered, supporting subtitle below.

### Visual Description
Full `BG` (#0a0a0f). The phrase "The gap is always yours." dominates the center of the frame in hero-sized text. Each word pops in sequentially (WordReveal) with spring animation. After the full phrase settles, a smaller supporting line fades in below: "The model did what we made possible. The slop was in the scaffolding." A subtle warm light leak from `@remotion/light-leaks` overlays the frame at low opacity (~15%) to give this moment atmospheric weight — this is the emotional anchor of the video.

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. Subtle light leak begins (very low opacity, warm tone). |
| 30 | "The" pops in (WordReveal). |
| 40 | "gap" pops in. |
| 50 | "is" pops in. |
| 60 | "always" pops in. |
| 70 | "yours." pops in. |
| 100 | Full phrase settled. Hold. |
| 220 | Supporting line fades up: "The model did what we made possible." |
| 290 | Second supporting line: "The slop was in the scaffolding." |
| 350 | All visible, hold. Light leak slowly fades out. |
| 525 | Scene ends. |

### Text on Screen
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `The gap is always yours.` | Arial, sans-serif | 60px | 800 | `TEXT` (#f0f0f0) |
| `The model did what we made possible.` | Arial, sans-serif | 28px | 600 | `DIM` (rgba(240,240,240,0.6)) |
| `The slop was in the scaffolding.` | Arial, sans-serif | 28px | 600 | `DIM` (rgba(240,240,240,0.6)) |

### Animation Notes
- **Hero text:** `WordReveal` component — words array `["The", "gap", "is", "always", "yours."]`, startFrame 30, stagger 10 frames per word. Spring config: `springConf`.
- **Supporting lines:** `useFadeInUp`, triggered at frames 220 and 290.
- **Light leak:** Import from `@remotion/light-leaks`. Overlay with `position: absolute`, `opacity: 0.15`, `mixBlendMode: "screen"`. Animate opacity from 0→0.15 over frames 0–30, hold, then 0.15→0 over frames 350–450.
- This scene is intentionally sparse. Negative space is the point. Do NOT add diagrams or decoration.

### Assets Needed
None (light leaks from `@remotion/light-leaks` package).

### Transition Out
**Fade** (20 frames) → Scene 06.

---

## Scene 06 — The Duplication Problem — 18s (540 frames)

### Emotional Arc Phase
**Solution** — Insight begins. Peak energy: code example with visual problem.

### Layout Pattern
**Code Block** — three stacked code windows showing duplicated function.

### Visual Description
Full `BG` (#0a0a0f). Three code block windows stacked vertically with slight overlap (z-stacking, each offset ~8px right and ~40px down from the previous), centered in the frame. Each block shows the same function `getConcurrencyHelper()` in monospace. Each block has a subtle header bar with a faint label: "agent-abc", "agent-def", "agent-xyz" in `DIM`. After all three appear, a `RED` highlight annotation appears across all three: `// DUPLICATED — 3 times`. The visual joke: three identical things that shouldn't exist.

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. |
| 30 | Code block 1 slides up (`useFadeInUp`). Header: "agent-abc". |
| 75 | Code block 2 slides up, offset. Header: "agent-def". |
| 120 | Code block 3 slides up, offset. Header: "agent-xyz". |
| 180 | Red highlight annotation fades in: `// DUPLICATED — 3 times` |
| 220 | Hold. |
| 540 | Scene ends. |

### Text on Screen

**Inside each code block (identical):**
```
function getConcurrencyHelper() {
  // ... concurrency logic
  return helper;
}
```
- Font: `"Courier New", monospace`, 20px, weight 400
- Keywords (`function`, `return`): `CYAN` (#67e8f9)
- Comments (`// ...`): `DIM` (rgba(240,240,240,0.4))
- Function name: `TEXT` (#f0f0f0)

**Header labels:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `agent-abc` | Arial, sans-serif | 18px | 600 | `DIM` (rgba(240,240,240,0.5)) |
| `agent-def` | Arial, sans-serif | 18px | 600 | `DIM` (rgba(240,240,240,0.5)) |
| `agent-xyz` | Arial, sans-serif | 18px | 600 | `DIM` (rgba(240,240,240,0.5)) |

**Annotation:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `// DUPLICATED — 3 times` | `"Courier New", monospace` | 24px | 700 | `RED` (#ff6b6b) |

Code block styling per art-direction: bg `#111118`, border `1px solid rgba(255,255,255,0.1)`, border-radius 8px, padding 20px 24px, max-width 700px.

### Animation Notes
- **Code blocks:** `useFadeInUp` with stagger of 45 frames between each.
- **Code lines within blocks:** Optional typewriter reveal on first block for extra polish; blocks 2 and 3 appear fully rendered (they're duplicates — the point is they're identical).
- **Red annotation:** `useFadeInUp` at frame 180. Use `RED` with a subtle left-border accent (4px solid RED) on the annotation line.
- Accent colors: `CYAN` (syntax) + `RED` (duplication highlight). Two accents — within limit.

### Assets Needed
None.

### Transition Out
**Fade** (20 frames) → Scene 07.

---

## Scene 07 — Not a Note, a Lint — 18s (540 frames)

### Emotional Arc Phase
**Solution** — Insight. Peak energy: side-by-side contrast.

### Layout Pattern
**Split Comparison** — left panel (BEFORE: the note) vs. right panel (AFTER: the lint rule).

### Visual Description
Full `BG` (#0a0a0f). Two panels side by side, each taking ~45% frame width, centered with a 48px gap. Left panel has an "BEFORE" badge in `RED` at top-left corner and shows a text file styled as a markdown document. Right panel has an "AFTER" badge in `GREEN` at top-left corner and shows a terminal/ESLint error output.

**Left panel (BEFORE):** A faded, slightly sad-looking document. Title: "AGENTS.md". A bullet point with strikethrough: `"⚠️ Please don't define getConcurrencyHelper() in multiple places"`. The strikethrough communicates: this note was ignored.

**Right panel (AFTER):** A terminal window with a red error message. A subtle blinking cursor or scan-line effect signals "this is live, this bites." The error is clear and enforceable.

Below both panels, centered: `Not a note. A lint.`

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. |
| 20 | Left panel slides in from left (`useFadeInUp`). "BEFORE" badge appears. |
| 60 | AGENTS.md title fades in. |
| 90 | Bullet point text fades in with strikethrough animation (line draws through text from left to right). |
| 160 | Right panel slides in (`useFadeInUp`). "AFTER" badge appears. |
| 200 | Terminal error text fades in via typewriter effect. |
| 300 | Right panel pulses subtly (opacity 1→0.85→1 over 30 frames) to indicate "this rule bites." |
| 350 | Caption fades up below both panels: "Not a note. A lint." |
| 400 | Hold. |
| 540 | Scene ends. |

### Text on Screen

**Left panel:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `BEFORE` (badge) | Arial, sans-serif | 18px | 700 | `RED` (#ff6b6b), uppercase, badge style |
| `AGENTS.md` (title) | `"Courier New", monospace` | 20px | 700 | `CYAN` (#67e8f9) |
| `⚠️ Please don't define getConcurrencyHelper() in multiple places` | Arial, sans-serif | 20px | 400 | `DIM` (rgba(240,240,240,0.4)), with strikethrough |

Left panel bg: `#111118`, border `1px solid rgba(255,255,255,0.1)`, border-radius 8px, padding 20px.

**Right panel:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `AFTER` (badge) | Arial, sans-serif | 18px | 700 | `GREEN` (#4ade80), uppercase, badge style |
| `ERROR:` | `"Courier New", monospace` | 20px | 700 | `RED` (#ff6b6b) |
| `getConcurrencyHelper() defined here.` | `"Courier New", monospace` | 20px | 400 | `TEXT` (#f0f0f0) |
| `This function must only be defined at` | `"Courier New", monospace` | 20px | 400 | `TEXT` (#f0f0f0) |
| `lib/concurrency.ts:1` | `"Courier New", monospace` | 20px | 700 | `CYAN` (#67e8f9) |
| `ESLint (no-restricted-syntax)` | `"Courier New", monospace` | 18px | 400 | `DIM` (rgba(240,240,240,0.5)) |

Right panel bg: `#111118`, border `1px solid rgba(255,255,255,0.1)`, border-radius 8px, padding 20px.

Badge styling per art-direction: accent color bg at 10% opacity, 1px solid accent border, border-radius 6px, padding 6px 14px, uppercase.

**Caption:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `Not a note. A lint.` | Arial, sans-serif | 42px | 800 | `TEXT` (#f0f0f0) |

### Animation Notes
- **Left panel:** `useFadeInUp` at frame 20. Strikethrough: `LineDrawn` pattern — a thin `RED` line (`2px`) animates left→right across the text (stroke-dashoffset or width interpolation) over 20 frames starting at frame 100.
- **Right panel:** `useFadeInUp` at frame 160. Terminal text: `useTypewriter` effect, startFrame 200, speed ~2 characters/frame.
- **Pulse:** `interpolate(frame, [300, 315, 330], [1, 0.85, 1])` on right panel opacity.
- **Caption:** `useFadeInUp` at frame 350.
- Accent colors: `RED` (before badge, ERROR) + `GREEN` (after badge). Two accents — within limit. `CYAN` used minimally for code references (acceptable as code highlighting, not a third accent).

### Assets Needed
None.

### Transition Out
**Fade** (20 frames) → Scene 08.

---

## Scene 08 — Architecture as Progressive Disclosure — 18s (540 frames)

### Emotional Arc Phase
**Solution** — Insight. Peak energy: architectural diagram.

### Layout Pattern
**Diagram + Caption** — two-node diagram with directional arrows, caption below.

### Visual Description
Full `BG` (#0a0a0f). Two large rounded-rectangle nodes in the center of the frame, side by side with ~120px gap. Left node: "Service". Right node: "Types". Between them: a solid `GREEN` arrow from Service → Types (allowed), and a dashed `RED` arrow from Types → Service with a large red ✗ over it (blocked). Below the diagram, three lines of caption text explain the rule. Clean, minimal — the diagram is the star.

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. |
| 20 | "Service" node scales in (`useScaleIn`). |
| 45 | "Types" node scales in (`useScaleIn`). |
| 80 | Green arrow draws from Service → Types (`LineDrawn`, stroke-dashoffset). |
| 130 | Red dashed arrow begins drawing from Types → Service. |
| 160 | Red ✗ scales in over the red arrow (`ScaleIn`). Arrow animation halts/freezes at ~60% drawn. |
| 210 | Caption line 1 fades up: "Service can use Types." |
| 250 | Caption line 2 fades up: "Types can never import Service." |
| 290 | Caption line 3 fades up: "Directional boundaries enforced by the build." |
| 360 | Hold. |
| 540 | Scene ends. |

### Text on Screen

**Nodes:**
| Text | Font | Size | Weight | Color | Node Style |
|------|------|------|--------|-------|------------|
| `Service` | Arial, sans-serif | 28px | 700 | `TEXT` (#f0f0f0) | bg `#1a1a2e`, border `2px solid rgba(255,255,255,0.15)`, border-radius 10px, padding 16px 32px |
| `Types` | Arial, sans-serif | 28px | 700 | `TEXT` (#f0f0f0) | same node style |

**Arrows:**
- Service → Types: SVG path, stroke `GREEN` (#4ade80), strokeWidth 3, solid. Arrowhead at end.
- Types → Service: SVG path, stroke `RED` (#ff6b6b), strokeWidth 3, dashed (dasharray `8,6`). Arrowhead at end (but blocked by ✗).
- Red ✗: `RED` (#ff6b6b), font-size 48px, weight 800, positioned at midpoint of blocked arrow.

**Caption:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `Service can use Types.` | Arial, sans-serif | 32px | 600 | `GREEN` (#4ade80) |
| `Types can never import Service.` | Arial, sans-serif | 32px | 600 | `RED` (#ff6b6b) |
| `Directional boundaries enforced by the build.` | Arial, sans-serif | 28px | 600 | `DIM` (rgba(240,240,240,0.6)) |

### Animation Notes
- **Nodes:** `useScaleIn` with 25-frame stagger.
- **Green arrow:** `LineDrawn` via `@remotion/paths` — `evolvePath` 0→1 over 40 frames starting at frame 80. Stroke `GREEN`.
- **Red arrow:** `LineDrawn` starts at frame 130, evolves to ~0.6 over 30 frames, then stops (interpolate clamped). Communicates "blocked."
- **Red ✗:** `ScaleIn` at frame 160.
- **Caption lines:** `useFadeInUp`, stagger 40 frames.
- Accent colors: `GREEN` + `RED`. Two accents — within limit.

### Assets Needed
None.

### Transition Out
**Fade** (20 frames) → Scene 09.

---

## Scene 09 — Taste Compounds — 18s (540 frames)

### Emotional Arc Phase
**Evidence** — Conviction. Steady energy: proof via before/after story.

### Layout Pattern
**Split Comparison** — BEFORE (left) vs. AFTER (right) with callout text below.

### Visual Description
Full `BG` (#0a0a0f). Two columns centered in the frame with 48px gap.

**Left column (BEFORE):** A `RED` "BEFORE" badge. A node labeled "Ryan (backend infra)" with `PURPLE` (#a78bfa) accent (person reference). An arrow pointing down to a question mark "?" icon. Below: label "mediocre React from Codex" in `DIM`.

**Right column (AFTER):** A `GREEN` "AFTER" badge. Same "Ryan" node at top. Below: intermediate node "Sarah (frontend architect)" also in `PURPLE`. Arrow down to a shared infrastructure label listing: "single-hook-per-file, snapshot testing, small components". Arrow down to: "Better React from everyone's Codex" in `GREEN`.

Below both columns, centered callout: `The model didn't change. The codebase did.`

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. |
| 20 | Left column container fades in. "BEFORE" badge appears. |
| 40 | "Ryan" node fades up. |
| 65 | Arrow + "?" icon fades in. |
| 85 | "mediocre React from Codex" label fades in (DIM). |
| 140 | Right column container fades in. "AFTER" badge appears. |
| 160 | "Ryan" node fades up (right side). |
| 185 | Arrow draws down. "Sarah" node fades up. |
| 215 | Infrastructure list fades in. |
| 245 | Arrow draws down. "Better React" label fades in (GREEN). |
| 320 | Callout fades up: "The model didn't change. The codebase did." |
| 380 | Hold. |
| 540 | Scene ends. |

### Text on Screen

**Left column:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `BEFORE` (badge) | Arial, sans-serif | 18px | 700 | `RED` (#ff6b6b), badge style |
| `Ryan` | Arial, sans-serif | 24px | 700 | `PURPLE` (#a78bfa) |
| `(backend infra)` | Arial, sans-serif | 18px | 400 | `DIM` |
| `?` | Arial, sans-serif | 48px | 800 | `DIM` (rgba(240,240,240,0.3)) |
| `mediocre React from Codex` | Arial, sans-serif | 20px | 600 | `DIM` (rgba(240,240,240,0.5)) |

**Right column:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `AFTER` (badge) | Arial, sans-serif | 18px | 700 | `GREEN` (#4ade80), badge style |
| `Ryan` | Arial, sans-serif | 24px | 700 | `PURPLE` (#a78bfa) |
| `Sarah` | Arial, sans-serif | 24px | 700 | `PURPLE` (#a78bfa) |
| `(frontend architect)` | Arial, sans-serif | 18px | 400 | `DIM` |
| `single-hook-per-file` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |
| `snapshot testing` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |
| `small components` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |
| `Better React from everyone's Codex` | Arial, sans-serif | 20px | 700 | `GREEN` (#4ade80) |

**Callout:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `The model didn't change.` | Arial, sans-serif | 38px | 800 | `TEXT` (#f0f0f0) |
| `The codebase did.` | Arial, sans-serif | 38px | 800 | `GREEN` (#4ade80) |

Nodes use diagram style: bg `#1a1a2e`, border `2px solid rgba(255,255,255,0.15)`, border-radius 10px.
Arrows: `→` character 28px in `DIM`, or SVG stroked arrows with `LineDrawn`.

### Animation Notes
- **All nodes:** `useFadeInUp` with per-element stagger as listed in keyframes.
- **Arrows:** `LineDrawn` (stroke-dashoffset), or simple `→` character with `useFadeInUp`.
- **"?" icon:** `useScaleIn` for dramatic effect.
- **Infrastructure list:** Stagger 10 frames per item.
- **Callout:** `useFadeInUp`. "The codebase did." in `GREEN` for resolution emphasis.
- Accent colors: `RED`/`GREEN` (badges, emphasis) + `PURPLE` (people). Note: PURPLE is used for person semantics per art-direction color semantics. The primary two accents are RED + GREEN for the before/after contrast.

### Assets Needed
None.

### Transition Out
**Fade** (20 frames) → Scene 10.

---

## Scene 10 — The Full Surface Area — 18s (540 frames)

### Emotional Arc Phase
**Evidence** — Conviction. Steady energy: comprehensive list with radial diagram.

### Layout Pattern
**Diagram + Caption** — radial/hexagonal arrangement of nodes around a center.

### Visual Description
Full `BG` (#0a0a0f). Center of frame: a prominent node labeled "Agent-Generated" in `CYAN` (#67e8f9) border accent. Arranged radially around it (like a clock face or hexagonal pattern): seven satellite nodes. Each node appears one by one with a spring pop, connected to the center by thin lines. After all nodes are visible, a caption fades in below: `worth copying` — the emotional qualifier.

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. |
| 20 | Center node "Agent-Generated" scales in (`useScaleIn`). |
| 60 | Node 1 pops in: "CI config". Connection line draws. |
| 72 | Node 2: "Internal dev tools". Line draws. |
| 84 | Node 3: "Documentation". Line draws. |
| 96 | Node 4: "Eval harnesses". Line draws. |
| 108 | Node 5: "Review comments". Line draws. |
| 120 | Node 6: "Scripts that manage the repo". Line draws. |
| 132 | Node 7: "Production dashboard definitions". Line draws. |
| 200 | All nodes settled. Caption fades up: "All of it needs to be legible, consistent, worth copying." |
| 250 | "worth copying" gets a subtle underline animation (line draws left→right beneath the words). |
| 320 | Hold. |
| 540 | Scene ends. |

### Text on Screen

**Center node:**
| Text | Font | Size | Weight | Color | Node Style |
|------|------|------|--------|-------|------------|
| `Agent-Generated` | Arial, sans-serif | 28px | 700 | `TEXT` (#f0f0f0) | bg `#1a1a2e`, border `2px solid` `CYAN` (#67e8f9), border-radius 10px, padding 16px 28px |

**Satellite nodes:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `CI config` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |
| `Internal dev tools` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |
| `Documentation` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |
| `Eval harnesses` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |
| `Review comments` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |
| `Scripts that manage the repo` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |
| `Production dashboard definitions` | Arial, sans-serif | 20px | 600 | `TEXT` (#f0f0f0) |

All satellite nodes: bg `#1a1a2e`, border `2px solid rgba(255,255,255,0.15)`, border-radius 10px, padding 12px 20px.
Connection lines: stroke `rgba(255,255,255,0.2)`, strokeWidth 2.

**Caption:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `All of it needs to be legible, consistent,` | Arial, sans-serif | 28px | 600 | `DIM` (rgba(240,240,240,0.6)) |
| `worth copying.` | Arial, sans-serif | 32px | 800 | `CYAN` (#67e8f9) |

### Animation Notes
- **Center node:** `useScaleIn` at frame 20.
- **Satellite nodes:** `useScaleIn`, stagger 12 frames between each (frames 60, 72, 84, 96, 108, 120, 132). Spring entrance — fast pop, no horizontal slide.
- **Connection lines:** `LineDrawn` via `@remotion/paths`, triggered simultaneously with each satellite node. Short paths — 15 frames to complete each.
- **Caption:** `useFadeInUp` at frame 200.
- **"worth copying" underline:** `LineDrawn` — a horizontal line (`stroke: CYAN, strokeWidth: 2`) animates left→right beneath the phrase over 20 frames starting at frame 250.
- Accent color: `CYAN` only. One accent — well within limit.

### Assets Needed
None.

### Transition Out
**Fade** (20 frames) → Scene 11.

---

## Scene 11 — The Goal — Autonomy — 18s (540 frames)

### Emotional Arc Phase
**Thesis** — Resolve. Settling energy: single statement, wide spacing, slower springs.

### Layout Pattern
**Single Statement** — centered text stack with generous vertical spacing.

### Visual Description
Full `BG` (#0a0a0f). Three lines of text fade up in the top-center area, each slightly indented or stacked: "The goal: agents that work longer." / "More reliably." / "With less hand-holding." Below a generous gap, two smaller contrast lines appear: "Not because the model got better." / "Because the foundation got clearer." A subtle warm light leak from `@remotion/light-leaks` at ~10% opacity — echoing Scene 05's atmospheric treatment, tying the emotional arc together.

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. Light leak begins at low opacity. |
| 30 | Line 1 fades up: "The goal: agents that work longer." |
| 90 | Line 2 fades up: "More reliably." |
| 140 | Line 3 fades up: "With less hand-holding." |
| 220 | Beat. Hold. |
| 280 | Line 4 fades up: "Not because the model got better." |
| 360 | Line 5 fades up: "Because the foundation got clearer." |
| 420 | All visible, hold. Light leak fades out. |
| 540 | Scene ends. |

### Text on Screen
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `The goal: agents that work longer.` | Arial, sans-serif | 42px | 800 | `TEXT` (#f0f0f0) |
| `More reliably.` | Arial, sans-serif | 42px | 800 | `TEXT` (#f0f0f0) |
| `With less hand-holding.` | Arial, sans-serif | 42px | 800 | `TEXT` (#f0f0f0) |
| `Not because the model got better.` | Arial, sans-serif | 28px | 600 | `DIM` (rgba(240,240,240,0.5)) |
| `Because the foundation got clearer.` | Arial, sans-serif | 32px | 700 | `GREEN` (#4ade80) |

### Animation Notes
- **Lines 1–3:** `useFadeInUp` with slower spring feel — increase `mass` to 0.8 or reduce `stiffness` to 150 for this scene only (settling energy). Stagger: 60 frames between lines (more deliberate pacing than earlier scenes).
- **Lines 4–5:** `useFadeInUp` with standard `springConf`. Line 4 in `DIM`. Line 5 in `GREEN` — the resolution echo from Scene 09 ("The codebase did.").
- **Light leak:** Same treatment as Scene 05. `@remotion/light-leaks`, opacity ~10%, `mixBlendMode: "screen"`. Warmer/softer than Scene 05 — if configurable.
- **Spacing:** Gap between line 3 and line 4 should be ~80px to create a visual "breath" that mirrors the beat in the narration.
- Accent color: `GREEN` only. One accent.

### Assets Needed
None (light leaks from package).

### Transition Out
**Fade** (20 frames) → Scene 12.

---

## Scene 12 — The Close — 20.5s (615 frames)

### Emotional Arc Phase
**Thesis** — Resolve. Settling energy: manifesto feel, then quiet end card.

### Layout Pattern
**Single Statement** → transitions to **End Card**.

### Visual Description
Full `BG` (#0a0a0f). Two phases:

**Phase A (frames 0–400): The Manifesto.** Word-by-word reveal of the thesis. First: "The bottleneck isn't the AI." Hold. Then: "It's the infrastructure around it." Hold. Then the manifesto block fades in — three lines, larger, bolder: "In the agent-first world, / scaffolding matters more / than the code itself." This is the climax of the entire video. Give it room.

**Phase B (frames 400–615): End Card.** The manifesto fades out. A clean title card appears: "What Is Harness Engineering" in hero text, with a subtitle or channel name below in `DIM`. Hold until fade to black.

### Keyframes
| Frame (relative) | What happens |
|------------------|-------------|
| 0 | Empty `BG`. |
| 20 | WordReveal: "The bottleneck isn't the AI." — word-by-word, 8-frame stagger. |
| 80 | Full phrase visible. Hold. |
| 130 | WordReveal: "It's the infrastructure around it." — word-by-word, 8-frame stagger. |
| 190 | Full phrase visible. Hold. |
| 250 | Both lines dim to 50% opacity. |
| 270 | Manifesto block fades up, larger: |
|     | "In the agent-first world," |
| 290 | "scaffolding matters more" |
| 310 | "than the code itself." |
| 360 | Manifesto fully visible. Hold. |
| 400 | All text fades out (opacity → 0 over 30 frames). |
| 440 | End card fades in: title + subtitle. |
| 510 | End card fully visible. Hold. |
| 585 | Begin final fade to black (opacity → 0 over 30 frames). |
| 615 | Black frame. Scene ends. |

### Text on Screen

**Phase A:**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `The bottleneck isn't the AI.` | Arial, sans-serif | 42px | 800 | `TEXT` (#f0f0f0) |
| `It's the infrastructure around it.` | Arial, sans-serif | 42px | 800 | `TEXT` (#f0f0f0) |
| `In the agent-first world,` | Arial, sans-serif | 52px | 800 | `TEXT` (#f0f0f0) |
| `scaffolding matters more` | Arial, sans-serif | 52px | 800 | `TEXT` (#f0f0f0) |
| `than the code itself.` | Arial, sans-serif | 52px | 800 | `TEXT` (#f0f0f0) |

**Phase B (End Card):**
| Text | Font | Size | Weight | Color |
|------|------|------|--------|-------|
| `What Is Harness Engineering` | Arial, sans-serif | 48px | 800 | `TEXT` (#f0f0f0) |
| Author/channel line (TBD) | Arial, sans-serif | 22px | 400 | `DIM` (rgba(240,240,240,0.4)) |

### Animation Notes
- **WordReveal (lines 1–2):** `WordReveal` component. Line 1 words: `["The", "bottleneck", "isn't", "the", "AI."]`, startFrame 20, stagger 8 frames. Line 2 words: `["It's", "the", "infrastructure", "around", "it."]`, startFrame 130, stagger 8 frames.
- **Manifesto block:** `useFadeInUp` per line, stagger 20 frames (frames 270, 290, 310). Larger size (52px) signals climax.
- **Dimming:** Lines 1–2 `interpolate` opacity from 1→0.5 at frame 250 over 20 frames.
- **Phase A→B transition:** All text `interpolate` opacity from current→0 over frames 400–430. End card `useFadeInUp` at frame 440.
- **Final fade to black:** Entire frame's content opacity → 0 over frames 585–615. OR: `AbsoluteFill` overlay with `BG` color, opacity 0→1.
- No accent colors in this scene. Pure `TEXT` and `DIM`. Let the words be the only signal.

### Assets Needed
- Author/channel name text (placeholder: TBD — to be provided before render).

### Transition Out
**Fade to black** — video ends.

---

## Summary — Animation & Asset Inventory

### Reusable Components Needed
| Component | Used In Scenes | Notes |
|-----------|---------------|-------|
| `WordReveal` | 05, 12 | Per-word spring entrance. Words array MUST be individual words. |
| `FadeIn` / `useFadeInUp` | ALL scenes | Default entrance. Opacity 0→1, translateY 20→0. |
| `ScaleIn` / `useScaleIn` | 01, 04, 08, 10 | Scale 0.9→1 + opacity. For emphasis nodes/badges. |
| `Typewriter` / `useTypewriter` | 07 | Character-by-character. For terminal/code text. |
| `LineDrawn` | 04, 08, 09, 10 | SVG stroke-dashoffset via `@remotion/paths`. For arrows, connectors. |
| `CodeBlock` | 06, 07 | Styled code window. bg `#111118`, monospace, syntax colors. |
| `DiagramNode` | 04, 08, 09, 10 | Rounded rect node. bg `#1a1a2e`, border, label. |
| `Badge` | 07, 09 | BEFORE/AFTER badges. Accent bg 10%, accent border, uppercase. |
| `CountUp` | 01 | Number interpolation 0→N, locale formatted. |

### Scene-by-Scene Accent Color Map
| Scene | Accent 1 | Accent 2 | Within Limit? |
|-------|----------|----------|---------------|
| 01 | `RED` | — | ✅ |
| 02 | — | — | ✅ |
| 03 | `RED` | — | ✅ |
| 04 | `CYAN` | `RED` | ✅ |
| 05 | — | — | ✅ |
| 06 | `CYAN` | `RED` | ✅ |
| 07 | `RED` | `GREEN` | ✅ |
| 08 | `GREEN` | `RED` | ✅ |
| 09 | `RED`/`GREEN` | `PURPLE` | ✅ (PURPLE = person semantic) |
| 10 | `CYAN` | — | ✅ |
| 11 | `GREEN` | — | ✅ |
| 12 | — | — | ✅ |

### External Assets Required
None. All scenes are pure animation + text. Audio files (`part_01.mp3` through `part_12.mp3`) are composited post-render per development.md §7.

### Transition Map
| From → To | Type | Duration |
|-----------|------|----------|
| 01 → 02 | fade | 20 frames |
| 02 → 03 | fade | 20 frames |
| 03 → 04 | fade | 20 frames |
| 04 → 05 | fade | 20 frames |
| 05 → 06 | fade | 20 frames |
| 06 → 07 | fade | 20 frames |
| 07 → 08 | fade | 20 frames |
| 08 → 09 | fade | 20 frames |
| 09 → 10 | fade | 20 frames |
| 10 → 11 | fade | 20 frames |
| 11 → 12 | fade | 20 frames |
| 12 → end | fade to black | 30 frames (internal) |

---

*Storyboard by Nyarlathotep 🌙 — 2026-03-23*
*Ready for implementation by Ithaqua 🌬️*
