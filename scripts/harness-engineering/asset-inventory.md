# Asset Inventory — "What Is Harness Engineering"

> All visual assets required across 12 scenes.
> Define design specs here. Build in Phase 5 (Asset Generation).
> Reference: `art-direction.md` for palette + typography, `development.md` for component patterns.

---

## 1. Reusable Animation Components

These are React components that appear across multiple scenes. Build once, import everywhere.

### 1.1 WordReveal
- **Used in:** Scene 05, Scene 12
- **Purpose:** Per-word spring entrance for hero text
- **API:** `<WordReveal words={string[]} startFrame={number} fontSize={number} color={string} />`
- **Behavior:** Each word renders as an `inline-block` span inside a flex container with `gap: 0.35em`. Words enter sequentially using `spring()` with `springConf` (damping 20, stiffness 200, mass 0.5). Each word animates opacity 0→1 and scale 0→1.
- **CRITICAL RULE:** Words array must contain individual words only. Never `["multiple words"]` — always `["multiple", "words"]`.
- **Stagger:** Configurable via `wordDelay` prop (default: 10 frames)
- **Design:**
  - Font: Arial, sans-serif
  - Letter spacing: `-0.03em`
  - Weight: 800

### 1.2 FadeIn
- **Used in:** ALL scenes (default entrance wrapper)
- **Purpose:** Fade up + slide wrapper for any element
- **API:** `<FadeIn triggerFrame={number} children />`
- **Behavior:** Uses `spring()` with `springConf`. Animates opacity 0→1 and translateY 20→0.
- **Design:** Transparent wrapper — styling determined by children

