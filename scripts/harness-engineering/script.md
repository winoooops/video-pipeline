# What Is Harness Engineering
## Full Shooting Script

**Target duration:** 3:30 (6300 frames @ 30fps)
**Audience:** Developers using AI coding tools (Claude Code, Copilot, Codex)
**Emotional arc:** Counterintuitive hook → validate struggle → reframe → empowering close
**Narration pace:** ~150 words/minute → ~525 words total

---

## SCENE TIMING TABLE

| # | Scene Name | Start Frame | Duration (frames) | Duration (sec) | Audio File |
|---|------------|-------------|-------------------|----------------|------------|
| 01 | The Hook | 0 | 330 | 11.0 | part_01.mp3 |
| 02 | The Symphony Team | 330 | 540 | 18.0 | part_02.mp3 |
| 03 | The Instinct | 870 | 525 | 17.5 | part_03.mp3 |
| 04 | What Codex Can't See | 1395 | 525 | 17.5 | part_04.mp3 |
| 05 | The Gap Is Always Yours | 1920 | 525 | 17.5 | part_05.mp3 |
| 06 | The Duplication Problem | 2445 | 540 | 18.0 | part_06.mp3 |
| 07 | Not a Note, a Lint | 2985 | 540 | 18.0 | part_07.mp3 |
| 08 | Architecture as Progressive Disclosure | 3525 | 540 | 18.0 | part_08.mp3 |
| 09 | Taste Compounds | 4065 | 540 | 18.0 | part_09.mp3 |
| 10 | The Full Surface Area | 4605 | 540 | 18.0 | part_10.mp3 |
| 11 | The Goal — Autonomy | 5145 | 540 | 18.0 | part_11.mp3 |
| 12 | The Close | 5685 | 615 | 20.5 | part_12.mp3 |
| **TOTAL** | | **0** | **6300** | **210.0s (3:30)** | |

---

## FULL SCRIPT

---

### [SCENE 01] — The Hook — 11s (330 frames)

**VISUAL:**
Dark background. Four large text blocks animate in one by one, each word appearing with a sharp pop:
`3 engineers`
`5 months`
`1,000,000 lines of code`
`0 lines typed by a human`
Numbers count up / fade in with spring animation. Clean, bold, minimal.

**AUDIO:**
"Three engineers. Five months. One million lines of code. Zero lines typed by a human."

**NOTES:**
Numbers in the first three lines use a counting animation (interpolate from 0 to final value over ~20 frames). The "0" on the last line fades in red to create visual tension — the shocking reveal. Background: very dark blue-black. Text: white or off-white, large, centered.

---

### [SCENE 02] — The Symphony Team — 18s (540 frames)

**VISUAL:**
Text overlay on a dark abstract background (could be a slow-moving dark gradient or subtle grid pattern). Lines of text appear sequentially, clean and editorial:
`OpenAI's Symphony team.`
`Three engineers.`
`Everything — every single line — written by Codex.`
`The real innovation wasn't Codex.`
`It was what they built around it.`

**AUDIO:**
"This isn't a thought experiment. This is what actually shipped. OpenAI's Symphony team. Three engineers, five months, everything written by Codex. And the real innovation wasn't Codex. It was what they built around it."

**NOTES:**
Each sentence fades/slides up as it's spoken. Font: clean monospace or sans-serif. Keep minimal — the words carry the weight. Dark background. Slow, deliberate pacing to match the gravitas of the reveal.

---

### [SCENE 03] — The Instinct — 17.5s (525 frames)

**VISUAL:**
Large centered text, single sentence, fades in:
`"The code Codex wrote was bad."`
Then a second line appears below it:
`So we blamed the model.`
Both lines hold. Then a third line wipes in from the right:
`We were wrong.`

**AUDIO:**
"When the code came out bad, the instinct was to blame the model. We thought: better AI, better code. We were wrong."

**NOTES:**
The third line ("We were wrong.") appears after a short beat — hold the tension, then release it. Use a subtle red accent on "blamed the model" or "wrong" for visual emphasis. Clean, high-contrast.

---

### [SCENE 04] — What Codex Can't See — 17.5s (525 frames)

**VISUAL:**
Diagram-style layout. A large box labeled "Codex" in the center. Surrounding it, smaller boxes connected by dashed lines — these boxes are crossed out or faded to 20% opacity: "Google Docs", "Slack threads", "Decisions in someone's head", "Notion pages", "Meeting notes".
Below the diagram, bold text:
`What Codex can't see — doesn't exist.`

**AUDIO:**
"Codex can only work with what's in the repo. Google Docs, Slack threads, decisions in someone's head — none of it exists to the model. What Codex can't see, doesn't exist."

