# Video Pipeline Kanban — "What Is Harness Engineering"

> Owned by: **Hastur** 👑 | Stakeholder: **winoooops**
> Last updated: 2026-03-23

---

## Phases & Status Legend

| Status | Meaning |
|--------|---------|
| 🔴 Not Started | Not yet begun |
| 🟡 In Progress | Being worked on |
| 🟢 Done | Complete, awaiting review |
| ✅ Approved | Reviewed and accepted |
| 🚫 Blocked | Waiting on dependency or help |

---

## 🔬 Phase 1 — Research

*Owner: Dagon 🌊 + Cthulhu 🦑 | Status: 🟢 Done*

| Task | Owner | Status | Notes |
|------|-------|--------|-------|
| Platform research (YouTube/Bilibili) | Cthulhu 🦑 | ✅ Done | In `video-toolchain.md` |
| Toolchain research (TTS, Remotion, ffmpeg) | Dagon 🌊 | ✅ Done | 754-line doc, all sections covered |
| Remotion audit (current packages + unused features) | Ithaqua 🌬️ | 🟢 Done | `video-toolchain.md` — full audit written, 21 scenes, 7 unused packages identified, PoC demo scoped |
| Research doc finalization | Dagon 🌊 | ✅ Done | Sub-agent contributed depth, doc complete |

---

## 🎬 Phase 2 — Pre-Production

*Owner: winoooops (concept) + Nyarlathotep (script, Phase 5) | Status: 🔴 Not Started*

| Task | Owner | Status | Notes |
|------|-------|--------|-------|
| Concept brief from winoooops | winoooops | 🔴 Not Started | What is the video trying to convey? |
| Scene breakdown / storyboard | Nyarlathotep ✍️ | 🔴 Not Started | Phase 5 spawn |
| Asset list (clips, graphics, audio needed) | Ithaqua 🌬️ | 🔴 Not Started | |
| TTS voice selection (MiniMax + OpenAI voices) | Dagon 🌊 | 🔴 Not Started | After Phase 3 packages installed |

---

## 🛠️ Phase 3 — Package Setup

*Owner: Ithaqua 🌬️ | Status: 🟡 In Progress*

| Task | Owner | Status | Notes |
|------|-------|--------|-------|
| Install `@remotion/media` (video embedding) | Ithaqua 🌬️ | 🟢 Done | Installed v4.0.438 — exports `Video`, `experimental_Video`, `Audio` |
| Install `@remotion/transitions` (scene transitions) | Ithaqua 🌬️ | 🟢 Done | Installed v4.0.438 — exports `TransitionSeries`, `springTiming`, `linearTiming` |
| Install `fluent-ffmpeg` (clip pre-processing) | Ithaqua 🌬️ | 🔴 Not Started | CLI ffmpeg available — defer until Phase 6 if no clip prep needed |
| Install `@remotion/three` (3D, for title cards) | Ithaqua 🌬️ | 🔴 Not Started | Nice-to-have — defer to Phase 6 unless script calls for 3D |
| Configure TTS pipeline (MiniMax + OpenAI) | Dagon 🌊 | 🟢 Done | OpenAI TTS key confirmed (HTTP 200), provider added to config |
| Verify all packages build without errors | Ithaqua 🌬️ | 🟡 In Progress | Scene22 demo ready — sample clip now available at `src/assets/videos/sample-clip.mp4` |
| Video embedding PoC scene | Ithaqua 🌬️ | 🟢 Done | `src/scenes/Scene22_VideoEmbedDemo.tsx` — placeholder version ready, full version requires clip |

---

## 🧙 Phase 4 — QA Agent Spawn (Hastur)

*Owner: Ithaqua 🌬️ (builds) + Dagon 🌊 (reviews) | Status: 🟡 In Progress*

| Task | Owner | Status | Notes |
|------|-------|--------|-------|
| Write Hastur SOUL.md | Ithaqua 🌬️ | 🟢 Done | ~/agents/hastur/SOUL.md — King in Yellow persona, verdict-based reporting |
| Write Hastur AGENTS.md (role + checklist) | Ithaqua 🌬️ | 🟢 Done | ~/agents/hastur/AGENTS.md — full QA checklist (audio sync, visuals, compositing, subs, technical) |
| Write Hastur HEARTBEAT.md | Ithaqua 🌬️ | 🟢 Done | ~/agents/hastur/HEARTBEAT.md — minimal, event-driven triggers |
| Dagon reviews Hastur spec | Dagon 🌊 | ✅ Done | APPROVED — spawn path file created at ~/agents/shared/project-paths.md |
| Hastur goes live | Ithaqua 🌬️ | 🟡 In Progress | Subagent spawned — bootstrapping now |
| Kanban ownership transferred to Hastur | Hastur 👑 | 🔴 Not Started | After spawn confirmed |
| GitHub video-pipeline repo | Ithaqua 🌬️ | 🟢 Done | `github.com/winoooops/video-pipeline` created — push kanban/documents when ready |