### 1.3 CountUp
- **Used in:** Scene 01
- **Purpose:** Animated number counter (0 → target value)
- **API:** `<CountUp target={number} startFrame={number} duration={number} fontSize={number} color={string} />`
- **Behavior:** `interpolate(frame, [startFrame, startFrame + duration], [0, target])` rounded to integer, formatted with `toLocaleString()` for comma separators.
- **Design:**
  - Font: Arial, sans-serif
  - Weight: 800
  - Size: 64px (configurable)
  - Color: `TEXT` (#f0f0f0) default

### 1.4 DiagramNode
- **Used in:** Scene 04, Scene 08, Scene 09, Scene 10
- **Purpose:** Rounded rectangle node for diagrams
- **API:** `<DiagramNode label={string} sublabel?={string} borderColor?={string} />`
- **Design:**
  - Background: `#1a1a2e`
  - Border: `2px solid rgba(255,255,255,0.15)` (default) or custom `borderColor`
  - Border radius: `10px`
  - Padding: `12px 20px` (small) / `16px 32px` (large — Scene 08)
  - Label font: Arial, 24px, weight 700, color `TEXT`
  - Sublabel font: Arial, 18px, weight 400, color `DIM`

### 1.5 Badge
- **Used in:** Scene 07, Scene 09
- **Purpose:** BEFORE/AFTER labels, status tags
- **API:** `<Badge text={string} color={string} />`
- **Design:**
  - Background: accent color at 10% opacity (e.g., `rgba(255,107,107,0.1)` for RED)
  - Border: `1px solid {color}`
  - Border radius: `6px`
  - Padding: `6px 14px`
  - Font: Arial, 18px, weight 700, uppercase, letter-spacing `0.1em`
  - Text color: matches accent

### 1.6 CodeBlock
- **Used in:** Scene 06, Scene 07
- **Purpose:** Styled code window with optional header
- **API:** `<CodeBlock header?={string} children />`
- **Design:**
  - Background: `#111118`
  - Border: `1px solid rgba(255,255,255,0.1)`
  - Border radius: `8px`
  - Padding: `20px 24px`
  - Header bar: height 32px, bg `rgba(255,255,255,0.05)`, border-bottom same as outer border
  - Header text: Arial, 18px, weight 600, color `DIM`
  - Code font: `"Courier New", monospace`, 20px, weight 400
  - Max width: 700px
  - Syntax colors:
    - Keywords (`function`, `return`, `const`): `CYAN` (#67e8f9)
    - Strings: `GREEN` (#4ade80)
    - Comments (`// ...`): `DIM` (rgba(240,240,240,0.4))
    - Function names: `TEXT` (#f0f0f0)
    - Constants/special: `PURPLE` (#a78bfa)
    - Errors/warnings: `RED` (#ff6b6b)

### 1.7 LineDrawn (SVG Arrow/Connector)
- **Used in:** Scene 04, Scene 08, Scene 09, Scene 10
- **Purpose:** Animated SVG path with stroke-dashoffset reveal
- **API:** `<LineDrawn startFrame={number} duration={number} path={string} stroke={string} strokeWidth={number} dashed?={boolean} />`
- **Behavior:** Uses `@remotion/paths` `evolvePath()`. `interpolate(frame, [startFrame, startFrame+duration], [0, 1])` controls path progress.
- **Design:**
  - Stroke width: 2–3px
  - Stroke color: `rgba(255,255,255,0.3)` (default connections), or accent color for semantic arrows
  - Dashed variant: `strokeDasharray: "8,6"`
  - Arrowhead: SVG marker or manual triangle at path end

### 1.8 CalloutBox
- **Used in:** Scene 09
- **Purpose:** Highlighted callout text with accent border
- **API:** `<CalloutBox color={string} children />`
- **Design:**
  - Background: accent color at 10% opacity
  - Border: `1px solid {color}`
  - Border radius: `8px`
  - Padding: `14px 32px`
  - Text inherits from children

### 1.9 Strikethrough
- **Used in:** Scene 07
- **Purpose:** Animated line drawn through text (left → right)
- **API:** `<Strikethrough triggerFrame={number} duration={number} color={string} children />`
- **Behavior:** A thin line (`2px`) animates width from 0% → 100% across the text content. Uses `interpolate` on width.
- **Design:**
  - Line color: `RED` (#ff6b6b) default
  - Line height: centered vertically on text
  - Duration: 20 frames

---

## 2. Static Design Elements

### 2.1 Background
- **Used in:** ALL scenes
- **Spec:** Solid `#0a0a0f` (`BG`) — no gradients, no textures, no patterns
- **Implementation:** `<AbsoluteFill style={{ backgroundColor: "#0a0a0f" }}>`

### 2.2 Light Leak Overlay
- **Used in:** Scene 05, Scene 11
- **Spec:** Warm atmospheric overlay from `@remotion/light-leaks` package
- **Design:**
  - Position: absolute, full frame
  - Opacity: 10–15%
  - Blend mode: `screen`
  - Animate: fade in 0→target over 30 frames, hold, fade out over 100 frames before scene end
- **Note:** Check if `@remotion/light-leaks` exists. If not, implement as a radial gradient overlay:
  - Fallback: `radialGradient` from `rgba(255,200,100,0.08)` center to `transparent` edge
  - Position: offset slightly from center for organic feel

### 2.3 Red ✗ Mark
- **Used in:** Scene 04 (over satellite nodes), Scene 08 (over blocked arrow)
- **Spec:** Text character `✗` in RED
- **Design:**
  - Font: Arial, sans-serif
  - Size: 24px (Scene 04), 48px (Scene 08)
  - Weight: 800
  - Color: `RED` (#ff6b6b)
  - Entrance: `useScaleIn`

---

## 3. Scene-Specific Layouts

These are not reusable — they're one-off layout compositions built per-scene.

### 3.1 Scene 01 — Stat Stack
- **Layout:** Vertical flex, centered, gap 24px
- **Content:** 4 rows, each row = [CountUp number] + [label text]
- **Sizes:** Number 64px, label 48px
- **Special:** Row 4 number in `RED`, uses `ScaleIn` instead of `CountUp`

### 3.2 Scene 02 — Editorial Text Stack
- **Layout:** Vertical flex, centered, gap 16px
- **Content:** 5 lines of text, sequential fade-up
- **Sizes:** Lines 1–3 at 38px/600, Lines 4–5 at 42px/800
- **Special:** Lines 1–3 dim to 70% opacity when line 4 appears

### 3.3 Scene 03 — Three-Beat Reveal
- **Layout:** Vertical flex, centered, gap 24px
- **Content:** 3 text lines with dramatic 60-frame pause before line 3
- **Sizes:** Lines 1–2 at 38–42px, Line 3 at 48px
- **Special:** `RED` accent on "blamed the model" (line 2 partial) and all of line 3

### 3.4 Scene 04 — Codex Radial Diagram
- **Layout:** Center node + 5 satellite nodes in radial arrangement
- **Content:** `DiagramNode` center ("Codex", CYAN border), 5 `DiagramNode` satellites
- **Special:** Satellites dim to 20% + red ✗ overlay at frame 170

### 3.5 Scene 05 — Anchor Phrase
- **Layout:** Vertical flex, centered, generous gap (48px between hero and supporting text)
- **Content:** `WordReveal` hero line + 2 supporting `DIM` lines
- **Special:** Light leak overlay

### 3.6 Scene 06 — Triple Code Block
- **Layout:** 3 `CodeBlock` components stacked with z-offset (8px right, 40px down each)
- **Content:** Identical `getConcurrencyHelper()` function × 3, different agent headers
- **Special:** RED annotation `// DUPLICATED — 3 times` overlays all three at frame 180

### 3.7 Scene 07 — Split Panel (Note vs. Lint)
- **Layout:** Two-column flex, 45% width each, centered, gap 48px
- **Content:** Left = `CodeBlock` (AGENTS.md with `Strikethrough`), Right = `CodeBlock` (terminal error)
- **Badges:** `Badge` "BEFORE" (RED) top-left of left panel, `Badge` "AFTER" (GREEN) top-left of right panel
- **Special:** Right panel pulse (opacity 1→0.85→1) at frame 300

### 3.8 Scene 08 — Directional Boundary Diagram
- **Layout:** Two `DiagramNode` side by side, gap 120px, centered
- **Content:** "Service" → "Types" (GREEN arrow), "Types" → "Service" (RED dashed arrow + ✗)
- **Special:** Red arrow only draws to 60% then stops (blocked)

### 3.9 Scene 09 — Before/After Flowchart
- **Layout:** Two-column flex, centered, gap 60px
- **Content:** Left = BEFORE (Ryan → ? → mediocre), Right = AFTER (Ryan → Sarah → infra → better)
- **Components:** `Badge` × 2, `DiagramNode` × 4, `CalloutBox` × 1
- **Special:** `PURPLE` accent for person names (Ryan, Sarah)

### 3.10 Scene 10 — Radial Tag Cloud
- **Layout:** Center `DiagramNode` + 7 satellite `DiagramNode` in clock-face arrangement
- **Content:** "Agent-Generated" (CYAN border) center, 7 items radially arranged
- **Special:** Underline animation on "worth copying" in caption

### 3.11 Scene 11 — Settling Statement
- **Layout:** Vertical flex, centered, gap 32px (top group) + 80px gap + gap 24px (bottom group)
- **Content:** 3 hero lines + 2 contrast lines
- **Special:** Slower spring (mass 0.8 or stiffness 150), light leak overlay

### 3.12 Scene 12 — Manifesto + End Card
- **Layout:** Phase A = vertical flex centered (`WordReveal` × 2, then manifesto block), Phase B = centered end card
- **Content:** Thesis words, manifesto lines, title card
- **Special:** Phase A→B crossfade at frame 400. Final fade to black at frame 585.

---

## 4. Color Token Reference

Imported from `art-direction.md` — every asset must use these tokens only.

| Token | Hex | CSS Value |
|-------|-----|-----------|
| `BG` | `#0a0a0f` | `backgroundColor: "#0a0a0f"` |
| `TEXT` | `#f0f0f0` | `color: "#f0f0f0"` |
| `DIM` | `rgba(240,240,240,0.5)` | `color: "rgba(240,240,240,0.5)"` |
| `RED` | `#ff6b6b` | `color: "#ff6b6b"` |
| `GREEN` | `#4ade80` | `color: "#4ade80"` |
| `CYAN` | `#67e8f9` | `color: "#67e8f9"` |
| `PURPLE` | `#a78bfa` | `color: "#a78bfa"` |
| Node BG | `#1a1a2e` | `backgroundColor: "#1a1a2e"` |
| Code BG | `#111118` | `backgroundColor: "#111118"` |

---

## 5. External Assets

**None.** All 12 scenes are pure code-rendered animation + text. No images, no clips, no external footage.

Audio files (`part_01.mp3` through `part_12.mp3`) are composited post-render via ffmpeg per `development.md` §7.

---

## 6. Package Dependencies

| Package | Asset Category | Status |
|---------|---------------|--------|
| `remotion` | Core framework (spring, interpolate, AbsoluteFill) | ✅ Installed (4.0.0) |
| `@remotion/transitions` | TransitionSeries, fade | ✅ Installed (4.0.438) |
| `@remotion/paths` | LineDrawn (evolvePath, stroke-dashoffset) | ✅ Installed (4.0.438) |
| `@remotion/media` | OffthreadVideo (future footage scenes) | ✅ Installed (4.0.438) |
| `@remotion/light-leaks` | Atmospheric overlays (Scene 05, 11) | ❓ Check availability — may need radial gradient fallback |

---

## 7. Build Order (for Phase 5)

Build reusable components first, then scene-specific layouts:

**Batch 1 — Core Components:**
1. `FadeIn.tsx`
2. `WordReveal.tsx`
3. `CountUp.tsx`
4. `DiagramNode.tsx`

**Batch 2 — Styled Elements:**
5. `Badge.tsx`
6. `CodeBlock.tsx`
7. `CalloutBox.tsx`
8. `Strikethrough.tsx`

**Batch 3 — SVG Animation:**
9. `LineDrawn.tsx`

**Batch 4 — Scene Assembly** (Phase 6+):
10. Rebuild each HE01–HE12 scene using the components above

---

*Asset inventory by Ithaqua 🌬️ — 2026-03-23*
*All design specs frozen. Build in Phase 5.*
