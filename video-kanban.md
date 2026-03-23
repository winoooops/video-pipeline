# Video Pipeline Kanban — "What Is Harness Engineering"

> Last updated: 2026-03-23 14:28 HKT
> Owner: **Hastur** 👑 (when spawned) | Stakeholder: **winoooops**
> Repo: `github.com/winoooops/video-pipeline`
> Communication: @mention blocker owner in this channel

---

## Pipeline Overview

```
[Concept] → [Script] → [Storyboard] → [Assets] → [Animation] → [Audio] → [Composite] → [QA Review] → [Render] → [Publish]
```

**winoooops** = stakeholder at `QA Review` (approve/reject) and `Publish` (final go/no-go)
**Hastur** = board owner once spawned

---

## Current Video: Harness Engineering

> Topic: OpenAI Symphony team's Harness Engineering approach — three engineers, five months, a million lines of code via Codex
> Article: `F:\Personal\obsidian-vault\winoooops&Claw\articles\What Is Harness Engineering.md`

| Stage | Owner | Status | Notes |
|-------|-------|--------|-------|
| Concept | winoooops | ✅ Done | Harness Engineering — OpenAI Symphony case study |
| Research | Cthulhu 🦑 + Dagon 🌊 | ✅ Done | Platform + toolchain docs pushed to GitHub |
| Script | Nyarlathotep ✍️ | ⏳ Pending | Waiting for Phase 2 (Hastur spawn) |
| Storyboard | Ithaqua 🌬️ | ⏳ Pending | — |
| Assets | Ithaqua 🌬️ | 🔄 In Progress | Sample clip ready: `demo-clip.mp4` (1920×1080 H.264, 5.7s, 2.8MB) |
| Animation | Ithaqua 🌬️ | 🔄 In Progress | `Scene22_VideoEmbedDemo.tsx` — real clip + animated overlay demo ready |
| Audio | Dagon 🌊 | ⏳ Pending | OpenAI TTS key received, auth test in progress |
| Composite | Ithaqua 🌬️ | ⏳ Pending | — |
| QA Review | Hastur 👑 | 🔄 In Progress | Subagent spawned, bootstrapping |
| Render | Ithaqua 🌬️ | ⏳ Pending | — |
| Publish | Cthulhu 🦑 | ⏳ Pending | — |

---

## Agent Standup Log

### 2026-03-23 — Sprint Day 1

| Agent | What done | Blockers | Next |
|-------|-----------|----------|------|
| Cthulhu 🦑 | Platform research (YouTube/Bilibili), pipeline doc, pushed to GitHub | — | Standby for Phase 2 |
| Dagon 🌊 | Toolchain section (TTS, Remotion, ffmpeg), Kanban setup, OpenAI key received | — | TTS auth test → Phase 3 spec |
| Ithaqua 🌬️ | Sample clip found, video embedding demo ready, GitHub repo created, Hastur subagent spawned | — | Wire demo into composition, review Hastur spec |
| Hastur 👑 | Subagent spawned, bootstrapping | — | Phase 2: finalize spawn spec |
| Nyarlathotep ✍️ | Not spawned | Waiting for Hastur + research doc | Phase 5 |

---

## Communication Protocol

1. **Blocker rule:** If you hit a blocker, @mention the agent who can unblock you **in this channel**
2. **Daily standup:** Each agent updates their row in "Agent Standup Log" when significant progress is made
3. **Stage transition:** When an agent completes a stage, they update Status and notify the next stage owner
4. **Escalation:** If a blocker cannot be resolved in 1hr, ping winoooops directly

**Agent mentions:**
- Cthulhu 🦑 → `@cthulhu`
- Ithaqua 🌬️ → `@ithaqua`
- Dagon 🌊 → `@dagon`
- Hastur 👑 → `@hastur`
- Nyarlathotep ✍️ → `@nyarlathotep`
- winoooops → `@winoooops`

---

## Phase Progress

### ✅ Phase 1 — Research (1 day sprint) — COMPLETE
- [x] Platform research → `video-toolchain.md` ✅ (Cthulhu)
- [x] Toolchain research → `video-toolchain.md` ✅ (Dagon)
- [x] Remotion audit → `video-toolchain.md` ✅ (Ithaqua)
- [x] GitHub repo created → `github.com/winoooops/video-pipeline` ✅
- [x] Docs pushed to GitHub ✅
- [x] OpenAI TTS key received ✅
- [x] Sample clip ready (1K/2K/4K source files — winoooops will provide) ✅

### 🔄 Phase 2 — QA Agent (Hastur) — IN PROGRESS
- [ ] Subagent spawned ✅ (Ithaqua)
- [ ] SOUL.md + AGENTS.md written ⏳
- [ ] Review + approval ⏳ (Dagon)
- [ ] Read access to Remotion project + toolchain doc configured ⏳

### ⏳ Phase 3 — TTS/Audio Pipeline
- [ ] OpenAI TTS auth test ⏳ (Dagon)
- [ ] MiniMax vs OpenAI comparison finalized ⏳
- [ ] Audio sync pipeline into Remotion ⏳

### ⏳ Phase 4 — Kanban Board (Hastur ownership)

### ⏳ Phase 5 — Script Agent (Nyarlathotep)
- [ ] Spawn after Phase 2 complete

---

## OpenAI TTS API Key

- **Status:** Received from winoooops, forwarded to Dagon
- **Key:** `[STORED ELSEWHERE — DO NOT COMMIT]`
- **Owner:** Dagon 🌊
- **Purpose:** TTS pipeline comparison (MiniMax vs OpenAI)

> ⚠️ **Never commit API keys to this repo.** Use environment variables or a credentials file outside the repo.

---

## Video Source Files (Assets)

winoooops: Will provide 1K/2K/4K video clips when available. Current demo uses `demo-clip.mp4` (1920×1080 H.264, 5.7s, 2.8MB) as placeholder.

---

*Last updated: 2026-03-23 14:28 HKT*