---

## ✍️ Phase 5 — Script (Nyarlathotep)

*Owner: Cthulhu 🦑 (spawns) + Nyarlathotep ✍️ (writes) | Status: 🔴 Not Started*

| Task | Owner | Status | Notes |
|------|-------|--------|-------|
| Spawn Nyarlathotep | Cthulhu 🦑 | 🔴 Not Started | After Phase 1 doc is final |
| Nyarlathotep reads video-toolchain.md | Nyarlathotep ✍️ | 🔴 Not Started | Must understand constraints |
| Write first draft script | Nyarlathotep ✍️ | 🔴 Not Started | winoooops reviews/approves |
| Scene breakdown + timing | Nyarlathotep ✍️ | 🔴 Not Started | Hands off to Ithaqua |

---

## 🎨 Phase 6 — Animation / Production

*Owner: Ithaqua 🌬️ | Status: 🔴 Not Started*

| Task | Owner | Status | Notes |
|------|-------|--------|-------|
| Build Remotion composition structure | Ithaqua 🌬️ | 🔴 Not Started | Based on Nyarlathotep's breakdown |
| Import video clips (`@remotion/media`) | Ithaqua 🌬️ | 🔴 Not Started | |
| Build animated lower-thirds + overlays | Ithaqua 🌬️ | 🔴 Not Started | |
| Add 3D title cards (`@remotion/three`) | Ithaqua 🌬️ | 🔴 Not Started | |
| Scene transitions (`@remotion/transitions`) | Ithaqua 🌬️ | 🔴 Not Started | |
| Composite audio tracks (TTS + music) | Dagon 🌊 | 🔴 Not Started | After TTS pipeline ready |
| Render preview → post to Kanban | Ithaqua 🌬️ | 🔴 Not Started | |

---

## 🔍 Phase 7 — QA Review

*Owner: Hastur 👑 | Stakeholder: winoooops | Status: 🔴 Not Started*

| Task | Owner | Status | Notes |
|------|-------|--------|-------|
| Hastur reviews rendered output | Hastur 👑 | 🔴 Not Started | |
| Scene duration vs audio sync check | Hastur 👑 | 🔴 Not Started | |
| Text overflow / legibility check | Hastur 👑 | 🔴 Not Started | |
| Transition smoothness check | Hastur 👑 | 🔴 Not Started | |
| QA report → winoooops | Hastur 👑 | 🔴 Not Started | Only if issues found |
| winoooops approves → Publish | winoooops | 🔴 Not Started | |

---

## 🚀 Phase 8 — Render & Publish

*Owner: Cthulhu 🦑 | Status: 🔴 Not Started*

| Task | Owner | Status | Notes |
|------|-------|--------|-------|
| Final render (Remotion Studio or CLI) | Ithaqua 🌬️ | 🔴 Not Started | |
| Thumbnail generation | Cthulhu 🦑 | 🔴 Not Started | |
| YouTube upload + metadata + SEO | Cthulhu 🦑 | 🔴 Not Started | |
| Bilibili upload (within 24h) | Cthulhu 🦑 | 🔴 Not Started | |
| Twitter thread (same day) | Cthulhu 🦑 | 🔴 Not Started | |
| Post in Discord #video-releases | Cthulhu 🦑 | 🔴 Not Started | |

---

## GitHub Repository

**Repo:** `github.com/winoooops/video-pipeline` (fresh, empty — created by Ithaqua)

Push plan:
1. First push: Kanban + toolchain doc (Phase 1 deliverables)
2. Second push: Hastur agent configs + memory
3. Ongoing: pipeline scripts, QA reports, render outputs

## Communication Protocol

- **Blockers:** Post in this thread, tag the responsible agent
- **Updates:** Update this Kanban + post brief in thread
- **Escalation:** If blocked >1hr, tag winoooops directly
- **Check-ins:** Every team member posts status here at least once per phase

---

*Last updated: 2026-03-23 13:50 GMT+8 — Ithaqua 🌬️*
