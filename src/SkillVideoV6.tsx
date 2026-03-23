import { AbsoluteFill, Series, useCurrentFrame, interpolate } from "remotion";
import { C, FONT } from "./theme-v6";
import { FontLoader } from "./FontLoader";

// ── animation: fade + translateY(20), nothing else ──
const useFade = (delay = 0, dur = 18) => {
  const f = useCurrentFrame();
  return {
    opacity: interpolate(f, [delay, delay + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    transform: `translateY(${interpolate(f, [delay, delay + dur], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
  };
};

const useType = (text: string, start = 0, speed = 2) => {
  const f = useCurrentFrame();
  const n = Math.min(Math.floor((f - start) / speed), text.length);
  return f >= start ? text.slice(0, Math.max(0, n)) : "";
};

// ── code block: flat, no chrome ──
const Code: React.FC<{ lines: string[]; delay?: number }> = ({ lines, delay = 0 }) => {
  const s = useFade(delay, 18);
  return (
    <div style={{ ...s, backgroundColor: C.codeBg, padding: "28px 32px", borderRadius: 4 }}>
      {lines.map((l, i) => (
        <div key={i} style={{ fontSize: 23, lineHeight: 1.8, color: l.startsWith("#") || l.startsWith("//") ? C.codeDim : C.codeText }}>{l}</div>
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// 1. HOOK
// ═══════════════════════════════════════════════════════════════
const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const t1 = useFade(10, 22);
  const t2 = useFade(35, 22);
  const sub = useType("here's how to improve it", 85, 2);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 180px" }}>
      <div style={{ ...t1, fontSize: 64, fontWeight: 400, color: C.textSec, letterSpacing: -2 }}>
        Most people's Skills actually make
      </div>
      <div style={{ ...t2, fontSize: 96, fontWeight: 700, color: C.text, letterSpacing: -3, marginTop: 8 }}>
        Claude <span style={{ color: C.accent }}>dumber</span>
      </div>
      <div style={{ marginTop: 48, fontSize: 36, color: C.textTer, height: 44 }}>
        {sub}<span style={{ opacity: f % 30 < 15 ? 1 : 0, color: C.accent }}>|</span>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. WRONG APPROACH
// ═══════════════════════════════════════════════════════════════
const Wrong: React.FC = () => {
  const f = useCurrentFrame();
  const h = useFade(0, 18);
  const l = useFade(25, 18);
  const r = useFade(65, 18);
  const arr = interpolate(f, [50, 65], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 180px" }}>
      <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, marginBottom: 60, letterSpacing: -2 }}>
        The first instinct is wrong.
      </div>
      <div style={{ display: "flex", gap: 80, alignItems: "flex-start" }}>
        <div style={{ ...l, flex: 1 }}>
          <div style={{ fontSize: 28, color: C.textTer, marginBottom: 12 }}>What most people do</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: C.text, marginBottom: 16 }}>Add more MCP tools</div>
          <div style={{ fontSize: 24, color: C.textSec, lineHeight: 1.6 }}>
            Expands what Claude can do.{"\n"}Not what it should do.
          </div>
        </div>
        <div style={{ fontSize: 40, color: C.textTer, opacity: arr, alignSelf: "center" }}>→</div>
        <div style={{ ...r, flex: 1 }}>
          <div style={{ fontSize: 28, color: C.accent, marginBottom: 12 }}>What actually works</div>
          <div style={{ fontSize: 32, fontWeight: 700, color: C.text, marginBottom: 16 }}>Write a Skill</div>
          <div style={{ fontSize: 24, color: C.textSec, lineHeight: 1.6 }}>
            Teaches Claude when to act{"\n"}and which approach to take.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. WHAT IS A SKILL
// ═══════════════════════════════════════════════════════════════
const WhatIs: React.FC = () => {
  const h = useFade(0, 20);
  const p = useFade(25, 18);
  const q = useFade(55, 18);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 180px" }}>
      <div style={{ ...h, fontSize: 72, fontWeight: 700, color: C.text, letterSpacing: -3, marginBottom: 32 }}>
        A Skill is a folder.
      </div>
      <div style={{ ...p, fontSize: 32, color: C.textSec, lineHeight: 1.6, marginBottom: 48, maxWidth: 900 }}>
        <span style={{ color: C.accent, fontWeight: 700 }}>SKILL.md</span> is its core. Everything else — scripts, references, assets — is a supporting file loaded on demand.
      </div>
      <div style={{ ...q, fontSize: 24, color: C.textTer, borderLeft: `2px solid ${C.accent}`, paddingLeft: 24, maxWidth: 700 }}>
        Tools expand capabilities. Skills teach judgment.
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. FOLDER
// ═══════════════════════════════════════════════════════════════
const Folder: React.FC = () => {
  const h = useFade(0, 15);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", alignItems: "center", padding: "0 140px", gap: 80 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: -2, marginBottom: 20 }}>Structure</div>
        <div style={{ ...useFade(15, 15), fontSize: 24, color: C.textSec, lineHeight: 1.6 }}>
          SKILL.md is required.{"\n"}Everything else is optional.
        </div>
      </div>
      <div style={{ flex: 1.1 }}>
        <Code delay={20} lines={[
          ".claude/skills/",
          "└── your-skill-name/",
          "    ├── SKILL.md",
          "    ├── scripts/",
          "    │   └── process_data.py",
          "    ├── references/",
          "    │   └── api-guide.md",
          "    └── assets/",
          "        └── template.md",
        ]} />
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. PROGRESSIVE DISCLOSURE
// ═══════════════════════════════════════════════════════════════
const Disclosure: React.FC = () => {
  const h = useFade(0, 18);
  const items = [
    { label: "Level 1 — Frontmatter", desc: "Name, description, tags. Always in context.", d: 30 },
    { label: "Level 2 — SKILL.md body", desc: "Full instructions. Loaded when the skill applies.", d: 55 },
    { label: "Level 3 — Supporting files", desc: "Deep docs, scripts. Loaded on demand.", d: 80 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 180px" }}>
      <div style={{ ...h, fontSize: 56, fontWeight: 700, color: C.text, letterSpacing: -2, marginBottom: 16 }}>Progressive disclosure</div>
      <div style={{ ...useFade(12, 15), fontSize: 24, color: C.textTer, marginBottom: 48 }}>Only the right information enters context at the right time.</div>
      {items.map((it, i) => {
        const s = useFade(it.d, 15);
        return (
          <div key={i} style={{ ...s, marginBottom: 32, borderLeft: i === 0 ? `2px solid ${C.accent}` : `2px solid ${C.border}`, paddingLeft: 28 }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 6 }}>{it.label}</div>
            <div style={{ fontSize: 22, color: C.textSec }}>{it.desc}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. CONTEXT BUDGET
// ═══════════════════════════════════════════════════════════════
const Context: React.FC = () => {
  const f = useCurrentFrame();
  const h = useFade(0, 18);

  const Bar: React.FC<{ label: string; tokens: string; pct: number; delay: number; warn?: boolean }> = ({ label, tokens, pct, delay, warn }) => {
    const s = useFade(delay, 12);
    const w = interpolate(f, [delay + 8, delay + 28], [0, pct], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <div style={{ ...s, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 21 }}>
          <span style={{ color: warn ? C.accent : C.text }}>{label}</span>
          <span style={{ color: C.textTer }}>{tokens}</span>
        </div>
        <div style={{ height: 8, backgroundColor: C.border, borderRadius: 2 }}>
          <div style={{ width: `${w}%`, height: "100%", backgroundColor: warn ? C.accent : C.textTer, borderRadius: 2 }} />
        </div>
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 140px" }}>
      <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: -2, marginBottom: 8 }}>Context is signal-to-noise</div>
      <div style={{ ...useFade(10, 15), fontSize: 22, color: C.textTer, marginBottom: 40 }}>200K total. Here's how it's spent.</div>
      <div style={{ display: "flex", gap: 60 }}>
        <div style={{ flex: 1 }}>
          <div style={{ ...useFade(18, 12), fontSize: 20, color: C.textSec, fontWeight: 700, marginBottom: 18 }}>Fixed overhead</div>
          <Bar label="System instructions" tokens="~2K" pct={10} delay={28} />
          <Bar label="Skill descriptors" tokens="~1-5K" pct={18} delay={40} />
          <Bar label="MCP tool definitions" tokens="~10-20K" pct={65} delay={52} warn />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ ...useFade(64, 12), fontSize: 20, color: C.textSec, fontWeight: 700, marginBottom: 18 }}>Dynamic</div>
          <Bar label="Conversation" tokens="" pct={90} delay={74} />
          <Bar label="File contents" tokens="" pct={70} delay={86} />
          <Bar label="Tool results" tokens="" pct={50} delay={98} />
        </div>
      </div>
      <div style={{ ...useFade(120, 18), marginTop: 32, fontSize: 24, color: C.textSec }}>
        5 MCP servers × 20 tools = <span style={{ color: C.accent, fontWeight: 700 }}>~25,000 tokens</span> before you type.
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. SKILLS VS REST
// ═══════════════════════════════════════════════════════════════
const Vs: React.FC = () => {
  const h = useFade(0, 18);
  const items = [
    { t: "MCP", r: "What Claude can do", d: 25 },
    { t: "Skills", r: "When to act, which approach", d: 45, accent: true },
    { t: "Subagents", r: "Anything needing a clean slate", d: 65 },
    { t: "Hooks", r: "Deterministic, no context cost", d: 85 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 180px" }}>
      <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: -2, marginBottom: 48 }}>Four primitives</div>
      {items.map((it, i) => {
        const s = useFade(it.d, 15);
        return (
          <div key={i} style={{ ...s, display: "flex", gap: 40, marginBottom: 28, alignItems: "baseline" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: it.accent ? C.accent : C.text, width: 160 }}>{it.t}</div>
            <div style={{ fontSize: 24, color: C.textSec }}>{it.r}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// TIPS 1-4
// ═══════════════════════════════════════════════════════════════
const Tip: React.FC<{ title: string; desc: string; code: string[] }> = ({ title, desc, code }) => {
  const h = useFade(0, 18);
  const d = useFade(20, 16);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 160px" }}>
      <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: -2, marginBottom: 16 }}>{title}</div>
      <div style={{ ...d, fontSize: 24, color: C.textSec, marginBottom: 36, lineHeight: 1.5, maxWidth: 900 }}>{desc}</div>
      <Code delay={45} lines={code} />
    </AbsoluteFill>
  );
};

const Tip1: React.FC = () => <Tip title="Minimal description" desc="~9 tokens. Clear trigger signal, not a brochure." code={[
  '# good',
  'description: "Use for PR reviews with focus on correctness."',
  '',
  '# bad — 45 tokens, reads like marketing copy',
  'description: "This comprehensive skill helps you review',
  '  code changes in Rust projects by checking for..."',
]} />;

const Tip2: React.FC = () => <Tip title="Lead with use cases" desc='First section answers one question: "When would I reach for this?"' code={[
  '## When to use',
  '- Review pull requests for correctness',
  '- Audit code for security patterns',
  '',
  '## When NOT to use',
  '- Simple formatting (use hooks instead)',
]} />;

const Tip3: React.FC = () => <Tip title="Explicit inputs and outputs" desc="For each procedure: what Claude receives, what it does, where results go." code={[
  'Input:   PR diff from GitHub MCP',
  'Process:',
  '  1. Check against security patterns',
  '  2. Flag unsafe blocks with line refs',
  '  3. Generate severity score',
  'Output:  Review comment posted to PR',
]} />;

const Tip4: React.FC = () => <Tip title="Include troubleshooting" desc="Skills fail in predictable ways. A common issues section saves the back-and-forth." code={[
  '## Common Issues',
  '',
  '### MCP Connection Failed',
  'If "Connection refused":',
  '  1. Verify MCP server is running',
  '  2. Confirm API key is valid',
  '  3. Reconnect via Settings → Extensions',
]} />;

// ═══════════════════════════════════════════════════════════════
// 12. TESTING
// ═══════════════════════════════════════════════════════════════
const Test: React.FC = () => {
  const h = useFade(0, 18);
  const d = useFade(15, 16);
  const flow = useFade(40, 20);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 180px" }}>
      <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: -2, marginBottom: 16 }}>Testing with evals</div>
      <div style={{ ...d, fontSize: 24, color: C.textSec, marginBottom: 48, lineHeight: 1.6 }}>
        Every test runs twice — with the skill and without.{"\n"}Fresh subagent each time. Compare runtime and tokens.
      </div>
      <div style={{ ...flow, fontSize: 28, color: C.textSec, lineHeight: 2 }}>
        <span style={{ color: C.text, fontWeight: 700 }}>evals.json</span>
        <span style={{ color: C.textTer }}>{" → "}</span>
        <span style={{ color: C.accent }}>with skill</span>
        <span style={{ color: C.textTer }}>{" / "}</span>
        <span style={{ color: C.textSec }}>without skill</span>
        <span style={{ color: C.textTer }}>{" → "}</span>
        <span style={{ color: C.text, fontWeight: 700 }}>results.json</span>
      </div>
      <div style={{ ...useFade(70, 18), marginTop: 40, fontSize: 22, color: C.textTer }}>
        Workspace goes outside the skill directory — eval output shouldn't enter context.
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// 13. RESULTS
// ═══════════════════════════════════════════════════════════════
const Results: React.FC = () => {
  const h = useFade(0, 18);
  const rows = [
    { task: "Search #AI tweets", w: "2m17s", wo: "11m", win: true, d: 30 },
    { task: "Anthropic profile", w: "17s", wo: "1m", win: true, d: 48 },
    { task: "Latest tweet", w: "1m44s", wo: "48s", win: false, d: 66 },
    { task: "Show bookmarks", w: "27s", wo: "20s", win: false, d: 84 },
    { task: "User timeline", w: "44s", wo: "26s", win: false, d: 102 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 160px" }}>
      <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: -2, marginBottom: 40 }}>
        Twitter Skill — <span style={{ color: C.accent }}>B+</span>
      </div>
      {/* header */}
      <div style={{ ...useFade(15, 12), display: "flex", padding: "0 0 12px", borderBottom: `1px solid ${C.border}`, fontSize: 18, color: C.textTer }}>
        <div style={{ flex: 2.5 }}>Task</div>
        <div style={{ flex: 1, textAlign: "right" }}>With skill</div>
        <div style={{ flex: 1, textAlign: "right" }}>Without</div>
      </div>
      {rows.map((r, i) => {
        const s = useFade(r.d, 12);
        return (
          <div key={i} style={{ ...s, display: "flex", padding: "14px 0", borderBottom: `1px solid ${C.border}`, alignItems: "baseline" }}>
            <div style={{ flex: 2.5, fontSize: 24, color: C.text }}>{r.task}</div>
            <div style={{ flex: 1, textAlign: "right", fontSize: 24, color: r.win ? C.accent : C.textTer, fontWeight: r.win ? 700 : 400 }}>{r.w}</div>
            <div style={{ flex: 1, textAlign: "right", fontSize: 24, color: !r.win ? C.accent : C.textTer, fontWeight: !r.win ? 700 : 400 }}>{r.wo}</div>
          </div>
        );
      })}
      <div style={{ ...useFade(130, 18), marginTop: 32, fontSize: 22, color: C.textSec }}>
        Skills help on complex tasks. Simple reads run better without the overhead.
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// 14. TAKEAWAY
// ═══════════════════════════════════════════════════════════════
const Takeaway: React.FC = () => {
  const h = useFade(0, 18);
  const items = [
    "Skills are methodology, not capability.",
    "Keep SKILL.md lean.",
    "MCP eats tokens silently.",
    "Test with evals.",
    "Make Claude better at specific things.",
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 180px" }}>
      <div style={{ ...h, fontSize: 56, fontWeight: 700, color: C.text, letterSpacing: -2, marginBottom: 48 }}>TL;DR</div>
      {items.map((it, i) => {
        const s = useFade(20 + i * 18, 15);
        return (
          <div key={i} style={{ ...s, fontSize: 28, color: i === 0 ? C.text : C.textSec, marginBottom: 20, lineHeight: 1.4 }}>
            {it}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// 15. OUTRO
// ═══════════════════════════════════════════════════════════════
const Outro: React.FC = () => {
  const h = useFade(0, 20);
  const x = useFade(40, 18);
  const b = useFade(65, 18);
  const cr = useFade(100, 18);

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 180px" }}>
      <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: -2, marginBottom: 56 }}>Thanks for watching.</div>
      <div style={{ ...x, marginBottom: 24 }}>
        <div style={{ fontSize: 20, color: C.textTer, marginBottom: 8 }}>Twitter / X</div>
        <div style={{ fontSize: 32, color: C.accent, fontWeight: 700 }}>@LabFromAbyss</div>
      </div>
      <div style={{ ...b, marginBottom: 24 }}>
        <div style={{ fontSize: 20, color: C.textTer, marginBottom: 8 }}>Bilibili</div>
        <div style={{ fontSize: 28, color: C.text }}>space.bilibili.com/3546375784499880</div>
      </div>
      <div style={{ ...cr, marginTop: 48, fontSize: 18, color: C.textTer }}>
        Built with Remotion · winoooops & Claw
      </div>
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const SkillVideoV6: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg }}>
    <FontLoader />
    <Series>
      <Series.Sequence durationInFrames={240}><Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={210}><Wrong /></Series.Sequence>
      <Series.Sequence durationInFrames={180}><WhatIs /></Series.Sequence>
      <Series.Sequence durationInFrames={210}><Folder /></Series.Sequence>
      <Series.Sequence durationInFrames={210}><Disclosure /></Series.Sequence>
      <Series.Sequence durationInFrames={210}><Context /></Series.Sequence>
      <Series.Sequence durationInFrames={180}><Vs /></Series.Sequence>
      <Series.Sequence durationInFrames={180}><Tip1 /></Series.Sequence>
      <Series.Sequence durationInFrames={180}><Tip2 /></Series.Sequence>
      <Series.Sequence durationInFrames={180}><Tip3 /></Series.Sequence>
      <Series.Sequence durationInFrames={180}><Tip4 /></Series.Sequence>
      <Series.Sequence durationInFrames={180}><Test /></Series.Sequence>
      <Series.Sequence durationInFrames={240}><Results /></Series.Sequence>
      <Series.Sequence durationInFrames={180}><Takeaway /></Series.Sequence>
      <Series.Sequence durationInFrames={240}><Outro /></Series.Sequence>
    </Series>
  </AbsoluteFill>
);
