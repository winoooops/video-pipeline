import { AbsoluteFill, Series, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "./theme-v5";
import { FontLoader } from "./FontLoader";
import { useFadeInUp, useTypewriter, useScaleIn } from "./animations";

// ═══════════════════════════════════════════════════════════════
// GRADIENT BACKGROUND — Claude's warm tones
// ═══════════════════════════════════════════════════════════════
const GradientBg: React.FC<{ variant?: number }> = ({ variant = 0 }) => {
  const frame = useCurrentFrame();
  const shift = interpolate(frame, [0, 300], [0, 15], { extrapolateRight: "clamp" });
  
  const gradients = [
    `radial-gradient(ellipse at ${20 + shift}% 30%, ${C.bgGrad1}40 0%, transparent 50%),
     radial-gradient(ellipse at ${80 - shift}% 70%, ${C.bgGrad5}50 0%, transparent 50%),
     linear-gradient(135deg, ${C.bg} 0%, #FFF8F2 100%)`,
    `radial-gradient(ellipse at ${70 + shift}% 20%, ${C.bgGrad3}45 0%, transparent 45%),
     radial-gradient(ellipse at ${30 - shift}% 80%, ${C.bgGrad2}40 0%, transparent 45%),
     linear-gradient(160deg, ${C.bg} 0%, #FFF5F0 100%)`,
    `radial-gradient(ellipse at 50% ${40 + shift}%, ${C.bgGrad4}50 0%, transparent 50%),
     radial-gradient(ellipse at ${20 + shift}% 60%, ${C.bgGrad1}30 0%, transparent 40%),
     linear-gradient(145deg, #FFF8F2 0%, ${C.bg} 100%)`,
  ];

  return (
    <div style={{
      position: "absolute", inset: 0,
      background: gradients[variant % 3],
    }} />
  );
};

// ═══════════════════════════════════════════════════════════════
// GLASS CARD — polished, layered, not "vibe-coding"
// ═══════════════════════════════════════════════════════════════
const GlassCard: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  accent?: string;
  glow?: boolean;
}> = ({ children, style = {}, accent, glow }) => (
  <div style={{
    backgroundColor: C.card,
    backdropFilter: "blur(20px)",
    borderRadius: 20,
    border: `1px solid ${C.cardBorder}`,
    boxShadow: glow ? `${C.cardShadow}, ${C.cardGlow}` : C.cardShadow,
    padding: "32px 36px",
    ...(accent ? { borderTop: `3px solid ${accent}` } : {}),
    ...style,
  }}>
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// CODE BLOCK — refined dark editor
// ═══════════════════════════════════════════════════════════════
const CodeBlock: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style = {} }) => (
  <div style={{
    backgroundColor: C.bgCode,
    borderRadius: 16,
    padding: "28px 32px",
    boxShadow: "0 12px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
    lineHeight: 1.7,
    ...style,
  }}>
    {/* Window dots */}
    <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
      {["#FF5F57", "#FFBD2E", "#28CA41"].map((c, i) => (
        <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: c, opacity: 0.8 }} />
      ))}
    </div>
    {children}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// SCENE BASE
// ═══════════════════════════════════════════════════════════════
const Scene: React.FC<{ children: React.ReactNode; variant?: number }> = ({ children, variant = 0 }) => (
  <AbsoluteFill style={{ fontFamily: FONT_FAMILY }}>
    <GradientBg variant={variant} />
    {children}
  </AbsoluteFill>
);

// ═══════════════════════════════════════════════════════════════
// PILL BADGE
// ═══════════════════════════════════════════════════════════════
const Pill: React.FC<{ text: string; color: string; style?: React.CSSProperties }> = ({ text, color, style = {} }) => (
  <div style={{
    display: "inline-block", padding: "6px 18px",
    backgroundColor: `${color}15`, border: `1px solid ${color}30`,
    borderRadius: 100, fontSize: 18, fontWeight: 600,
    color, letterSpacing: 1, textTransform: "uppercase",
    ...style,
  }}>
    {text}
  </div>
);

