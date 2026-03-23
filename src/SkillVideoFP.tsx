import { AbsoluteFill, Series, useCurrentFrame, interpolate } from "remotion";
import { C } from "./theme-fp";
import { FONT_FAMILY } from "./theme-fp";
import { FontLoader } from "./FontLoader";
import { useFadeInUp, useTypewriter, useFadeInLeft, useScaleIn } from "./animations";

// ═══════════════════════════════════════════════════════════════
// HALFTONE BORDER — the signature Flying Papers frame
// ═══════════════════════════════════════════════════════════════
const HalftoneFrame: React.FC = () => (
  <div style={{
    position: "absolute", inset: 0, pointerEvents: "none",
    border: `22px solid ${C.border}`,
    borderImage: `repeating-linear-gradient(
      45deg,
      ${C.halftone} 0px,
      ${C.halftone} 3px,
      transparent 3px,
      transparent 6px
    ) 22`,
    zIndex: 100,
  }} />
);

// ═══════════════════════════════════════════════════════════════
// SCENE WRAPPER — consistent bg + frame + font
// ═══════════════════════════════════════════════════════════════
const Scene: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ backgroundColor: C.bg, fontFamily: FONT_FAMILY }}>
    <HalftoneFrame />
    {children}
  </AbsoluteFill>
);

