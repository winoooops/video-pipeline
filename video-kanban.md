# Video Pipeline Kanban — "What Is Harness Engineering"

> Last updated: 2026-03-23 19:11 HKT
> Owner: **Hastur** 👑 | Stakeholder: **winoooops**
> Repo: `github.com/winoooops/video-pipeline`
> Communication: @mention blocker owner in this channel

---

## Pipeline Overview

```
[Concept] → [Script] → [Storyboard] → [Assets] → [Animation] → [Audio] → [Composite] → [QA Review] → [Render] → [Publish]
```

**winoooops** = stakeholder at `QA Review` (approve/reject) and `Publish` (final go/no-go)
**Hastur** = board owner

---

## Current Video: Harness Engineering

> Topic: OpenAI Symphony team's Harness Engineering approach — three engineers, five months, a million lines of code via Codex
> Article: `F:\Personal\obsidian-vault\winoooops&Claw\articles\What Is Harness Engineering.md`

| Stage | Owner | Status | Notes |
|-------|-------|--------|-------|
| Concept | winoooops | ✅ Done | Harness Engineering — OpenAI Symphony case study |
| Research | Cthulhu 🦑 + Dagon 🌊 | ✅ Done | Platform + toolchain docs pushed to GitHub |
| Script | Nyarlathotep ✍️ | ✅ Done | 12 scenes, 3:30 total, 525 words |
| Storyboard | Ithaqua 🌬️ | 🔄 In Progress | Scenes 01-05 rendered · Scenes 06-12 code complete |
| Assets | Ithaqua 🌬️ | 🔄 In Progress | Sample clip: `demo-clip.mp4` |
| Animation | Ithaqua 🌬️ | 🔄 In Progress | Preview: `out/HarnessEngineering.mp4` |
| Audio | Dagon 🌊 | ✅ Done | 12 files, 210.7s, `src/assets/audio/part_01–12.mp3` |
| Composite | Ithaqua 🌬️ | ⏳ Pending | — |
| QA Review | Hastur 👑 | 🔄 In Progress | Subagent spawned, bootstrapping |
| Render | Ithaqua 🌬️ | ⏳ Pending | — |
| Publish | Cthulhu 🦑 | ⏳ Pending | — |

---

## Reference: 3-Level AI Video Creation Framework

*From: "Claude Just Changed Content Creation Forever!" by Samin Yasar (YouTube)*

### Level 1 — Setup & First Video (0:00–5:16)
Install Claude Desktop → Add Remotion skill → Create first AI video via prompting → Troubleshooting

### Level 2 — Skill Stacking (8:00–12:03)
Stack multiple skills → Build Claude.md "brain" for persistent context → Integrate ElevenLabs (voice), Wavespeed (video gen), Image Gen

### Level 3 — Chaining Videos (13:57–15:16)
Chain multiple generated videos → Stitch for long-form content

---

## Agent Task Templates

Each agent: **Trigger → Input → Exact Steps → Artifact → Exit Criteria**. No ambiguity.

---

### 🔬 Research (Dagon 🌊 + Cthulhu 🦑)

**Dagon — Toolchain Research**
- Trigger: Pipeline upgrade, new tool needed, or Phase 1 start
- Input: `video-toolchain.md`, current project audit
- Steps:
  1. Audit Remotion project — `package.json`, installed packages, scene structure
  2. Audit current audio pipeline — TTS usage, file naming, concatenation
  3. Research new tools — compare against Tier 1/2/3 recommendations
  4. Update `video-toolchain.md` with findings
- Artifact: Updated `video-toolchain.md` (Toolchain section)
- Exit: All tools ranked Tier 1/2/3 with reasoning, known limitations documented

**Cthulhu — Platform Research**
- Trigger: New video topic or platform strategy refresh
- Input: Topic brief, competitor videos, audience data
- Steps:
  1. Analyze YouTube algorithm preferences — retention, CTR, upload cadence
  2. Analyze Bilibili audience patterns — 教程/手摸手 format, danmu
  3. Study competitor formats — thumbnail style, title formula, video structure
  4. Recommend publishing schedule + SEO metadata template
- Artifact: Platform section in `video-toolchain.md`
- Exit: Publishing calendar, thumbnail specs, title formula, SEO template

---

### ✍️ Script (Nyarlathotep ✍️)

**Trigger:** New topic approved by winoooops
**Input:** Topic doc + `video-toolchain.md` + winoooops voice/style reference

**Steps:**
1. Read topic doc twice — extract core thesis, audience, emotional arc, key takeaways
2. Read `video-toolchain.md` — Remotion capabilities, duration constraints, animation options
3. Write scene breakdown:
   - Table: `[scene # | name | start frame | duration | audio file | visual notes]`
   - ~150 words/minute spoken pace
   - Hook in scene 1 (first 30 seconds)
   - Concrete example or analogy in scenes 2-8
   - Memorable takeaway in final scene
4. Write narration per scene — conversational, not academic; short sentences for impact
5. Add visual/animation notes per scene — what Remotion should render, transition style
6. Self-check: total duration within ±5s of target, all scenes timed, word count verified
7. Post to Discord, tag Ithaqua with script complete

**Artifact:** `scripts/{topic}/script.md`
- Scene timing table
- Full narration text per scene
- Visual/animation notes per scene
- Total word count + estimated duration

**Exit criteria:** All scenes timed, word count fits target ±5s, visual notes actionable without clarification.

---

### 🎨 Animation / Production (Ithaqua 🌬️)

**Trigger:** Nyarlathotep's script complete + tagged
**Input:** `script.md` + `video-toolchain.md` + asset brief