**NOTES:**
Dashed connecting lines could animate with a stroke-dashoffset "drawing" effect (use `@remotion/paths`). The "doesn't exist" phrase is the payoff — make it visually prominent (larger font, different color, or underline animation).

---

### [SCENE 05] — The Gap Is Always Yours — 17.5s (525 frames)

**VISUAL:**
Full-screen dark background. Centered, large quote-style text:
`The gap is always yours.`
Each word animates in sequentially — word-by-word pop with a subtle bounce (spring animation). After all words appear, a smaller explanatory line fades in below:
`The model did what we made possible. The slop was in the scaffolding.`

**AUDIO:**
"The gap is always yours. When an agent produces bad code, almost never is the model the problem. The gap is in what we provided. The model did what we made possible."

**NOTES:**
This is the anchor phrase of the entire video — treat it as such. The "The gap is always yours" line should be cinematic: large, bold, centered. The explanatory sentence below is smaller, supportive. Consider a subtle light leak or vignette on this scene for atmosphere.

---

### [SCENE 06] — The Duplication Problem — 18s (540 frames)

**VISUAL:**
Animated code snippet — a simple function `getConcurrencyHelper()` shown in a code window. Three identical instances of it appear stacked, each labeled with a faint timestamp or author tag (e.g., "agent-abc", "agent-def", "agent-xyz"). A red highlight圈 highlights the duplication.
`// DUPLICATED — 3 times`

**AUDIO:**
"Here's a real example from Symphony. Agents kept duplicating a concurrency helper. The same function, defined three different times, three different places. Three different agents, none of them aware of the others."

**NOTES:**
Code window with monospace font. The three stacked instances appear with a staggered slide-up animation. Red highlight ring or underline on "DUPLICATED" label. Keep code simple — readable, not intimidating.

---

### [SCENE 07] — Not a Note, a Lint — 18s (540 frames)

**VISUAL:**
Split screen:
- Left: A text file titled "AGENTS.md" with a bullet point crossed out: `"⚠️ Please don't define getConcurrencyHelper() in multiple places"` — a sad, ignored note.
- Right: A terminal window showing a red error: `ERROR: getConcurrencyHelper() defined here. This function must only be defined at lib/concurrency.ts:1. ESLint (no-restricted-syntax)`.
The right side pulses subtly to indicate "this rule bites."

**AUDIO:**
"The old instinct: write a note. 'Please don't do this.' The new instinct: write a linter. A rule that makes it impossible — at parse time, before the code even runs — to define this function anywhere except one canonical location. Not a note. A lint."

**NOTES:**
The crossed-out note on the left should look sad/faded. The terminal error on the right should look live — maybe a blinking cursor or subtle scan-line effect. The contrast between "ignored note" and "enforced rule" is the visual joke.

---

### [SCENE 08] — Architecture as Progressive Disclosure — 18s (540 frames)

**VISUAL:**
Two-node diagram with directional arrows:
- Left node labeled "Service" — pointing with a solid arrow to right node labeled "Types"
- Right node labeled "Types" — with a crossed-out red X on an arrow pointing back to "Service"
Below the diagram, two lines of text:
`Service can use Types.`
`Types can never import Service.`
`Directional boundaries enforced by the build.`

**AUDIO:**
"Their architecture followed a rule: Service can use Types, but Types can never import Service. This isn't a note in a README. It's enforced by the build system. Agents working in one domain see an opaque interface — they don't need to page in the entire codebase. The same principle as loading a SKILL.md file: description first, details on demand."

**NOTES:**
The solid arrow from Service → Types is green or white. The blocked X from Types → Service is red. Arrows animate in sequentially as the voiceover describes each direction. Keep the diagram clean — nodes as rounded rectangles, arrows as animated paths.

---

### [SCENE 09] — Taste Compounds — 18s (540 frames)

**VISUAL:**
A flowchart / before-after layout:
- Left side labeled "BEFORE": A small box "Ryan (backend infra engineer)" pointing to a question mark over a React component — labeled "mediocre React from Codex"
- Right side labeled "AFTER": Same "Ryan" box, but now there's an intermediate box labeled "Sarah (frontend architect)" with a downward arrow, then "Shared infrastructure: single-hook-per-file, snapshot testing, small components" — then an arrow to "Better React from everyone's Codex"
A subtle annotation: `The model didn't change. The codebase did.`

**AUDIO:**
"Ryan was a backend infra engineer. He couldn't get good React from Codex. So they hired a frontend architect — Sarah. She encoded her taste into shared infrastructure: single-hook-per-file, snapshot testing, small components. After that, everyone's Codex produced better React. Not because the model changed. Because the codebase now contained the taste of someone who knew what good frontend looked like."

