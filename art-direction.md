# Art Direction — Remotion Video Pipeline

> Visual language, color system, typography, motion style, and tone.
> This document defines how every frame looks and feels.

---

## 1. Visual Identity

### Tone
**Dark, technical, confident.** Think: a well-designed developer talk slide deck, not a YouTube thumbnail with screaming faces. The visuals serve the ideas — they don't compete with them.

### Mood Board Keywords
- Terminal aesthetics — dark backgrounds, monospace accents, code blocks
- Clean data visualization — labeled diagrams, not decorative charts
- Subtle motion — spring physics, not bounce/wobble
- Cinematic restraint — let negative space breathe

### What We Are NOT
- Bright, colorful, playful (no pastels, no gradients-for-gradients-sake)
- Busy or cluttered (if there are more than 3 visual elements on screen, something's wrong)
- Gimmicky (no 3D spinning logos, no particle effects unless they serve the narrative)

---

## 2. Color Palette

### Style: S22 暗夜優雅 (Dark Elegant)
Based on StylePrompt S22 — refined dark theme with gradient depth, subtle glow accents, professional depth.

### Core Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `BG_TOP` | `#0a0a12` | Background gradient top — deep dark with blue undertone |
| `BG_BOT` | `#0d1117` | Background gradient bottom — slightly lighter, GitHub-dark feel |
| `TEXT` | `#e8eaed` | Primary text — headings, body, labels (slightly warmer than pure white) |
| `DIM` | `rgba(232,234,237,0.45)` | Secondary text — subtitles, captions, metadata |
| `RED` | `#ff6b6b` | Accent — warnings, emphasis, "bad" states, call-to-action |
| `GREEN` | `#4ade80` | Accent — success, "good" states, improvements, growth |
| `CYAN` | `#67e8f9` | Accent — links, technical terms, code highlights |
| `PURPLE` | `#a78bfa` | Accent — people/roles, special callouts |
| `GLOW` | `rgba(103,232,249,0.08)` | Subtle glow behind elements — creates depth |
| `NODE_BG` | `#141422` | Diagram node background — slightly lighter than BG |
| `CODE_BG` | `#0d1117` | Code block background — GitHub dark |

### Background Treatment
**Never flat black.** Every scene uses a radial or linear gradient background:
```tsx
// Standard scene background
background: "linear-gradient(180deg, #0a0a12 0%, #0d1117 100%)"

// With subtle radial glow (for emphasis scenes 05, 11, 12):
background: "radial-gradient(ellipse 60% 50% at 50% 40%, #12122a 0%, #0a0a12 50%, #0d1117 100%)"
```

### Glow Effects
Elements get subtle glow via `boxShadow`:
```tsx
// Accent glow on nodes/badges
boxShadow: "0 0 20px rgba(103,232,249,0.15), 0 0 40px rgba(103,232,249,0.05)"

// Subtle depth shadow on code blocks
boxShadow: "0 4px 24px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.05)"
```

### Usage Rules
1. **Background is always a gradient** — `linear-gradient(180deg, #0a0a12, #0d1117)` minimum. Never flat `#000000` or `#0a0a0f`.
2. **Maximum 2 accent colors per scene.** Red + Green for contrast. Cyan for technical. Purple for people.
3. **Text is always `#e8eaed` or `DIM`.** Accent colors for labels/badges/highlights only.
4. **Opacity for hierarchy.** Use `rgba(232,234,237, 0.3–0.6)` for tertiary elements.
5. **Glow sparingly.** Only on key elements: diagram nodes, badges, callout boxes. Not on every text element.

### Color Semantics
| Meaning | Color | Example |
|---------|-------|---------|
| Problem / bad / before | `RED` | "Agents kept duplicating code" |
| Solution / good / after | `GREEN` | "The model didn't change. The codebase did." |
| Technical term / code | `CYAN` | `AGENTS.md`, `@remotion/transitions` |
| Person / role | `PURPLE` | "Sarah — frontend architect" |
| De-emphasized | `DIM` | Subtitles, timestamps, metadata |

---

## 3. Typography

### Font Stack
| Role | Font | Weight | Size Range |
|------|------|--------|-----------|
| Headings | Arial, Helvetica, sans-serif | 800 (ExtraBold) | 48–64px |
| Body text | Arial, Helvetica, sans-serif | 600 (SemiBold) | 28–38px |
| Subtitles | Arial, Helvetica, sans-serif | 400 (Regular) | 16–22px |
| Code / technical | `"Courier New", monospace` | 400 | 18–24px |
| Labels / badges | Arial, Helvetica, sans-serif | 700 (Bold) | 14–18px |

### Type Rules
1. **Letter spacing:** `-0.03em` for headings (tighter), `0` for body, `0.05em` for uppercase labels (looser)
2. **Line height:** 1.3 for headings, 1.5 for body text
3. **Maximum line width:** ~60 characters. Break long sentences into multiple lines.
4. **No justified text.** Left-align or center-align only.
5. **Uppercase sparingly.** Only for labels, badges, and section headers (e.g., "BEFORE", "AFTER").

### Size Hierarchy (1920×1080 canvas)
| Level | Size | Use Case |
|-------|------|----------|
| Hero | 56–64px | Opening statement, closing thesis, one-liner impact |
| H1 | 48–52px | Scene title, key phrase |
| H2 | 36–42px | Supporting statement |
| Body | 28–32px | Explanatory text |
| Caption | 18–22px | Subtitles, metadata, timestamps |
| Label | 14–16px | Diagram annotations, badges |

### Mobile Readability Rule
**Nothing smaller than 18px.** If a label is smaller than 18px on a 1920×1080 canvas, it will be invisible on a phone screen. Diagram labels, node annotations, and badge text must be ≥18px.

---

## 4. Layout

### Grid System
- **Canvas:** 1920×1080 (16:9)
- **Safe zone:** 120px padding on all sides (effective content area: 1680×840)
- **Center bias:** Default layout is centered vertically and horizontally. Content should feel balanced, not top-left anchored.

### Layout Patterns

#### Single Statement
```
┌────────────────────────────────┐
│                                │
│                                │
│     [Hero text, centered]      │
│     [Subtitle below, DIM]      │
│                                │
│                                │
└────────────────────────────────┘
```
Use for: Scene openers, thesis statements, transitions. Most scenes start here.

#### Split Comparison (BEFORE / AFTER)
```
┌────────────────────────────────┐
│                                │
│   ┌─────────┐  ┌─────────┐    │
│   │ BEFORE  │  │  AFTER  │    │
│   │         │  │         │    │
│   └─────────┘  └─────────┘    │
│                                │
│   [Callout text, centered]     │
└────────────────────────────────┘
```
Use for: Contrasts, evolution, improvement. Two columns, equal width, centered with gap.

#### Diagram + Caption
```
┌────────────────────────────────┐
│                                │
│   ┌──────────────────────┐     │
│   │    [Diagram/nodes]   │     │
│   └──────────────────────┘     │
│                                │
│   [Caption below, centered]    │
│                                │
└────────────────────────────────┘
```
Use for: Architecture, flowcharts, relationships. Diagram fills 60–70% of width, centered.

#### Code Block
```
┌────────────────────────────────┐
│                                │
│   ┌──────────────────────┐     │
│   │ // filename.ts       │     │
│   │ const x = ...        │     │
│   │                      │     │
│   └──────────────────────┘     │
│                                │
└────────────────────────────────┘
```
Use for: Code examples, config files. Dark code block (`#111118`) on dark background. Rounded corners (8px). Monospace font.

### Layout Rules
1. **Never use absolute positioning for primary content.** Use flexbox with `justifyContent: "center"` and `alignItems: "center"`. Absolute positioning is only for overlays, badges, and decorative elements.
2. **Never leave >50% of the frame empty.** If a layout uses only one quadrant, it needs to be recentered or the content needs to grow.
3. **Consistent gaps.** Use `gap: 16 | 24 | 32 | 48 | 64` — pick from this scale. No arbitrary values.

---

## 5. Motion Language

### Spring Config
All entrance animations use the shared spring:
```ts
{ damping: 20, stiffness: 200, mass: 0.5 }
```
This produces a fast, slightly bouncy entrance (~0.3s to settle). No easing functions — spring physics only.

### Entrance Patterns
| Pattern | Animation | Trigger | Use For |
|---------|-----------|---------|---------|
| Fade Up | opacity 0→1, translateY 20→0 | Spring | Default element entrance |
| Scale In | opacity 0→1, scale 0.9→1 | Spring | Emphasis moments, badges |
| Word Reveal | Per-word spring entrance, staggered | Spring + delay | Headlines, thesis statements |
| Typewriter | Character-by-character reveal | Linear | Code, terminal output |
| Line Draw | stroke-dashoffset animation | Interpolate | Diagrams, connections, flow arrows |

### Timing Rules
1. **Stagger:** 8–12 frames between sequential element entrances. Feels rhythmic, not simultaneous.
2. **Nothing appears instantly.** Every element must animate in, even if the animation is just 10 frames of opacity 0→1.
3. **Hold time:** After all elements are visible, hold for at least 60 frames (2s) before the scene transition begins. Let the viewer read.
4. **Crossfade:** 20 frames (0.67s) between scenes via `TransitionSeries`. Not longer — avoid the "buffering" feel.

### Motion Don'ts
- No bounce (overshoot > 5% looks cheap)
- No rotation (unless it's a loading spinner or clock)
- No horizontal slides (elements should enter vertically or by scaling)
- No simultaneous entrance of all elements (stagger everything)
- No infinite loops or continuous animation (every animation should settle)

---

## 6. Diagram Style

### Node Boxes
- Background: `#1a1a2e` (slightly lighter than BG)
- Border: `2px solid rgba(255,255,255,0.15)`
- Border radius: `10px`
- Padding: `12px 20px`
- Text: `TEXT` color, 20px, weight 700
- Subtitle: `DIM` color, 13px

### Arrows / Connections
- Character arrows: `→` in `DIM` or accent color, 28px
- SVG arrows: stroke `rgba(255,255,255,0.3)`, strokeWidth 2
- Animate with stroke-dashoffset for "drawing" effect

### Badges / Tags
- Background: accent color at 10% opacity (e.g., `rgba(74,222,128,0.1)`)
- Border: `1px solid {accent}`
- Border radius: `6px`
- Padding: `6px 14px`
- Text: accent color, 14–16px, weight 700, uppercase

### Labels
- Positioned near the element they describe
- Size: ≥18px (mobile readability rule)
- Color: accent or `DIM` depending on importance
- Never overlap other elements

---

## 7. Code Block Style

### Appearance
- Background: `#111118`
- Border: `1px solid rgba(255,255,255,0.1)`
- Border radius: `8px`
- Padding: `20px 24px`
- Font: `"Courier New", monospace`, 20px
- Max width: 900px (centered)

### Syntax Highlighting
| Token Type | Color |
|-----------|-------|
| Keywords | `CYAN` (#67e8f9) |
| Strings | `GREEN` (#4ade80) |
| Comments | `DIM` (rgba(240,240,240,0.4)) |
| Functions | `TEXT` (#f0f0f0) |
| Constants | `PURPLE` (#a78bfa) |
| Errors / warnings | `RED` (#ff6b6b) |

### Animation
- Code blocks enter with `useFadeInUp` (fade + slide up)
- Individual lines can stagger with typewriter effect for emphasis
- Highlight important lines with a subtle left-border accent (`4px solid CYAN`)

---

## 8. Video / Footage Compositing

### When to Use Real Footage
- Desktop recordings (IDE, terminal, browser)
- Screen captures of tools being discussed
- B-roll to break up pure animation segments (every 3–4 scenes)

### Compositing Rules
1. Use `<OffthreadVideo>` from `@remotion/media` — never `<video>` HTML tag
2. Footage sits inside a rounded container (border-radius 12px, border 2px solid rgba(255,255,255,0.1))
3. Footage is never full-frame — always inset with the dark BG visible as a "frame"
4. Apply a subtle vignette overlay if footage is bright (to maintain dark tone)
5. Footage opacity: 100% when it's the focus, 60% when it's background/ambient

### File Requirements
- Format: H.264 MP4
- Resolution: ≥1920×1080 (will be scaled down if larger)
- Duration: trimmed to exact scene duration before embedding
- Location: `src/assets/clips/`

---

## 9. Emotional Arc Template

Every video follows this emotional structure:

| Phase | Scenes | Emotion | Visual Energy |
|-------|--------|---------|---------------|
| Hook | 1 | Curiosity / surprise | High — bold statement, numbers, contrast |
| Context | 2–3 | Understanding | Medium — story setup, characters |
| Problem | 4–5 | Tension | Rising — show what's broken |
| Solution | 6–8 | Insight | Peak — the "aha" moments |
| Evidence | 9–10 | Conviction | Steady — proof, examples |
| Thesis | 11–12 | Resolve | Settling — takeaway, call to action |

### Visual Energy Mapping
- **High energy:** Larger fonts, faster stagger timing, accent colors, numbers
- **Medium energy:** Standard layout, balanced composition, neutral colors
- **Peak energy:** Split comparisons, diagrams, code blocks — dense information
- **Settling energy:** Single statement, wide spacing, DIM colors, slow spring

---

## 10. Quality Checklist

Before any scene is considered complete:

- [ ] Background is `#0a0a0f`
- [ ] No text smaller than 18px
- [ ] No more than 2 accent colors used
- [ ] All elements animate in (nothing appears instantly)
- [ ] Hold time ≥ 2s after last element appears
- [ ] Layout is centered (no top-left bias)
- [ ] Code blocks use monospace font
- [ ] All words have proper spacing (no concatenation bugs)
- [ ] Looks readable at 720p (simulate: squint at the preview)

---

*The wind knows what looks right. Trust the system.* 🌬️