**Steps:**
1. Read script — understand scene structure, timing, animation notes
2. Read toolchain — know available packages, transitions, effects
3. Build composition — `Root.tsx` with `<Sequence>` components per scene, audio wired per scene
4. Build each scene `.tsx` — match visual/animation notes from script
5. **Preview render first 5 scenes** — verify timing before full render
6. Fix timing errors — adjust `<div>` durations, `from`, `to` props
7. Full render — all scenes → `out/{project}.mp4`
8. Verify output — `ffprobe` duration, resolution, codec check

**Artifact:** `src/scenes/Scene_{NN}_{name}.tsx` + `out/{project}.mp4`

**Exit criteria:** Preview renders clean (no TS errors, timing correct), full render completes, `ffprobe` confirms duration ±0.1s of target.

---

### 🔊 Audio / TTS (Dagon 🌊)

**Trigger:** Nyarlathotep's scene timing table received
**Input:** Scene timing table (scene # | duration | narration text)

**Steps:**
1. Generate TTS per scene — OpenAI `tts-1` with `onyx` voice (English) or MiniMax (Chinese)
2. Normalize each file — trim/pad to exact scene duration ±0.1s
3. Name files: `part_{NN}.mp3` matching scene numbers
4. Verify: total audio = total video duration ±0.1s, no cutoff, no >3s silence
5. Post to Discord, tag Ithaqua with audio files ready

**Artifact:** `src/assets/audio/part_01.mp3`–`part_{NN}.mp3`

**Exit criteria:** All files within ±0.1s of scene duration, total matches video total.

---

### 📋 Storyboard (Ithaqua 🌬️) — Optional per-scene step between Script and Animation

**Trigger:** Script received
**Input:** Script scene breakdown + visual notes

**Steps:**
1. Map each scene to a storyboard card: `[scene #] [name] | [visual description] | [keyframes]`
2. Identify B-roll / clip needs — tag which scenes need external footage
3. Confirm asset list with winoooops if new clips needed
4. Hand off storyboard to Assets stage

**Artifact:** `scripts/{topic}/storyboard.md`

**Exit criteria:** Every scene has a visual description, asset needs identified.

---

### 🔍 QA Review (Hastur 👑)

**Trigger:** Full composite render with audio ready
**Input:** `.mp4` path from Ithaqua + script + storyboard

**Steps:**
1. **Automated checks:**
   - `ffprobe` duration = script target ±0.5s
   - Codec = H.264, resolution ≥ 1920×1080
   - `ffmpeg -i` no errors in output log
2. **Frame inspection** — extract key frames at scene boundaries:
   - Check each scene: text legibility, overflow, z-order, animation completeness
   - First 3 frames = content (not black/blank)
   - Last 3 frames = clean exit (not frozen mid-animation)
3. **Audio spot-checks:**
   - `volumedetect` at scene 1 start — should be audible (−20 to −10 LUFS)
   - `volumedetect` at scene transitions — no abrupt jumps
   - No >2s silence in any scene
4. **Subtitle sync** — if subtitles burned in: text matches narration verbatim
5. **Write QA report:**
   - **APPROVED** — all checks pass
   - **REJECTED** — [N] BLOCKER defects found, Ithaqua must fix
   - **CONDITIONAL** — [N] WARN/INFO, winoooops can waive with note

**Report format:**
```
## Defect #[N]
**Scene:** [scene name or timecode]
**Category:** [sync | text | animation | audio | compositing | legibility]
**Severity:** [BLOCKER | WARN | INFO]
**Description:** [what is wrong]
**Expected:** [what it should be]
**Recommendation:** [how to fix]
```

**Artifact:** `qa-reports/YYYY-MM-DD-{project}-v{N}.md`

**Exit criteria:** Automated checks PASS + frame inspection PASS → APPROVED. Any BLOCKER → REJECTED, tag Ithaqua.

---

### 🚀 Publish (Cthulhu 🦑)

**Trigger:** Hastur's APPROVED verdict received
**Input:** Final `.mp4` path + thumbnail from Ithaqua

**Steps:**
1. Generate thumbnail — Remotion `<Thumbnail>` composition or static, 1280×720
2. Write SEO metadata:
   - Title: `[Hook statement] — [explanation]` (< 60 chars)
   - Description: [topic summary + key takeaway + timestamp chapters]
   - Tags: [topic keywords + "AI" + "tutorial"]
   - Chapters: [scene names with timestamps]
3. Upload YouTube — set visibility, attach thumbnail, add chapters
4. Upload Bilibili (within 24h) — Chinese metadata, same video
5. Post Discord `#video-releases` — link + thumbnail preview
6. Post Twitter/X — thread with key insight + video link

**Artifact:** Live on YouTube + Bilibili, social posts sent

**Exit criteria:** Both platforms live, thumbnail attached, chapters set, social posts published.

---

## Agent Standup Log

### 2026-03-23

| Agent | What done | Blockers | Next |
|-------|-----------|----------|------|
| Cthulhu 🦑 | Platform research, Kanban + task templates updated from video research | — | Awaiting Hastur QA verdict → Publish |
| Dagon 🌊 | TTS pipeline, toolchain doc, Kanban setup | — | Standby |
| Ithaqua 🌬️ | 12 scenes built, 01-05 rendered, 06-12 code done | — | Full composite + render |
| Hastur 👑 | Subagent spawned, bootstrapping | — | QA review of preview |
| Nyarlathotep ✍️ | ✅ Script complete | — | Next topic |

---

## Communication Protocol

1. **Blocker rule:** @mention the agent who can unblock you in this channel
2. **Daily standup:** Update "Agent Standup Log" when significant progress made
3. **Stage transition:** Update Status column + notify next stage owner
4. **Escalation:** Blocker unresolved in 1hr → ping winoooops

---

*Last updated: 2026-03-23 19:11 HKT*