// ═══════════════════════════════════════════════════════════════
// 1. HOOK
// ═══════════════════════════════════════════════════════════════
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t1 = useFadeInUp(10, 25);
  const t2 = useFadeInUp(35, 25);
  const sub = useTypewriter("here's how to improve it", 90, 2);
  const lineW = interpolate(frame, [55, 85], [0, 700], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Scene>
      <div style={{
        display: "flex", flexDirection: "column", justifyContent: "center",
        alignItems: "center", height: "100%", padding: "0 80px",
      }}>
        <div style={{ ...t1, fontSize: 74, fontWeight: 700, color: C.text, letterSpacing: -2, textAlign: "center" }}>
          Most people's Skills actually make
        </div>
        <div style={{ ...t2, fontSize: 100, fontWeight: 700, fontStyle: "italic", textAlign: "center" }}>
          Claude <span style={{ color: C.primary, textShadow: `4px 4px 0px ${C.primaryDark}` }}>dumber</span>
        </div>
        <div style={{ width: lineW, height: 4, backgroundColor: C.border, marginTop: 28, marginBottom: 28 }} />
        <div style={{ fontSize: 42, color: C.textMid, height: 52, textAlign: "center" }}>
          {sub}<span style={{ opacity: frame % 30 < 15 ? 1 : 0, color: C.primary }}>|</span>
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 2. WRONG APPROACH
// ═══════════════════════════════════════════════════════════════
const WrongApproachScene: React.FC = () => {
  const frame = useCurrentFrame();
  const h = useFadeInUp(0, 18);
  const w = useFadeInUp(25, 18);
  const r = useFadeInUp(70, 18);
  const arr = interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: "0 100px" }}>
        <div style={{ ...h, fontSize: 56, fontWeight: 700, color: C.text, marginBottom: 50, textAlign: "center", fontStyle: "italic" }}>
          The First Instinct is <span style={{ color: C.primary, textShadow: `3px 3px 0 ${C.primaryDark}` }}>Wrong</span>
        </div>
        <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
          <div style={{ ...w, flex: 1, backgroundColor: C.accent, borderRadius: 4, padding: "36px 32px", border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.border}` }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🔌</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: C.primary, marginBottom: 10, fontStyle: "italic" }}>More MCP Tools</div>
            <div style={{ fontSize: 24, color: C.textDim, lineHeight: 1.5 }}>Expands what Claude <em>can</em> do — but not what it <em>should</em> do.</div>
          </div>
          <div style={{ fontSize: 64, color: C.border, opacity: arr, fontWeight: 700 }}>→</div>
          <div style={{ ...r, flex: 1, backgroundColor: C.accent, borderRadius: 4, padding: "36px 32px", border: `3px solid ${C.primary}`, boxShadow: `6px 6px 0 ${C.primaryDark}` }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🧠</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: C.primary, marginBottom: 10, fontStyle: "italic" }}>Skills = Methodology</div>
            <div style={{ fontSize: 24, color: C.textDim, lineHeight: 1.5 }}>Tell Claude <strong style={{ color: C.text }}>when</strong> and <strong style={{ color: C.text }}>how</strong>.</div>
          </div>
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 3. WHAT IS A SKILL
// ═══════════════════════════════════════════════════════════════
const WhatIsScene: React.FC = () => {
  const h = useFadeInUp(0, 20);
  const p1 = useFadeInUp(20, 18);
  const p2 = useFadeInUp(45, 18);

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 160px" }}>
        <div style={{ ...h, fontSize: 80, fontWeight: 700, color: C.text, marginBottom: 36, fontStyle: "italic", textShadow: `3px 3px 0 ${C.primarySoft}` }}>
          What Is a Skill?
        </div>
        <div style={{ ...p1, fontSize: 38, color: C.text, lineHeight: 1.6, marginBottom: 20 }}>
          A Skill is a <strong>folder</strong>. <span style={{ color: C.primary, fontWeight: 600 }}>SKILL.md</span> is its core.
        </div>
        <div style={{ ...p2, fontSize: 30, color: C.textDim, lineHeight: 1.6, padding: "20px 28px", backgroundColor: C.accent, border: `3px solid ${C.border}`, borderRadius: 4, boxShadow: `5px 5px 0 ${C.border}`, maxWidth: 900 }}>
          Tools expand capabilities. Skills teach <span style={{ color: C.primary, fontWeight: 600 }}>judgment</span>.
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 4. FOLDER STRUCTURE
// ═══════════════════════════════════════════════════════════════
const FolderScene: React.FC = () => {
  const h = useFadeInUp(0, 15);
  const lines = [
    { t: ".claude/skills/", c: C.textDim, d: 15 },
    { t: "└── your-skill-name/", c: C.primary, d: 25 },
    { t: "    ├── SKILL.md ★", c: "#4A8C4A", d: 40 },
    { t: "    ├── scripts/", c: C.textMid, d: 55 },
    { t: "    │   └── process_data.py", c: C.codeText, d: 65 },
    { t: "    ├── references/", c: C.textMid, d: 80 },
    { t: "    │   └── api-guide.md", c: C.codeText, d: 90 },
    { t: "    └── assets/", c: C.textMid, d: 105 },
    { t: "        └── template.md", c: C.codeText, d: 115 },
  ];

  return (
    <Scene>
      <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 100px", gap: 60 }}>
        <div style={{ flex: 1 }}>
          <div style={{ ...h, fontSize: 52, fontWeight: 700, color: C.text, fontStyle: "italic", marginBottom: 20, textShadow: `2px 2px 0 ${C.primarySoft}` }}>
            Folder Structure
          </div>
          <div style={{ ...useFadeInUp(20, 15), fontSize: 26, color: C.textDim, lineHeight: 1.5 }}>
            SKILL.md is required. Everything else is optional.
          </div>
        </div>
        <div style={{ flex: 1.2, backgroundColor: C.bgCode, borderRadius: 4, padding: "32px 28px", border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.border}` }}>
          {lines.map((l, i) => {
            const s = useFadeInUp(l.d, 10);
            return <div key={i} style={{ ...s, fontSize: 26, color: l.c, lineHeight: 1.8 }}>{l.t}</div>;
          })}
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 5. PROGRESSIVE DISCLOSURE
// ═══════════════════════════════════════════════════════════════
const DisclosureScene: React.FC = () => {
  const h = useFadeInUp(0, 18);
  const levels = [
    { n: "1", t: "YAML Frontmatter", w: "Name, description, tags", wh: "Every session", c: "#4A8C4A", d: 30 },
    { n: "2", t: "SKILL.md Body", w: "Instructions, workflow", wh: "When skill applies", c: C.primary, d: 60 },
    { n: "3", t: "Supporting Files", w: "Deep docs, scripts", wh: "On demand", c: C.secondarySoft, d: 90 },
  ];

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 120px" }}>
        <div style={{ ...h, fontSize: 60, fontWeight: 700, color: C.text, marginBottom: 40, fontStyle: "italic", textShadow: `3px 3px 0 ${C.primarySoft}` }}>
          Progressive Disclosure
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {levels.map((l, i) => {
            const s = useFadeInUp(l.d, 15);
            return (
              <div key={i} style={{ ...s, flex: 1, backgroundColor: C.accent, borderRadius: 4, padding: "28px 24px", border: `3px solid ${C.border}`, boxShadow: `5px 5px 0 ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 4, backgroundColor: l.c, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: C.accent }}>{l.n}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>{l.t}</div>
                </div>
                <div style={{ fontSize: 22, color: C.textMid, marginBottom: 6 }}>{l.w}</div>
                <div style={{ fontSize: 18, color: C.textDim }}>{l.wh}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. CONTEXT CRISIS
// ═══════════════════════════════════════════════════════════════
const ContextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const h = useFadeInUp(0, 18);

  const Bar: React.FC<{ label: string; tokens: string; pct: number; color: string; delay: number; alert?: boolean }> = ({ label, tokens, pct, color, delay, alert }) => {
    const s = useFadeInUp(delay, 12);
    const w = interpolate(frame, [delay + 8, delay + 30], [0, pct], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <div style={{ ...s, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 22 }}>
          <span style={{ color: C.text }}>{label}{alert && <span style={{ color: C.primary, marginLeft: 10, fontWeight: 700 }}>← killer</span>}</span>
          <span style={{ color: C.textDim }}>{tokens}</span>
        </div>
        <div style={{ height: 18, backgroundColor: `${color}25`, borderRadius: 2, border: `1px solid ${C.border}` }}>
          <div style={{ width: `${w}%`, height: "100%", backgroundColor: color, borderRadius: 2 }} />
        </div>
      </div>
    );
  };

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 120px" }}>
        <div style={{ ...h, fontSize: 52, fontWeight: 700, color: C.text, marginBottom: 8, fontStyle: "italic", textShadow: `2px 2px 0 ${C.primarySoft}` }}>
          Context = Signal-to-Noise
        </div>
        <div style={{ ...useFadeInUp(12, 15), fontSize: 24, color: C.textDim, marginBottom: 36 }}>200K total · Here's how it's spent</div>
        <div style={{ display: "flex", gap: 40 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, color: C.primary, fontWeight: 700, marginBottom: 14, ...useFadeInUp(20, 12) }}>Fixed (~15-20K)</div>
            <Bar label="System" tokens="~2K" pct={10} color={C.textDim} delay={30} />
            <Bar label="Skill descriptors" tokens="~1-5K" pct={18} color="#4A8C4A" delay={45} />
            <Bar label="MCP definitions" tokens="~10-20K" pct={65} color={C.primary} delay={60} alert />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, color: C.secondarySoft, fontWeight: 700, marginBottom: 14, ...useFadeInUp(75, 12) }}>Dynamic (~160-180K)</div>
            <Bar label="Conversation" tokens="" pct={90} color={C.secondarySoft} delay={85} />
            <Bar label="File contents" tokens="" pct={70} color={C.primary} delay={100} />
            <Bar label="Tool results" tokens="" pct={50} color="#4A8C4A" delay={115} />
          </div>
        </div>
        <div style={{ ...useFadeInUp(140, 18), marginTop: 24, padding: "16px 24px", backgroundColor: C.accent, border: `3px solid ${C.border}`, borderRadius: 4, boxShadow: `4px 4px 0 ${C.border}`, fontSize: 24, color: C.text, textAlign: "center" }}>
          5 MCP servers × 20 tools = <strong style={{ color: C.primary }}>~25,000 tokens</strong> before you type
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 7. SKILLS VS REST
// ═══════════════════════════════════════════════════════════════
const VsScene: React.FC = () => {
  const h = useFadeInUp(0, 18);
  const items = [
    { icon: "🔌", t: "MCP", r: "What Claude can do", d: 20 },
    { icon: "🧠", t: "Skills", r: "When & how", d: 40 },
    { icon: "🔄", t: "Subagents", r: "Clean slate", d: 60 },
    { icon: "⚡", t: "Hooks", r: "Deterministic", d: 80 },
  ];

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 100px" }}>
        <div style={{ ...h, fontSize: 56, fontWeight: 700, color: C.text, marginBottom: 44, fontStyle: "italic", textShadow: `3px 3px 0 ${C.primarySoft}` }}>
          Skills vs Everything Else
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {items.map((it, i) => {
            const s = useFadeInUp(it.d, 15);
            return (
              <div key={i} style={{ ...s, flex: 1, backgroundColor: C.accent, borderRadius: 4, padding: "32px 24px", border: `3px solid ${C.border}`, boxShadow: `5px 5px 0 ${C.border}`, borderTop: `6px solid ${C.primary}` }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>{it.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 8, fontStyle: "italic" }}>{it.t}</div>
                <div style={{ fontSize: 20, color: C.textDim }}>{it.r}</div>
              </div>
            );
          })}
        </div>
        <div style={{ ...useFadeInUp(110, 18), marginTop: 30, padding: "20px 28px", backgroundColor: C.accent, border: `3px solid ${C.primary}`, borderRadius: 4, fontSize: 26, color: C.text, fontStyle: "italic", textAlign: "center" }}>
          MCP = <strong>what</strong>. Skills = <strong style={{ color: C.primary }}>when</strong>.
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// TIPS 1-4 (reusable template)
// ═══════════════════════════════════════════════════════════════
const TipScene: React.FC<{
  num: string; title: string; desc: string;
  codeLines: Array<{ text: string; color: string }>;
}> = ({ num, title, desc, codeLines }) => {
  const label = useFadeInUp(0, 12);
  const heading = useFadeInUp(10, 18);
  const d = useFadeInUp(28, 16);
  const code = useFadeInUp(50, 18);

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
        <div style={{ ...label, fontSize: 22, fontWeight: 700, color: C.primary, textTransform: "uppercase", letterSpacing: 4, marginBottom: 10 }}>
          Best Practice #{num}
        </div>
        <div style={{ ...heading, fontSize: 52, fontWeight: 700, color: C.text, marginBottom: 16, fontStyle: "italic", textShadow: `2px 2px 0 ${C.primarySoft}` }}>
          {title}
        </div>
        <div style={{ ...d, fontSize: 26, color: C.textDim, marginBottom: 36, lineHeight: 1.4 }}>{desc}</div>
        <div style={{ ...code, backgroundColor: C.bgCode, borderRadius: 4, padding: "28px 32px", border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.border}`, lineHeight: 1.7 }}>
          {codeLines.map((l, i) => (
            <div key={i} style={{ fontSize: 24, color: l.color }}>{l.text}</div>
          ))}
        </div>
      </div>
    </Scene>
  );
};

const Tip1: React.FC = () => (
  <TipScene num="1" title="Minimal Description, Clear Trigger" desc="~9 tokens, action-triggering. No brochures." codeLines={[
    { text: '# ✅ Works', color: C.codeComment },
    { text: 'description: "Use for PR reviews with focus on correctness."', color: "#A8D5A0" },
    { text: '', color: C.codeText },
    { text: '# ❌ Doesn\'t work (~45 tokens)', color: C.codeComment },
    { text: 'description: "This skill helps you review code', color: "#E8726A" },
    { text: '  changes in Rust projects. It checks for..."', color: "#E8726A" },
  ]} />
);

const Tip2: React.FC = () => (
  <TipScene num="2" title="Lead with Use Cases" desc='First section answers: "When would I reach for this?"' codeLines={[
    { text: '## When to use', color: C.codeComment },
    { text: 'Use this skill when you need to:', color: C.codeText },
    { text: '  - Review PRs for correctness', color: "#A8D5A0" },
    { text: '  - Audit code for security patterns', color: "#A8D5A0" },
    { text: '', color: C.codeText },
    { text: '## When NOT to use', color: C.codeComment },
    { text: '  - Simple formatting (use hooks)', color: "#E8726A" },
  ]} />
);

const Tip3: React.FC = () => (
  <TipScene num="3" title="Explicit Inputs & Outputs" desc="What Claude receives → what it does → where results go" codeLines={[
    { text: 'Input:  PR diff from GitHub MCP', color: C.codeKeyword },
    { text: 'Process:', color: C.codeKeyword },
    { text: '  1. Check against security patterns', color: "#A8D5A0" },
    { text: '  2. Flag unsafe blocks w/ line refs', color: "#A8D5A0" },
    { text: '  3. Generate severity score', color: "#A8D5A0" },
    { text: 'Output: Review comment posted to PR', color: C.codeKeyword },
  ]} />
);

const Tip4: React.FC = () => (
  <TipScene num="4" title="Include Troubleshooting" desc="Skills fail predictably. A Common Issues section saves time." codeLines={[
    { text: '## Common Issues', color: C.codeComment },
    { text: '### MCP Connection Failed', color: C.codeComment },
    { text: 'If "Connection refused":', color: C.codeText },
    { text: '  1. Verify MCP server running', color: "#A8D5A0" },
    { text: '  2. Confirm API key valid', color: "#A8D5A0" },
    { text: '  3. Reconnect via Settings', color: "#A8D5A0" },
  ]} />
);

// ═══════════════════════════════════════════════════════════════
// 12. TESTING
// ═══════════════════════════════════════════════════════════════
const TestScene: React.FC = () => {
  const frame = useCurrentFrame();
  const h = useFadeInUp(0, 18);
  const s1 = useFadeInUp(35, 15);
  const a1 = interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s2a = useFadeInUp(75, 15);
  const s2b = useFadeInUp(95, 15);
  const a2 = interpolate(frame, [120, 135], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s3 = useFadeInUp(135, 15);

  const Box: React.FC<{ label: string; color: string; style: React.CSSProperties }> = ({ label, color, style: st }) => (
    <div style={{ ...st, padding: "18px 24px", backgroundColor: C.accent, border: `3px solid ${color}`, borderRadius: 4, boxShadow: `4px 4px 0 ${C.border}`, fontSize: 24, fontWeight: 600, color, textAlign: "center" }}>
      {label}
    </div>
  );

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 120px" }}>
        <div style={{ ...h, fontSize: 56, fontWeight: 700, color: C.text, marginBottom: 10, fontStyle: "italic", textShadow: `2px 2px 0 ${C.primarySoft}` }}>
          Testing with Evals
        </div>
        <div style={{ ...useFadeInUp(12, 15), fontSize: 26, color: C.textDim, marginBottom: 44 }}>
          Every test runs twice — with & without. Fresh subagent each time.
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <Box label="📋 evals.json" color={C.primary} style={s1} />
          <div style={{ fontSize: 36, color: C.border, opacity: a1, fontWeight: 700 }}>→</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Box label="🧠 With Skill" color="#4A8C4A" style={s2a} />
            <Box label="🚫 Without" color={C.primary} style={s2b} />
          </div>
          <div style={{ fontSize: 36, color: C.border, opacity: a2, fontWeight: 700 }}>→</div>
          <Box label="📊 results.json" color={C.secondarySoft} style={s3} />
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 13. RESULTS TABLE
// ═══════════════════════════════════════════════════════════════
const ResultsScene: React.FC = () => {
  const h = useFadeInUp(0, 18);

  const Row: React.FC<{ task: string; wt: string; wot: string; saved: string; win: boolean; delay: number }> = ({ task, wt, wot, saved, win, delay }) => {
    const s = useFadeInUp(delay, 10);
    return (
      <div style={{ ...s, display: "flex", alignItems: "center", padding: "12px 20px", borderBottom: `1px solid ${C.border}30` }}>
        <div style={{ flex: 2, fontSize: 22, color: C.text }}>{task}</div>
        <div style={{ flex: 1, textAlign: "center", fontSize: 22, color: win ? "#4A8C4A" : C.textDim, fontWeight: win ? 700 : 400 }}>{wt}</div>
        <div style={{ flex: 1, textAlign: "center", fontSize: 22, color: !win ? "#4A8C4A" : C.textDim, fontWeight: !win ? 700 : 400 }}>{wot}</div>
        <div style={{ flex: 0.8, textAlign: "center", fontSize: 22, color: C.primary, fontWeight: 600 }}>{saved}</div>
        <div style={{ width: 40, textAlign: "center", fontSize: 22 }}>{win ? "✅" : "❌"}</div>
      </div>
    );
  };

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 80px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 24 }}>
          <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, fontStyle: "italic" }}>Eval Results: Twitter Skill</div>
          <div style={{ ...useFadeInUp(10, 12), fontSize: 40, fontWeight: 800, color: C.primary }}>B+</div>
        </div>

        <div style={{ backgroundColor: C.accent, borderRadius: 4, border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.border}`, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", backgroundColor: C.primary, padding: "14px 20px" }}>
            <div style={{ flex: 2, fontSize: 16, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: 3 }}>Task</div>
            <div style={{ flex: 1, textAlign: "center", fontSize: 14, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: 2 }}>🧠 With</div>
            <div style={{ flex: 1, textAlign: "center", fontSize: 14, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: 2 }}>🚫 Without</div>
            <div style={{ flex: 0.8, textAlign: "center", fontSize: 14, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: 2 }}>⏱️ Saved</div>
            <div style={{ width: 40, textAlign: "center", fontSize: 14, fontWeight: 700, color: C.accent }}>🏆</div>
          </div>
          <Row task="Search #AI tweets" wt="2m17s" wot="11m" saved="5.5×" win={true} delay={40} />
          <Row task="Anthropic profile" wt="17s" wot="1m" saved="3.6×" win={true} delay={60} />
          <Row task="Latest tweet" wt="1m44s" wot="48s" saved="—" win={false} delay={80} />
          <Row task="Show bookmarks" wt="27s" wot="20s" saved="—" win={false} delay={100} />
          <Row task="User timeline" wt="44s" wot="26s" saved="—" win={false} delay={120} />
        </div>

        <div style={{ ...useFadeInUp(150, 18), marginTop: 24, padding: "16px 24px", backgroundColor: C.accent, border: `3px solid ${C.border}`, borderRadius: 4, boxShadow: `4px 4px 0 ${C.border}`, fontSize: 24, color: C.text, textAlign: "center", fontStyle: "italic" }}>
          Skills shine on <strong style={{ color: C.primary }}>complex tasks</strong> — simple reads run better without
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 14. TAKEAWAY
// ═══════════════════════════════════════════════════════════════
const TakeawayScene: React.FC = () => {
  const h = useFadeInUp(0, 18);
  const items = [
    { icon: "🧠", t: "Skills are methodology, not capability.", d: 20 },
    { icon: "✂️", t: "Keep SKILL.md lean. 9-token description.", d: 40 },
    { icon: "📊", t: "MCP eats tokens silently.", d: 60 },
    { icon: "🧪", t: "Test with evals — intuition ≠ measurement.", d: 80 },
    { icon: "🎯", t: "Make Claude better at specific things.", d: 100 },
  ];

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 160px" }}>
        <div style={{ ...h, fontSize: 64, fontWeight: 700, color: C.text, marginBottom: 40, fontStyle: "italic", textShadow: `3px 3px 0 ${C.primarySoft}` }}>TL;DR</div>
        {items.map((it, i) => {
          const s = useFadeInUp(it.d, 12);
          return (
            <div key={i} style={{ ...s, display: "flex", gap: 18, alignItems: "center", marginBottom: 22 }}>
              <div style={{ fontSize: 32, width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: C.accent, border: `3px solid ${C.border}`, borderRadius: 4, boxShadow: `3px 3px 0 ${C.border}`, flexShrink: 0 }}>{it.icon}</div>
              <div style={{ fontSize: 28, color: C.text }}>{it.t}</div>
            </div>
          );
        })}
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 15. OUTRO
// ═══════════════════════════════════════════════════════════════
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const h = useFadeInUp(0, 20);
  const sub = useFadeInUp(20, 18);
  const c1 = useScaleIn(40, 20);
  const c2 = useScaleIn(60, 20);
  const cta = useFadeInUp(90, 20);
  const credits = useFadeInUp(130, 18);
  const pulse = interpolate(frame % 60, [0, 15, 30, 45, 60], [1, 1.04, 1, 1.02, 1]);

  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <div style={{ ...h, fontSize: 60, fontWeight: 700, color: C.text, marginBottom: 12, fontStyle: "italic", textShadow: `3px 3px 0 ${C.primarySoft}` }}>
          Thanks for watching! 🙏
        </div>
        <div style={{ ...sub, fontSize: 26, color: C.textDim, marginBottom: 44 }}>
          Like, subscribe, and follow for more deep dives
        </div>
        <div style={{ display: "flex", gap: 30, marginBottom: 36 }}>
          <div style={{ ...c1, backgroundColor: C.accent, borderRadius: 4, padding: "28px 44px", border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 44 }}>𝕏</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.text }}>@LabFromAbyss</div>
            <div style={{ fontSize: 18, color: C.textDim }}>x.com/LabFromAbyss</div>
          </div>
          <div style={{ ...c2, backgroundColor: C.accent, borderRadius: 4, padding: "28px 44px", border: `3px solid ${C.border}`, boxShadow: `6px 6px 0 ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 44 }}>📺</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.text }}>Bilibili</div>
            <div style={{ fontSize: 18, color: C.textDim }}>space.bilibili.com/354637...</div>
          </div>
        </div>
        <div style={{ ...cta, transform: `scale(${pulse})`, padding: "16px 56px", backgroundColor: C.primary, border: `3px solid ${C.primaryDark}`, borderRadius: 4, boxShadow: `5px 5px 0 ${C.border}`, fontSize: 28, fontWeight: 700, color: C.accent, letterSpacing: 2 }}>
          SUBSCRIBE
        </div>
        <div style={{ ...credits, position: "absolute", bottom: 36, fontSize: 18, color: C.textDim }}>
          Built with Remotion · winoooops & Claw · Ithaqua 🌬️
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// MAIN COMPOSITION
// ═══════════════════════════════════════════════════════════════
export const SkillVideoFP: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <FontLoader />
      <Series>
        <Series.Sequence durationInFrames={240}><HookScene /></Series.Sequence>
        <Series.Sequence durationInFrames={210}><WrongApproachScene /></Series.Sequence>
        <Series.Sequence durationInFrames={180}><WhatIsScene /></Series.Sequence>
        <Series.Sequence durationInFrames={210}><FolderScene /></Series.Sequence>
        <Series.Sequence durationInFrames={210}><DisclosureScene /></Series.Sequence>
        <Series.Sequence durationInFrames={210}><ContextScene /></Series.Sequence>
        <Series.Sequence durationInFrames={180}><VsScene /></Series.Sequence>
        <Series.Sequence durationInFrames={180}><Tip1 /></Series.Sequence>
        <Series.Sequence durationInFrames={180}><Tip2 /></Series.Sequence>
        <Series.Sequence durationInFrames={180}><Tip3 /></Series.Sequence>
        <Series.Sequence durationInFrames={180}><Tip4 /></Series.Sequence>
        <Series.Sequence durationInFrames={180}><TestScene /></Series.Sequence>
        <Series.Sequence durationInFrames={240}><ResultsScene /></Series.Sequence>
        <Series.Sequence durationInFrames={180}><TakeawayScene /></Series.Sequence>
        <Series.Sequence durationInFrames={240}><OutroScene /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