// ═══════════════════════════════════════════════════════════════
// 1. HOOK
// ═══════════════════════════════════════════════════════════════
const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const t1 = useFadeInUp(10, 25);
  const t2 = useFadeInUp(35, 25);
  const sub = useTypewriter("here's how to improve it", 90, 2);
  const lineW = interpolate(frame, [55, 85], [0, 600], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <Scene variant={0}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: "0 100px" }}>
        <div style={{ ...t1, fontSize: 68, fontWeight: 700, color: C.text, letterSpacing: -2, textAlign: "center" }}>
          Most people's Skills actually make
        </div>
        <div style={{ ...t2, fontSize: 96, fontWeight: 700, letterSpacing: -3, textAlign: "center" }}>
          Claude{" "}
          <span style={{
            color: C.danger,
            background: `linear-gradient(135deg, ${C.danger}, #B91C1C)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>dumber</span>
        </div>
        <div style={{ width: lineW, height: 2, background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`, marginTop: 28, marginBottom: 28 }} />
        <div style={{ fontSize: 40, color: C.textMid, height: 50, textAlign: "center" }}>
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
    <Scene variant={1}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", padding: "0 120px" }}>
        <div style={{ ...h, fontSize: 52, fontWeight: 700, color: C.text, marginBottom: 50, textAlign: "center" }}>
          The First Instinct is <span style={{ color: C.danger }}>Wrong</span>
        </div>
        <div style={{ display: "flex", gap: 40, alignItems: "center", width: "100%" }}>
          <GlassCard style={{ ...w, flex: 1 }} accent={C.danger}>
            <div style={{ fontSize: 44, marginBottom: 16 }}>🔌</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: C.danger, marginBottom: 10 }}>More MCP Tools</div>
            <div style={{ fontSize: 22, color: C.textDim, lineHeight: 1.6 }}>
              Expands what Claude <em>can</em> do — but not what it <em>should</em> do.
            </div>
          </GlassCard>
          <div style={{ fontSize: 56, color: C.primary, opacity: arr, fontWeight: 300 }}>→</div>
          <GlassCard style={{ ...r, flex: 1 }} accent={C.accent} glow>
            <div style={{ fontSize: 44, marginBottom: 16 }}>🧠</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: C.accent, marginBottom: 10 }}>Skills = Methodology</div>
            <div style={{ fontSize: 22, color: C.textDim, lineHeight: 1.6 }}>
              Tell Claude <strong style={{ color: C.text }}>when</strong> and <strong style={{ color: C.text }}>how</strong> to do it well.
            </div>
          </GlassCard>
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
  const card = useFadeInUp(50, 18);

  return (
    <Scene variant={2}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 160px" }}>
        <Pill text="Core Concept" color={C.primary} style={useFadeInUp(0, 12)} />
        <div style={{ ...h, fontSize: 72, fontWeight: 700, color: C.text, marginTop: 16, marginBottom: 32, letterSpacing: -2 }}>
          What Is a <span style={{ color: C.primary }}>Skill</span>?
        </div>
        <div style={{ ...p1, fontSize: 36, color: C.textMid, lineHeight: 1.6, marginBottom: 36 }}>
          A Skill is a <strong style={{ color: C.text }}>folder</strong>. <span style={{ color: C.primary, fontWeight: 600 }}>SKILL.md</span> is its core.
        </div>
        <GlassCard style={{ ...card, maxWidth: 900, borderLeft: `3px solid ${C.primary}` }}>
          <div style={{ fontSize: 26, color: C.textMid, lineHeight: 1.6 }}>
            Tools expand capabilities. Skills teach <span style={{ color: C.primary, fontWeight: 600 }}>judgment</span> — when to act and which approach to take.
          </div>
        </GlassCard>
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
    { t: ".claude/skills/", c: C.codeComment, d: 15 },
    { t: "└── your-skill-name/", c: C.codeFunc, d: 25 },
    { t: "    ├── SKILL.md ★", c: C.codeString, d: 40, hl: true },
    { t: "    ├── scripts/", c: C.codeKeyword, d: 55 },
    { t: "    │   └── process_data.py", c: C.codeText, d: 65 },
    { t: "    ├── references/", c: C.codeKeyword, d: 80 },
    { t: "    │   └── api-guide.md", c: C.codeText, d: 90 },
    { t: "    └── assets/", c: C.codeKeyword, d: 105 },
    { t: "        └── template.md", c: C.codeText, d: 115 },
  ];

  return (
    <Scene variant={0}>
      <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 100px", gap: 60 }}>
        <div style={{ flex: 1 }}>
          <Pill text="Structure" color={C.secondary} style={useFadeInUp(0, 10)} />
          <div style={{ ...h, fontSize: 52, fontWeight: 700, color: C.text, marginTop: 12, marginBottom: 20, letterSpacing: -1 }}>Folder Structure</div>
          <div style={{ ...useFadeInUp(20, 15), fontSize: 26, color: C.textDim, lineHeight: 1.5 }}>
            SKILL.md is required.{"\n"}Everything else is optional.
          </div>
        </div>
        <div style={{ flex: 1.2 }}>
          <CodeBlock>
            {lines.map((l, i) => {
              const s = useFadeInUp(l.d, 10);
              return <div key={i} style={{ ...s, fontSize: 24, color: l.c, ...(l.hl ? { backgroundColor: "rgba(134,239,172,0.1)", margin: "0 -12px", padding: "2px 12px", borderRadius: 4 } : {}) }}>{l.t}</div>;
            })}
          </CodeBlock>
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
    { n: "1", t: "YAML Frontmatter", w: "Name, description, tags", wh: "Always in context", c: C.accent, d: 30 },
    { n: "2", t: "SKILL.md Body", w: "Instructions, workflow", wh: "When skill applies", c: C.primary, d: 55 },
    { n: "3", t: "Supporting Files", w: "Deep docs, scripts", wh: "On demand", c: C.secondary, d: 80 },
  ];

  return (
    <Scene variant={1}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 120px" }}>
        <Pill text="Architecture" color={C.accent} style={useFadeInUp(0, 10)} />
        <div style={{ ...h, fontSize: 60, fontWeight: 700, color: C.text, marginTop: 12, marginBottom: 40, letterSpacing: -2 }}>
          Progressive <span style={{ color: C.secondary }}>Disclosure</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {levels.map((l, i) => {
            const s = useFadeInUp(l.d, 15);
            const frame = useCurrentFrame();
            const bar = interpolate(frame, [l.d + 15, l.d + 45], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <GlassCard key={i} style={{ ...s, flex: 1 }} accent={l.c}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${l.c}, ${l.c}CC)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#FFF" }}>{l.n}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: C.text }}>{l.t}</div>
                </div>
                <div style={{ fontSize: 22, color: C.textMid, marginBottom: 8 }}>{l.w}</div>
                <div style={{ fontSize: 18, color: C.textDim, marginBottom: 16 }}>{l.wh}</div>
                <div style={{ height: 4, backgroundColor: `${l.c}15`, borderRadius: 2 }}>
                  <div style={{ width: `${bar}%`, height: "100%", backgroundColor: l.c, borderRadius: 2 }} />
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// 6. CONTEXT BUDGET
// ═══════════════════════════════════════════════════════════════
const ContextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const h = useFadeInUp(0, 18);

  const Bar: React.FC<{ label: string; tokens: string; pct: number; color: string; delay: number; alert?: boolean }> = ({ label, tokens, pct, color, delay, alert }) => {
    const s = useFadeInUp(delay, 12);
    const w = interpolate(frame, [delay + 8, delay + 28], [0, pct], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <div style={{ ...s, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 21 }}>
          <span style={{ color: C.text }}>{label}{alert && <span style={{ color: C.danger, marginLeft: 10, fontWeight: 600 }}>← silent killer</span>}</span>
          <span style={{ color: C.textDim }}>{tokens}</span>
        </div>
        <div style={{ height: 16, backgroundColor: `${color}10`, borderRadius: 8, overflow: "hidden" }}>
          <div style={{ width: `${w}%`, height: "100%", background: `linear-gradient(90deg, ${color}CC, ${color})`, borderRadius: 8 }} />
        </div>
      </div>
    );
  };

  return (
    <Scene variant={2}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 120px" }}>
        <Pill text="The Problem" color={C.danger} style={useFadeInUp(0, 10)} />
        <div style={{ ...h, fontSize: 52, fontWeight: 700, color: C.text, marginTop: 12, marginBottom: 8, letterSpacing: -1 }}>
          Context is <span style={{ color: C.danger }}>Signal-to-Noise</span>
        </div>
        <div style={{ ...useFadeInUp(12, 15), fontSize: 24, color: C.textDim, marginBottom: 32 }}>200K total context — here's how it's really spent</div>
        <div style={{ display: "flex", gap: 30 }}>
          <GlassCard style={{ flex: 1, ...useFadeInUp(20, 15) }}>
            <div style={{ fontSize: 20, color: C.primary, fontWeight: 700, marginBottom: 16 }}>Fixed Overhead (~15-20K)</div>
            <Bar label="System instructions" tokens="~2K" pct={10} color={C.textDim} delay={30} />
            <Bar label="Skill descriptors" tokens="~1-5K" pct={18} color={C.accent} delay={42} />
            <Bar label="MCP definitions" tokens="~10-20K" pct={65} color={C.danger} delay={54} alert />
          </GlassCard>
          <GlassCard style={{ flex: 1, ...useFadeInUp(40, 15) }}>
            <div style={{ fontSize: 20, color: C.secondary, fontWeight: 700, marginBottom: 16 }}>Dynamic (~160-180K)</div>
            <Bar label="Conversation" tokens="" pct={90} color={C.secondary} delay={70} />
            <Bar label="File contents" tokens="" pct={70} color={C.primary} delay={82} />
            <Bar label="Tool results" tokens="" pct={50} color={C.accent} delay={94} />
          </GlassCard>
        </div>
        <GlassCard style={{ marginTop: 20, textAlign: "center", ...useFadeInUp(120, 18), background: C.dangerSoft, border: `1px solid ${C.danger}20` }}>
          <div style={{ fontSize: 24, color: C.text }}>
            5 MCP servers × 20 tools = <strong style={{ color: C.danger }}>~25,000 tokens</strong> before you type a single message
          </div>
        </GlassCard>
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
    { icon: "🔌", t: "MCP", r: "Abilities — what Claude can do", c: C.danger, d: 20 },
    { icon: "🧠", t: "Skills", r: "Methodology — when & how", c: C.primary, d: 40 },
    { icon: "🔄", t: "Subagents", r: "Isolation — clean slate", c: C.accent, d: 60 },
    { icon: "⚡", t: "Hooks", r: "Deterministic enforcement", c: C.secondary, d: 80 },
  ];

  return (
    <Scene variant={0}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 100px" }}>
        <Pill text="Mental Model" color={C.secondary} style={useFadeInUp(0, 10)} />
        <div style={{ ...h, fontSize: 56, fontWeight: 700, color: C.text, marginTop: 12, marginBottom: 40, letterSpacing: -2 }}>
          Skills vs <span style={{ color: C.secondary }}>Everything Else</span>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {items.map((it, i) => {
            const s = useFadeInUp(it.d, 15);
            return (
              <GlassCard key={i} style={{ ...s, flex: 1 }} accent={it.c} glow={it.t === "Skills"}>
                <div style={{ fontSize: 40, marginBottom: 14 }}>{it.icon}</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: C.text, marginBottom: 8 }}>{it.t}</div>
                <div style={{ fontSize: 20, color: C.textDim, lineHeight: 1.5 }}>{it.r}</div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

// ═══════════════════════════════════════════════════════════════
// TIP SCENE TEMPLATE
// ═══════════════════════════════════════════════════════════════
const TipScene: React.FC<{
  num: string; title: string; desc: string; variant: number; color: string;
  codeLines: Array<{ text: string; color: string }>;
}> = ({ num, title, desc, variant, color, codeLines }) => {
  const label = useFadeInUp(0, 12);
  const heading = useFadeInUp(10, 18);
  const d = useFadeInUp(28, 16);
  const code = useFadeInUp(48, 18);

  return (
    <Scene variant={variant}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
        <Pill text={`Best Practice #${num}`} color={color} style={label} />
        <div style={{ ...heading, fontSize: 50, fontWeight: 700, color: C.text, marginTop: 14, marginBottom: 14, letterSpacing: -1 }}>{title}</div>
        <div style={{ ...d, fontSize: 26, color: C.textDim, marginBottom: 30, lineHeight: 1.4 }}>{desc}</div>
        <CodeBlock style={code}>
          {codeLines.map((l, i) => (
            <div key={i} style={{ fontSize: 23, color: l.color }}>{l.text}</div>
          ))}
        </CodeBlock>
      </div>
    </Scene>
  );
};

const Tip1: React.FC = () => <TipScene num="1" title="Minimal Description, Clear Trigger" desc="~9 tokens, action-triggering. No brochures." variant={1} color={C.primary} codeLines={[
  { text: "# ✅ Works (~9 tokens)", color: C.codeComment },
  { text: 'description: "Use for PR reviews with focus on correctness."', color: C.codeString },
  { text: "", color: C.codeText },
  { text: "# ❌ Doesn't work (~45 tokens, reads like a brochure)", color: C.codeComment },
  { text: 'description: "This skill helps you review code', color: "#F87171" },
  { text: '  changes in Rust projects. It checks for..."', color: "#F87171" },
]} />;

const Tip2: React.FC = () => <TipScene num="2" title="Lead with Use Cases" desc='First section answers: "When would I reach for this?"' variant={2} color={C.secondary} codeLines={[
  { text: "## When to use", color: C.codeComment },
  { text: "Use this skill when you need to:", color: C.codeText },
  { text: "  - Review pull requests for correctness", color: C.codeString },
  { text: "  - Audit code for security patterns", color: C.codeString },
  { text: "", color: C.codeText },
  { text: "## When NOT to use", color: C.codeComment },
  { text: "  - Simple formatting or linting (use hooks)", color: "#F87171" },
]} />;

const Tip3: React.FC = () => <TipScene num="3" title="Explicit Inputs & Outputs" desc="What Claude receives → what it does → where results go" variant={0} color={C.accent} codeLines={[
  { text: "Input:   PR diff from GitHub MCP", color: C.codeKeyword },
  { text: "Process:", color: C.codeKeyword },
  { text: "  1. Check each file against security patterns", color: C.codeString },
  { text: "  2. Flag unsafe blocks with line references", color: C.codeString },
  { text: "  3. Generate severity score (low/med/high)", color: C.codeString },
  { text: "Output:  Review comment posted to PR via API", color: C.codeKeyword },
]} />;

const Tip4: React.FC = () => <TipScene num="4" title="Include Troubleshooting" desc="Skills fail predictably. A Common Issues section cuts the back-and-forth." variant={1} color={C.danger} codeLines={[
  { text: "## Common Issues", color: C.codeComment },
  { text: "### MCP Connection Failed", color: C.codeComment },
  { text: 'If you see "Connection refused":', color: C.codeText },
  { text: "  1. Verify MCP server is running", color: C.codeString },
  { text: "  2. Confirm API key is valid", color: C.codeString },
  { text: "  3. Reconnect: Settings → Extensions", color: C.codeString },
]} />;

// ═══════════════════════════════════════════════════════════════
// 12. TESTING
// ═══════════════════════════════════════════════════════════════
const TestScene: React.FC = () => {
  const frame = useCurrentFrame();
  const h = useFadeInUp(0, 18);
  const s1 = useFadeInUp(35, 15); const a1 = interpolate(frame, [60, 75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s2a = useFadeInUp(75, 15); const s2b = useFadeInUp(95, 15);
  const a2 = interpolate(frame, [120, 135], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const s3 = useFadeInUp(135, 15);

  return (
    <Scene variant={2}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 120px" }}>
        <Pill text="Validation" color={C.primary} style={useFadeInUp(0, 10)} />
        <div style={{ ...h, fontSize: 56, fontWeight: 700, color: C.text, marginTop: 12, marginBottom: 10, letterSpacing: -2 }}>
          Testing with <span style={{ color: C.primary }}>Evals</span>
        </div>
        <div style={{ ...useFadeInUp(12, 15), fontSize: 26, color: C.textDim, marginBottom: 44 }}>
          Every test runs twice — with & without. Fresh subagent each time.
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
          <GlassCard style={{ ...s1, textAlign: "center" }} accent={C.primary}><div style={{ fontSize: 24, fontWeight: 600, color: C.primary }}>📋 evals.json</div></GlassCard>
          <div style={{ fontSize: 40, color: C.primary, opacity: a1, fontWeight: 300 }}>→</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <GlassCard style={{ ...s2a, textAlign: "center", padding: "16px 28px" }} accent={C.accent}><div style={{ fontSize: 22, fontWeight: 600, color: C.accent }}>🧠 With Skill</div></GlassCard>
            <GlassCard style={{ ...s2b, textAlign: "center", padding: "16px 28px" }} accent={C.danger}><div style={{ fontSize: 22, fontWeight: 600, color: C.danger }}>🚫 Without</div></GlassCard>
          </div>
          <div style={{ fontSize: 40, color: C.primary, opacity: a2, fontWeight: 300 }}>→</div>
          <GlassCard style={{ ...s3, textAlign: "center" }} accent={C.secondary} glow><div style={{ fontSize: 24, fontWeight: 600, color: C.secondary }}>📊 results.json</div></GlassCard>
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
      <div style={{ ...s, display: "flex", alignItems: "center", padding: "14px 24px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ flex: 2, fontSize: 22, color: C.text }}>{task}</div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: win ? C.primary : "#D4D4D4", margin: "0 auto 4px" }} />
          <div style={{ fontSize: 20, color: win ? C.text : C.textDim, fontWeight: win ? 600 : 400 }}>{wt}</div>
        </div>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: !win ? C.primary : "#D4D4D4", margin: "0 auto 4px" }} />
          <div style={{ fontSize: 20, color: !win ? C.text : C.textDim, fontWeight: !win ? 600 : 400 }}>{wot}</div>
        </div>
        <div style={{ flex: 0.8, textAlign: "center", fontSize: 20, color: C.primary, fontWeight: 600 }}>{saved}</div>
      </div>
    );
  };

  return (
    <Scene variant={0}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 100px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 24 }}>
          <div style={{ ...h, fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: -1 }}>
            Results: <span style={{ color: C.primary }}>Twitter Skill</span>
          </div>
          <div style={{ ...useFadeInUp(10, 12), fontSize: 36, fontWeight: 800, color: C.primary }}>B+</div>
        </div>
        <GlassCard style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", background: `linear-gradient(135deg, ${C.primary}, ${C.primary}DD)`, padding: "16px 24px" }}>
            <div style={{ flex: 2, fontSize: 15, fontWeight: 700, color: "#FFF", textTransform: "uppercase", letterSpacing: 3 }}>Task</div>
            <div style={{ flex: 1, textAlign: "center", color: "#FFF" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🧠</div>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>With Skill</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", color: "#FFF" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>🚫</div>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>Without</div>
            </div>
            <div style={{ flex: 0.8, textAlign: "center", color: "#FFF" }}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>⏱️</div>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2 }}>Saved</div>
            </div>
          </div>
          <Row task="Search #AI tweets" wt="2m17s" wot="11m" saved="5.5×" win={true} delay={40} />
          <Row task="Anthropic profile" wt="17s" wot="1m" saved="3.6×" win={true} delay={60} />
          <Row task="Latest tweet" wt="1m44s" wot="48s" saved="—" win={false} delay={80} />
          <Row task="Show bookmarks" wt="27s" wot="20s" saved="—" win={false} delay={100} />
          <Row task="User timeline" wt="44s" wot="26s" saved="—" win={false} delay={120} />
        </GlassCard>
        <GlassCard style={{ marginTop: 20, textAlign: "center", ...useFadeInUp(150, 18), background: C.primarySoft }}>
          <div style={{ fontSize: 24, color: C.textMid }}>
            Skills shine on <strong style={{ color: C.primary }}>complex tasks</strong> — simple reads run better without the overhead
          </div>
        </GlassCard>
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
    <Scene variant={1}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 160px" }}>
        <div style={{ ...h, fontSize: 64, fontWeight: 700, color: C.text, marginBottom: 40, letterSpacing: -2 }}>TL;DR</div>
        {items.map((it, i) => {
          const s = useFadeInUp(it.d, 12);
          return (
            <div key={i} style={{ ...s, display: "flex", gap: 18, alignItems: "center", marginBottom: 22 }}>
              <GlassCard style={{ width: 60, height: 60, padding: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, flexShrink: 0 }}>
                {it.icon}
              </GlassCard>
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
  const pulse = interpolate(frame % 60, [0, 15, 30, 45, 60], [1, 1.03, 1, 1.02, 1]);

  return (
    <Scene variant={2}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <div style={{ ...h, fontSize: 56, fontWeight: 700, color: C.text, marginBottom: 12 }}>Thanks for watching! 🙏</div>
        <div style={{ ...sub, fontSize: 26, color: C.textDim, marginBottom: 44 }}>Like, subscribe, and follow for more deep dives</div>
        <div style={{ display: "flex", gap: 24, marginBottom: 36 }}>
          <GlassCard style={{ ...c1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, minWidth: 340 }} glow>
            <div style={{ fontSize: 44 }}>𝕏</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.text }}>@LabFromAbyss</div>
            <div style={{ fontSize: 18, color: C.textDim }}>x.com/LabFromAbyss</div>
          </GlassCard>
          <GlassCard style={{ ...c2, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, minWidth: 340 }} glow>
            <div style={{ fontSize: 44 }}>📺</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: C.text }}>Bilibili</div>
            <div style={{ fontSize: 18, color: C.textDim }}>space.bilibili.com/354637...</div>
          </GlassCard>
        </div>
        <div style={{
          ...cta, transform: `scale(${pulse})`, padding: "16px 56px",
          background: `linear-gradient(135deg, #DC2626, #B91C1C)`,
          borderRadius: 14, fontSize: 26, fontWeight: 700, color: "#FFF", letterSpacing: 2,
          boxShadow: "0 8px 24px rgba(220,38,38,0.3)",
        }}>
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
export const SkillVideoV5: React.FC = () => (
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
