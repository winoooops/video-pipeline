# Voiceover Script — Skill & Skill Testing (180s)
# Pacing: ~150 words per minute = ~450 words total
# Each scene has its timecode and target word count

## Scene 1: Hook (0:00–0:09) ~22 words
Most people's Claude Code Skills actually make Claude dumber. Not smarter — dumber. Here's how to fix that.

## Scene 2: Wrong Approach (0:09–0:18) ~25 words
The first instinct is always the same: add more MCP tools. More access, more APIs. But that only expands what Claude can do — not what it should do.

## Scene 3: What Is a Skill (0:18–0:26) ~22 words
A Skill is just a folder. SKILL.md is its core — everything else is a supporting file loaded on demand. Tools expand capabilities. Skills teach judgment.

## Scene 4: Folder Layout (0:26–0:34) ~20 words
Here's what a Skill folder looks like. SKILL.md is required. Scripts, references, assets — all optional, loaded when needed.

## Scene 5: Progressive Disclosure (0:34–0:43) ~25 words
Skills use three-level loading. Level one: frontmatter — always in context. Level two: the full SKILL.md body — loaded when the skill applies. Level three: supporting files — on demand only.

## Scene 6: Context Budget (0:43–0:53) ~30 words
Here's the real problem. Claude has 200K tokens of context, but a huge chunk is eaten before you type anything. Five MCP servers with twenty tools each? That's twenty-five thousand tokens gone. Silent budget killer.

## Scene 7: Four Primitives (0:53–1:01) ~22 words
Four primitives to keep straight. MCP defines what Claude can do. Skills define when and how. Subagents get a clean slate. Hooks enforce behavior deterministically.

## Scene 8: Tip 1 (1:01–1:08) ~18 words
Best practice one: keep your description to about nine tokens. It's a trigger signal, not a brochure.

## Scene 9: Tip 2 (1:08–1:15) ~18 words
Tip two: lead with use cases. The first section should answer one question — when would I reach for this?

## Scene 10: Tip 3 (1:15–1:22) ~18 words
Tip three: be explicit about inputs and outputs. What Claude receives, what it does, where results go.

## Scene 11: Tip 4 (1:22–1:29) ~18 words
Tip four: include troubleshooting. Skills fail in predictable ways. A common issues section saves the back-and-forth.

## Scene 12: evals.json (1:29–1:39) ~25 words
Now let's test. Write an evals.json — each entry is a realistic user prompt plus expected output. Place it in your skill's evals directory. These are your test cases.

## Scene 13: Eval Runner (1:39–1:49) ~28 words
The eval runner reads your evals.json, spawns fresh subagents for each scenario, runs every test, and collects runtime, tokens, and success rate. Output goes to results.json for comparison.

## Scene 14: Three Scenarios (1:49–1:57) ~22 words
We tested three scenarios. No skill — pure baseline. Full skill — three hundred forty-six lines, everything inline. And slim skill — seventy-eight lines plus references.

## Scene 15: Results Table (1:57–2:09) ~28 words
Here are the real results. We removed tasks where all three failed. On the four comparable tasks, slim skill was fastest overall at ten point five seconds total. Full skill and no skill were nearly tied.

## Scene 16: Analysis (2:09–2:19) ~25 words
What does the data tell us? The full skill knew the right handles. The no-skill agent wasted time exploring help. But the slim skill was fastest on most tasks. Progressive disclosure wins.

## Scene 17: Design Matters (2:19–2:27) ~22 words
The takeaway: skill design matters more than skill existence. Three hundred forty-six lines in context doesn't mean better. Seventy-eight lines plus progressive disclosure means faster, cheaper, smarter.

## Scene 18: TL;DR (2:27–2:35) ~20 words
Skills are methodology, not capability. Keep SKILL.md lean. MCP eats tokens silently. Test with evals. Progressive disclosure wins.

## Scene 19: Outro (2:35–2:44) ~15 words
Thanks for watching. Follow us on X at LabFromAbyss and on Bilibili. See you next time.

---
Total: ~447 words / 180 seconds ≈ 149 WPM ✓
