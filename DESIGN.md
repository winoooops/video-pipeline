# DESIGN.md — S08 Retro Print Style

## Style Reference
StylePrompts S08 "復古印紙" — 60s-70s print aesthetic.
Warm earth tones, paper grain texture, serif typography, editorial layout.

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#F7E8D0` | Warm parchment |
| Text primary | `#5D4037` | Deep brown |
| Text secondary | `#6D4C41` | Medium brown |
| Text tertiary | `#8D6E63` | Light brown, labels |
| Accent | `#E65100` | Burnt orange — CTAs, highlights |
| Card bg | `rgba(93,64,55,0.05)` | Very subtle brown tint |
| Border | `#D7CCC8` | Subtle dividers |
| Heavy border | `#5D4037` | Section dividers (3px) |

## Typography
- Headings: Georgia, serif — weight 900, letter-spacing -0.025em
- Labels: sans-serif, uppercase, letter-spacing 0.3em, weight 700
- Body: serif, natural spacing, weight 400
- Size hierarchy: 60 → 36 → 20 → 14

## Card Style
- border-radius: 12px
- background: rgba(93,64,55,0.05)
- NO shadows, NO borders by default
- Featured card: border 2px solid #E65100

## Layout
- Paper grain noise texture overlay (SVG feTurbulence)
- 3px solid #5D4037 borders for section separators
- Generous margins, editorial spacing
- Concentric circle decorative elements (optional)
- Pill-shaped buttons with uppercase tracking

## Animation
- Fade in + translateY(20px), 15-18 frame duration
- Staggered delays between elements