**NOTES:**
The "The model didn't change. The codebase did." line is the emotional punch of this scene — it should appear as a bold callout after the flowchart. Consider using a subtle highlight or color shift on these final words.

---

### [SCENE 10] — The Full Surface Area — 18s (540 frames)

**VISUAL:**
A hexagonal or radial diagram with "Agent-Generated" in the center, and surrounding nodes:
`CI config`
`Internal dev tools`
`Documentation`
`Eval harnesses`
`Review comments`
`Scripts that manage the repo`
`Production dashboard definitions`
All nodes connected to the center. They appear one by one with a pop animation.

**AUDIO:**
"And it's not just product code. Everything is agent-generated: CI configuration, internal dev tools, documentation, eval harnesses, review comments, scripts that manage the repo itself, production dashboard definitions. The full surface area. All of it needs to be legible, consistent, worth copying."

**NOTES:**
The radial/hexagonal layout is visually interesting — nodes appear with staggered spring animations. The word "worth copying" is the key qualifier — maybe emphasize with a brief underline animation or color pop. Keep the center label "Agent-Generated" prominent throughout.

---

### [SCENE 11] — The Goal — Autonomy — 18s (540 frames)

**VISUAL:**
Large centered text, single line, bold:
`The goal: agents that work longer.`
`More reliably.`
`With less hand-holding.`
Each line appears sequentially with a fade-up.

Below, smaller text:
`Not because the model got better.`
`Because the foundation got clearer.`

**AUDIO:**
"The goal isn't to replace engineers. The goal is autonomy — agents that work longer, more reliably, with less hand-holding. Not because the models got better. Because the foundation got clearer."

**NOTES:**
The contrast in the final two lines — "model didn't change, codebase did" echoing back from Scene 09 — is intentional. Let the words land with a beat of silence between "not because the models got better" and "because the foundation got clearer." Consider a subtle slow zoom or the same light leak/vignette treatment from Scene 05.

---

### [SCENE 12] — The Close — 20.5s (615 frames)

**VISUAL:**
Full-screen dark background. Large centered text, word-by-word reveal:
`The bottleneck isn't the AI.`
`It's the infrastructure around it.`
After this, a third block fades in with the thesis statement:
`In the agent-first world,`
`scaffolding matters more`
`than the code itself.`
Final card: small logo/title treatment — "What Is Harness Engineering" + author/channel name.

**AUDIO:**
"The bottleneck isn't the AI. It's the infrastructure around it. If you're getting slop from your coding agents, look at your lint rules, your docs, your architecture. The fix is almost always yours, not the model's. In the agent-first world, scaffolding matters more than the code itself."

**NOTES:**
The word-by-word reveal on the first two lines should be deliberate — a beat between "The bottleneck isn't the AI" and "It's the infrastructure around it." The thesis statement in the third block should feel like a manifesto — larger font, bold, centered. Final card holds for 3-4 seconds. Fade to black.

---

## PRODUCTION NOTES

### Animation Summary (for Ithaqua)
- **Text reveals:** word-by-word pop via `spring()` (damping: 20, stiffness: 200)
- **Code windows:** slide-up with stagger
- **Diagrams:** stroke-dashoffset line-draw (use `@remotion/paths`)
- **Scene transitions:** `@remotion/transitions` — fade or slide between scenes
- **Atmospheric overlays:** `@remotion/light-leaks` — subtle warm leak at Scenes 05 and 11
- **No CSS animations, no Tailwind — everything via `useCurrentFrame()`**

### Audio
- Total script: ~525 words
- Estimated narration time: ~210 seconds @ 150 wpm
- Deliver as 12 separate MP3 files (`part_01.mp3` through `part_12.mp3`) to align with scene timing
- Normalize audio: `loudnorm=I=-16:TP=-1:LRA=11`

### Fonts
- Monospace: JetBrains Mono or similar code font
- Sans-serif: Inter or similar (bold weights for headings)
- Both available in `@remotion/fonts`

### Color Palette
- Background: `#0a0a0f` (near-black with slight blue tint)
- Primary text: `#f0f0f0` (off-white)
- Accent / emphasis: `#ff6b6b` (warm red) for "wrong" / "blamed" / "gap" moments
- Secondary / diagrams: `#4ade80` (green) for positive directions, `#ef4444` (red) for blocked directions
- Subtle grid or grain on backgrounds for texture

---

*Script by Nyarlathotep 🌙 — 2026-03-23*
*Word count: ~525 | Target duration: 3:30 (6300 frames @ 30fps)*
