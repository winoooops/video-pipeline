import { AbsoluteFill, Series, useCurrentFrame, interpolate, Audio, staticFile } from "remotion";
import { C, RADIUS, FONT, TYPE } from "./theme-s08";
import { FontLoader } from "./FontLoader";

// ── Animation helpers ──
const useFade = (delay = 0, dur = 18) => {
  const f = useCurrentFrame();
  return {
    opacity: interpolate(f, [delay, delay + dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
    transform: `translateY(${interpolate(f, [delay, delay + dur], [16, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}px)`,
  };
};
const useType = (text: string, start = 0, speed = 2) => {
  const f = useCurrentFrame();
  const n = Math.min(Math.floor((f - start) / speed), text.length);
  return f >= start ? text.slice(0, Math.max(0, n)) : "";
};

// ── Shared Components ──
const Grain: React.FC = () => (
  <div style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
  }} />
);
const Rings: React.FC<{ x: number; y: number; size?: number }> = ({ x, y, size = 200 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: size, height: size }}>
    {[C.brand.primary, C.brand.secondary, "#D4A574", C.text.primary, C.bg.primary].map((c, i) => (
      <div key={i} style={{ position: "absolute", inset: `${i * 15}%`, borderRadius: "50%", backgroundColor: c }} />
    ))}
  </div>
);
const Scene: React.FC<{ children: React.ReactNode; alt?: boolean }> = ({ children, alt }) => (
  <AbsoluteFill style={{ backgroundColor: alt ? C.bg.secondary : C.bg.primary, position: "relative" }}>
    <Grain /><div style={{ position: "relative", width: "100%", height: "100%" }}>{children}</div>
  </AbsoluteFill>
);
const Label: React.FC<{ text: string; style?: React.CSSProperties }> = ({ text, style = {} }) => (
  <div style={{ ...TYPE.small, fontFamily: FONT.label, textTransform: "uppercase", letterSpacing: "0.25em", color: C.text.muted, fontWeight: 700, ...style }}>{text}</div>
);
const Card: React.FC<{ children: React.ReactNode; featured?: boolean; activeStart?: number; activeEnd?: number; style?: React.CSSProperties }> = ({ children, featured, activeStart, activeEnd, style = {} }) => {
  const f = useCurrentFrame();
  let t = 0;
  if (activeStart !== undefined && activeEnd !== undefined) {
    const fadeIn = interpolate(f, [activeStart, activeStart + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const fadeOut = interpolate(f, [activeEnd - 10, activeEnd], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    t = Math.min(fadeIn, fadeOut);
  }
  const scale = 1 + t * 0.03;
  const borderW = featured ? 2 : t * 3;
  const shadow = t * 20;
  return (
    <div style={{
      padding: 28, borderRadius: RADIUS.md,
      backgroundColor: t > 0.5 ? `${C.brand.primary}18` : featured ? `${C.brand.primary}10` : `${C.text.secondary}08`,
      border: `${Math.max(borderW, featured ? 2 : 0)}px solid ${t > 0.1 ? C.brand.primary : featured ? C.brand.primary : "transparent"}`,
      transform: `scale(${scale})`,
      boxShadow: shadow > 1 ? `0 4px ${shadow}px ${C.brand.primary}25` : "none",
      ...style,
    }}>{children}</div>
  );
};
const Code: React.FC<{ lines: string[]; delay?: number }> = ({ lines, delay = 0 }) => {
  const s = useFade(delay, 18);
  return (
    <div style={{ ...s, backgroundColor: C.codeBg, padding: "28px 32px", borderRadius: RADIUS.md }}>
      {lines.map((l, i) => (
        <div key={i} style={{ fontSize: 22, lineHeight: 1.8, fontFamily: FONT.body,
          color: l.startsWith("#") || l.startsWith("//") ? C.codeDim : C.codeText,
          whiteSpace: "pre",
        }}>{l}</div>
      ))}
    </div>
  );
};

// ════════════════════════════════════════════════════════════
// 21 SCENES
// ════════════════════════════════════════════════════════════

// 1. HOOK (270f/9s)
const Hook: React.FC = () => {
  const f = useCurrentFrame();
  const sub = useType("here's how to improve it", 120, 2);
  return (
    <Scene><Rings x={-50} y={-30} size={200} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 160px" }}>
        <Label text="Claude Code · Deep Dive" style={useFade(10, 14)} />
        <div style={{ ...useFade(20, 22), ...TYPE.h2, fontFamily: FONT.display, color: C.text.secondary, marginTop: 16 }}>Most people's Skills actually make</div>
        <div style={{ ...useFade(55, 22), fontSize: 80, lineHeight: 1.1, fontWeight: 600, fontFamily: FONT.display, color: C.text.primary, letterSpacing: "-0.02em", marginTop: 4 }}>
          Claude <span style={{ color: C.brand.primary }}>dumber</span>
        </div>
        <div style={{ marginTop: 40, fontSize: 34, color: C.text.muted, fontFamily: FONT.body, height: 44 }}>
          {sub}<span style={{ opacity: f % 30 < 15 ? 1 : 0, color: C.brand.primary }}>|</span>
        </div>
      </div>
    </Scene>
  );
};

// 2. FOUR PRIMITIVES — intro (540f/18s)
const Primitives: React.FC = () => {
  const f = useCurrentFrame();
  const items = [
    { t: "MCP", r: "What Claude can do", d: 100, aS: 100, aE: 200 },
    { t: "Skills", r: "When & how to act", d: 190, aS: 200, aE: 310, feat: true },
    { t: "Subagents", r: "Clean slate isolation", d: 300, aS: 310, aE: 410 },
    { t: "Hooks", r: "Deterministic guardrails", d: 400, aS: 410, aE: 540 },
  ];
  return (
    <Scene alt>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
        <Label text="Before we start" style={useFade(15, 12)} />
        <div style={{ ...useFade(25, 20), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 12px" }}>Claude Code has four key building blocks.</div>
        <div style={{ ...useFade(55, 16), fontSize: 24, color: C.text.secondary, fontFamily: FONT.body, marginBottom: 40 }}>Understanding these helps you see where Skills fit in.</div>
        <div style={{ display: "flex", gap: 20 }}>
          {items.map((it, i) => (
            <Card key={i} style={{ ...useFade(it.d, 18), flex: 1 }} activeStart={it.aS} activeEnd={it.aE}>
              <div style={{ fontSize: 26, fontWeight: 600, color: (f >= it.aS && f < it.aE) ? C.brand.primary : it.feat ? C.brand.primary : C.text.primary, fontFamily: FONT.display, marginBottom: 8 }}>{it.t}</div>
              <div style={{ fontSize: 20, color: C.text.secondary, fontFamily: FONT.body }}>{it.r}</div>
            </Card>
          ))}
        </div>
      </div>
    </Scene>
  );
};

// 3. WRONG APPROACH (270f/9s)
const Wrong: React.FC = () => {
  const f = useCurrentFrame();
  const arr = interpolate(f, [140, 155], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
        <div style={{ ...useFade(15, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, marginBottom: 48 }}>The first instinct is wrong.</div>
        <div style={{ display: "flex", gap: 50, alignItems: "flex-start" }}>
          <Card style={{ ...useFade(45, 18), flex: 1 }} activeStart={50} activeEnd={150}>
            <Label text="Common approach" />
            <div style={{ ...TYPE.h3, fontFamily: FONT.display, color: C.text.primary, margin: "14px 0 10px" }}>Add more MCP tools</div>
            <div style={{ fontSize: 22, color: C.text.secondary, lineHeight: 1.6, fontFamily: FONT.body }}>Expands what Claude can do.{"\n"}Not what it should do.</div>
          </Card>
          <div style={{ fontSize: 44, color: C.text.muted, opacity: arr, alignSelf: "center" }}>→</div>
          <Card style={{ ...useFade(140, 18), flex: 1 }} activeStart={150} activeEnd={270}>
            <Label text="Better approach" style={{ color: C.brand.primary }} />
            <div style={{ ...TYPE.h3, fontFamily: FONT.display, color: C.text.primary, margin: "14px 0 10px" }}>Write a Skill</div>
            <div style={{ fontSize: 22, color: C.text.secondary, lineHeight: 1.6, fontFamily: FONT.body }}>Teaches Claude when to act{"\n"}and which approach to take.</div>
          </Card>
        </div>
      </div>
    </Scene>
  );
};

// 4. WHAT IS A SKILL (240f/8s)
const WhatIs: React.FC = () => (
  <Scene alt><Rings x={1620} y={680} size={180} />
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 180px" }}>
      <div style={{ ...useFade(15, 20), ...TYPE.h1, fontFamily: FONT.display, color: C.text.primary, marginBottom: 28 }}>A Skill is a folder.</div>
      <div style={{ ...useFade(50, 18), fontSize: 28, color: C.text.secondary, lineHeight: 1.6, fontFamily: FONT.body, marginBottom: 36, maxWidth: 850 }}>
        <span style={{ color: C.brand.primary, fontWeight: 600 }}>SKILL.md</span> is its core. Everything else — scripts, references, assets — loaded on demand.
      </div>
      <div style={{ ...useFade(110, 18), borderTop: `3px solid ${C.border.strong}`, borderBottom: `3px solid ${C.border.strong}`, padding: "20px 0", maxWidth: 650 }}>
        <div style={{ fontSize: 26, color: C.text.secondary, fontFamily: FONT.display, fontStyle: "italic", lineHeight: 1.5 }}>Tools expand capabilities. Skills teach judgment.</div>
      </div>
    </div>
  </Scene>
);

// 5. FOLDER (240f/8s)
const Folder: React.FC = () => (
  <Scene>
    <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 120px", gap: 60 }}>
      <div style={{ flex: 1 }}>
        <Label text="Structure" style={useFade(10, 12)} />
        <div style={{ ...useFade(20, 15), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 20px" }}>Folder Layout</div>
        <div style={{ ...useFade(40, 15), fontSize: 22, color: C.text.secondary, lineHeight: 1.6, fontFamily: FONT.body }}>SKILL.md is required.{"\n"}Everything else is optional.</div>
      </div>
      <div style={{ flex: 1.1 }}>
        <Code delay={50} lines={[
          ".claude/skills/",
          "└── your-skill-name/",
          "    ├── SKILL.md",
          "    ├── scripts/",
          "    │   └── process_data.py",
          "    ├── references/",
          "    │   └── api-guide.md",
          "    └── assets/",
          "        └── report-template.md",
        ]} />
      </div>
    </div>
  </Scene>
);

// 6. PROGRESSIVE DISCLOSURE (270f/9s)
const Disclosure: React.FC = () => {
  const levels = [
    { t: "Level 1 — Frontmatter", d: "Name, description. Always in context.", del: 70, activeStart: 70, activeEnd: 190 },
    { t: "Level 2 — SKILL.md body", d: "Full instructions. When skill applies.", del: 180, activeStart: 190, activeEnd: 300 },
    { t: "Level 3 — Supporting files", d: "Deep docs, scripts. On demand.", del: 290, activeStart: 300, activeEnd: 420 },
  ];
  return (
    <Scene alt>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
        <Label text="Architecture" style={useFade(10, 10)} />
        <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 40px" }}>Progressive Disclosure</div>
        <div style={{ display: "flex", gap: 24 }}>
          {levels.map((l, i) => (
            <Card key={i} style={{ ...useFade(l.del, 15), flex: 1 }} activeStart={l.activeStart} activeEnd={l.activeEnd}>
              <div style={{ fontSize: 24, fontWeight: 600, fontFamily: FONT.display, color: C.text.primary, marginBottom: 10 }}>{l.t}</div>
              <div style={{ fontSize: 20, color: C.text.secondary, fontFamily: FONT.body, lineHeight: 1.5 }}>{l.d}</div>
            </Card>
          ))}
        </div>
      </div>
    </Scene>
  );
};

// 7. CONTEXT BUDGET (300f/10s)
const Context: React.FC = () => {
  const f = useCurrentFrame();
  const Bar: React.FC<{ label: string; tokens: string; pct: number; delay: number; warn?: boolean }> = ({ label, tokens, pct, delay, warn }) => {
    const s = useFade(delay, 12);
    const w = interpolate(f, [delay + 6, delay + 26], [0, pct], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return (
      <div style={{ ...s, marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 20, fontFamily: FONT.body }}>
          <span style={{ color: warn ? C.brand.primary : C.text.primary }}>{label}</span>
          <span style={{ color: C.text.muted }}>{tokens}</span>
        </div>
        <div style={{ height: 10, backgroundColor: C.border.subtle, borderRadius: RADIUS.sm }}>
          <div style={{ width: `${w}%`, height: "100%", backgroundColor: warn ? C.brand.primary : C.text.muted, borderRadius: RADIUS.sm }} />
        </div>
      </div>
    );
  };
  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
        <Label text="The Problem" style={useFade(10, 10)} />
        <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 8px" }}>Context is signal-to-noise</div>
        <div style={{ ...useFade(30, 15), fontSize: 22, color: C.text.muted, fontFamily: FONT.body, marginBottom: 32 }}>200K total. Here's how it's spent.</div>
        <div style={{ display: "flex", gap: 50 }}>
          <div style={{ flex: 1 }}>
            <Label text="Fixed overhead" style={{ ...useFade(40, 12), marginBottom: 14 }} />
            <Bar label="System" tokens="~2K" pct={10} delay={60} />
            <Bar label="Skill descriptors" tokens="~1-5K" pct={18} delay={90} />
            <Bar label="MCP definitions" tokens="~10-20K" pct={65} delay={120} warn />
          </div>
          <div style={{ flex: 1 }}>
            <Label text="Dynamic" style={{ ...useFade(150, 12), marginBottom: 14 }} />
            <Bar label="Conversation" tokens="" pct={90} delay={170} />
            <Bar label="Files" tokens="" pct={70} delay={195} />
            <Bar label="Tool results" tokens="" pct={50} delay={220} />
          </div>
        </div>
        <div style={{ ...useFade(260, 18), marginTop: 24, fontSize: 24, color: C.text.secondary, fontFamily: FONT.body }}>
          5 MCP servers × 20 tools = <span style={{ color: C.brand.primary, fontWeight: 600 }}>~25,000 tokens</span> before you type.
        </div>
      </div>
    </Scene>
  );
};

// 8. TIP 1 — UPDATED with 2 bad examples (210f/7s)
const Tip1: React.FC = () => (
  <Scene alt>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
      <Label text="Best Practice #1" style={{ ...useFade(10, 10), color: C.brand.primary }} />
      <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 14px" }}>Keep it to ~9 tokens</div>
      <div style={{ ...useFade(35, 16), fontSize: 24, color: C.text.secondary, fontFamily: FONT.body, marginBottom: 24, lineHeight: 1.5 }}>The description is a trigger signal, not a brochure. Concise and precise.</div>
      <Code delay={50} lines={[
        '# ✓ Good — 9 tokens, clear trigger',
        'description: "Use for PR reviews with focus on correctness."',
        '',
        '# ✗ Too vague — no trigger signal',
        'description: "Helps with the project."',
        '',
        '# ✗ Missing context — what kind? when?',
        'description: "Creates sophisticated multi-page documentation."',
      ]} />
    </div>
  </Scene>
);

// 9-11. TIPS 2-4
const TipScene: React.FC<{ label: string; title: string; desc: string; code: string[]; alt?: boolean }> = ({ label, title, desc, code, alt: a }) => (
  <Scene alt={a}>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 160px" }}>
      <Label text={label} style={{ ...useFade(10, 10), color: C.brand.primary }} />
      <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 14px" }}>{title}</div>
      <div style={{ ...useFade(40, 16), fontSize: 24, color: C.text.secondary, fontFamily: FONT.body, marginBottom: 30, lineHeight: 1.5, maxWidth: 850 }}>{desc}</div>
      <Code delay={70} lines={code} />
    </div>
  </Scene>
);
const Tip2: React.FC = () => <TipScene label="Best Practice #2" title="Lead with use cases" desc='First section answers: "When would I reach for this?"' code={['## When to use', '- Review pull requests for correctness', '- Audit code for security patterns', '', '## When NOT to use', '- Simple formatting (use hooks instead)']} />;
const Tip3: React.FC = () => <TipScene alt label="Best Practice #3" title="Explicit inputs and outputs" desc="What Claude receives → what it does → where results go." code={['Input:   PR diff from GitHub MCP', 'Process:', '  1. Check against security patterns', '  2. Flag unsafe blocks with line refs', '  3. Generate severity score', 'Output:  Review comment posted to PR']} />;
const Tip4: React.FC = () => <TipScene label="Best Practice #4" title="Include troubleshooting" desc="Skills fail predictably. A common issues section saves time." code={['## Common Issues', '', '### MCP Connection Failed', 'If "Connection refused":', '  1. Verify MCP server is running', '  2. Confirm API key is valid', '  3. Reconnect via Settings → Extensions']} />;

// 12. TWITTER SKILL INTRO — animated visual breakdown (270f/9s)
const TwitterIntro: React.FC = () => {
  const f = useCurrentFrame();
  // Animated task icons appearing one by one
  const tasks = [
    { icon: "🔍", label: "Search tweets", d: 80 },
    { icon: "📖", label: "Read timeline", d: 95 },
    { icon: "👤", label: "View profiles", d: 110 },
    { icon: "🔖", label: "Bookmarks", d: 125 },
    { icon: "🔗", label: "Tweet by URL", d: 140 },
    { icon: "📊", label: "User stats", d: 155 },
  ];
  // Animated counter for "6 tasks"
  const taskCount = Math.min(6, Math.max(0, Math.floor((f - 75) / 13)));
  // Three version badges sliding in
  const versions = [
    { label: "No Skill", sub: "baseline", color: C.text.muted, d: 175 },
    { label: "Full (346L)", sub: "all-in-one", color: C.brand.primary, d: 195 },
    { label: "Slim (78L)", sub: "progressive", color: C.brand.accent, d: 215 },
  ];

  return (
    <Scene alt>
      <div style={{ display: "flex", height: "100%", padding: "0 120px", gap: 60 }}>
        {/* Left: Skill identity */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Label text="Case Study" style={useFade(10, 10)} />
          <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 16px" }}>Twitter CLI Skill</div>
          <div style={{ ...useFade(35, 14), fontSize: 22, color: C.text.secondary, fontFamily: FONT.body, lineHeight: 1.6, marginBottom: 28 }}>
            Teaches Claude to use a command-line Twitter client for reading, searching, and managing tweets.
          </div>
          {/* Task grid */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {tasks.map((t, i) => {
              const s = useFade(t.d, 12);
              return (
                <div key={i} style={{ ...s, display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: `${C.text.secondary}08`, borderRadius: RADIUS.sm }}>
                  <span style={{ fontSize: 20 }}>{t.icon}</span>
                  <span style={{ fontSize: 18, color: C.text.secondary, fontFamily: FONT.body }}>{t.label}</span>
                </div>
              );
            })}
          </div>
          {/* Task counter */}
          <div style={{ ...useFade(75, 14), marginTop: 20, fontSize: 20, color: C.text.muted, fontFamily: FONT.body }}>
            <span style={{ fontSize: 28, fontWeight: 600, color: C.brand.primary, fontFamily: FONT.display }}>{taskCount}</span> tasks to evaluate
          </div>
        </div>

        {/* Right: Three versions */}
        <div style={{ flex: 0.8, display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          <div style={{ ...useFade(165, 14), fontSize: 20, color: C.text.muted, fontFamily: FONT.label, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8 }}>3 Versions Tested</div>
          {versions.map((v, i) => {
            const slideIn = interpolate(f, [v.d, v.d + 15], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const opacity = interpolate(f, [v.d, v.d + 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{ opacity, transform: `translateX(${slideIn}px)`, display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", backgroundColor: `${v.color}10`, border: `2px solid ${v.color}`, borderRadius: RADIUS.md }}>
                <div style={{ fontSize: 22, fontWeight: 600, color: v.color, fontFamily: FONT.display, minWidth: 120 }}>{v.label}</div>
                <div style={{ fontSize: 18, color: C.text.muted, fontFamily: FONT.body }}>{v.sub}</div>
              </div>
            );
          })}
          {/* Arrow pointing down to results */}
          <div style={{ ...useFade(235, 14), textAlign: "center", fontSize: 28, color: C.text.muted, marginTop: 8 }}>↓ same 6 tasks each</div>
        </div>
      </div>
    </Scene>
  );
};

// 13. EVALS.JSON (270f/9s) — with more context intro
const EvalsJson: React.FC = () => (
  <Scene>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
      <Label text="Testing Framework" style={useFade(10, 10)} />
      <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 14px" }}>Writing evals.json</div>
      <div style={{ ...useFade(40, 16), fontSize: 22, color: C.text.secondary, fontFamily: FONT.body, marginBottom: 24, lineHeight: 1.5 }}>
        To measure skill quality, we need repeatable tests. Each eval is a realistic user prompt with expected output.
      </div>
      <Code delay={60} lines={[
        "{",
        '  "skill_name": "twitter",',
        '  "evals": [',
        "    {",
        '      "id": 1,',
        '      "prompt": "Latest tweet from Elon Musk",',
        '      "expected_output": "Recent tweet with',
        '          content, timestamp, metrics"',
        "    },",
        '    { "id": 2, "prompt": "Search #AI" },',
        '    { "id": 3, "prompt": "Show bookmarks" },',
        '    { "id": 4, "prompt": "Anthropic profile" }',
        "  ]",
        "}",
      ]} />
    </div>
  </Scene>
);

// 14. EVAL RUNNER — SEQUENCE DIAGRAM (300f/10s)
const EvalRunner: React.FC = () => {
  const f = useCurrentFrame();
  const a1 = interpolate(f, [70, 85], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const a2 = interpolate(f, [120, 135], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const a3 = interpolate(f, [180, 195], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const Box: React.FC<{ label: string; sub?: string; color: string; style: React.CSSProperties }> = ({ label, sub, color, style: s }) => (
    <div style={{ ...s, padding: "16px 24px", backgroundColor: `${color}12`, border: `2px solid ${color}`, borderRadius: RADIUS.md, textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 600, color, fontFamily: FONT.display }}>{label}</div>
      {sub && <div style={{ fontSize: 16, color: C.text.muted, fontFamily: FONT.body, marginTop: 4 }}>{sub}</div>}
    </div>
  );
  const Arrow: React.FC<{ opacity: number; vertical?: boolean }> = ({ opacity, vertical }) => (
    <div style={{ fontSize: 28, color: C.text.muted, opacity, textAlign: "center", fontFamily: FONT.body }}>{vertical ? "↓" : "→"}</div>
  );
  return (
    <Scene alt>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 120px" }}>
        <Label text="Eval Runner" style={useFade(10, 10)} />
        <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 36px" }}>How the runner works</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 16 }}>
          <Box label="evals/evals.json" sub="6 test prompts" color={C.text.primary} style={useFade(50, 15)} />
          <Arrow opacity={a1} />
          <Box label="Eval Runner" sub="reads & orchestrates" color={C.brand.primary} style={useFade(65, 15)} />
        </div>
        <div style={{ textAlign: "center", marginBottom: 16 }}><Arrow opacity={a1} vertical /></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 16 }}>
          <Box label="No Skill" sub="baseline" color={C.text.muted} style={useFade(95, 15)} />
          <Box label="Full Skill" sub="346-line SKILL.md" color={C.brand.primary} style={useFade(105, 15)} />
          <Box label="Slim Skill" sub="78L + references/" color={C.brand.accent} style={useFade(115, 15)} />
        </div>
        <div style={{ textAlign: "center", marginBottom: 16 }}><Arrow opacity={a2} vertical /></div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 16 }}>
          <Box label="Subagent × 6" sub="fresh context each" color={C.text.secondary} style={useFade(140, 15)} />
          <Arrow opacity={a2} />
          <Box label="Runtime + Tokens + Pass/Fail" sub="per task metrics" color={C.brand.secondary} style={useFade(155, 15)} />
        </div>
        <div style={{ textAlign: "center", marginBottom: 16 }}><Arrow opacity={a3} vertical /></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Box label="results.json → Compare & Grade" sub="" color={C.brand.primary} style={useFade(185, 15)} />
        </div>
      </div>
    </Scene>
  );
};

// 15. 3-SCENARIO SETUP (240f/8s)
const ThreeScenarios: React.FC = () => (
  <Scene>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
      <Label text="Experiment" style={useFade(10, 10)} />
      <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 36px" }}>3 scenarios, 6 tasks each</div>
      <div style={{ display: "flex", gap: 24 }}>
        <Card style={{ ...useFade(50, 15), flex: 1 }} activeStart={50} activeEnd={140}>
          <div style={{ fontSize: 24, fontWeight: 600, fontFamily: FONT.display, color: C.text.primary, marginBottom: 8 }}>No Skill</div>
          <div style={{ fontSize: 20, color: C.text.secondary, fontFamily: FONT.body, lineHeight: 1.5 }}>Agent figures out commands from --help only. Pure baseline.</div>
        </Card>
        <Card style={{ ...useFade(130, 15), flex: 1 }} activeStart={140} activeEnd={240}>
          <div style={{ fontSize: 24, fontWeight: 600, fontFamily: FONT.display, color: C.brand.primary, marginBottom: 8 }}>Full Skill (346 lines)</div>
          <div style={{ fontSize: 20, color: C.text.secondary, fontFamily: FONT.body, lineHeight: 1.5 }}>Everything in one SKILL.md. Auth, commands, examples, all inline.</div>
        </Card>
        <Card style={{ ...useFade(230, 15), flex: 1 }} activeStart={240} activeEnd={360}>
          <div style={{ fontSize: 24, fontWeight: 600, fontFamily: FONT.display, color: C.brand.accent, marginBottom: 8 }}>Slim Skill (78 lines)</div>
          <div style={{ fontSize: 20, color: C.text.secondary, fontFamily: FONT.body, lineHeight: 1.5 }}>Lean SKILL.md + references/ for auth.md and commands.md.</div>
        </Card>
      </div>
    </div>
  </Scene>
);

// 16. SLIM SKILL VISUAL (270f/9s)
const SlimSkillVisual: React.FC = () => (
  <Scene alt>
    <div style={{ display: "flex", alignItems: "center", height: "100%", padding: "0 100px", gap: 40 }}>
      <div style={{ flex: 1 }}>
        <Label text="Full Skill — 346 lines" style={{ ...useFade(15, 12), color: C.brand.primary }} />
        <Code delay={30} lines={[
          "twitter-full/",
          "└── SKILL.md         ← 346 lines",
          "    (auth inline)",
          "    (all commands inline)",
          "    (examples inline)",
          "    (troubleshooting inline)",
          "",
          "Everything in one file.",
          "Always loaded. Always in context.",
        ]} />
      </div>
      <div style={{ ...useFade(80, 18), fontSize: 36, color: C.text.muted, alignSelf: "center" }}>vs</div>
      <div style={{ flex: 1 }}>
        <Label text="Slim Skill — 78 lines + refs" style={{ ...useFade(90, 12), color: C.brand.accent }} />
        <Code delay={100} lines={[
          "twitter-slim/",
          "├── SKILL.md         ← 78 lines",
          "│   (core commands only)",
          "│   (links to references/)",
          "└── references/",
          "    ├── auth.md      ← loaded if needed",
          "    └── commands.md  ← loaded if needed",
          "",
          "Lean core. Depth on demand.",
        ]} />
      </div>
    </div>
  </Scene>
);

// 17. RESULTS TABLE (360f/12s)
const Results: React.FC = () => {
  const tasks = [
    { task: "Search #AI (5 tweets)", no: { t: "1.9s" }, full: { t: "3.4s" }, slim: { t: "1.8s" }, d: 50 },
    { task: "Show bookmarks", no: { t: "5.2s" }, full: { t: "2.6s" }, slim: { t: "2.4s" }, d: 75 },
    { task: "Anthropic profile", no: { t: "1.5s" }, full: { t: "1.3s" }, slim: { t: "1.4s" }, d: 100 },
    { task: "Tweet by URL", no: { t: "5.8s" }, full: { t: "7.2s" }, slim: { t: "4.9s" }, d: 125 },
  ];
  const ColHeader: React.FC<{ icon: string; label: string; color: string; delay: number }> = ({ icon, label, color, delay }) => (
    <div style={{ ...useFade(delay, 12), flex: 1, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ fontSize: 28 }}>{icon}</div>
      <div style={{ ...TYPE.small, fontFamily: FONT.label, color, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700 }}>{label}</div>
    </div>
  );
  return (
    <Scene>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 100px" }}>
        <Label text="Real Results" style={useFade(10, 10)} />
        <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 24px" }}>Twitter Skill — 3-way comparison</div>
        <div style={{ ...useFade(28, 12), fontSize: 20, color: C.text.muted, fontFamily: FONT.body, marginBottom: 20 }}>Tasks where all 3 failed removed. 4 comparable results:</div>
        <div style={{ display: "flex", padding: "0 0 12px", borderBottom: `3px solid ${C.border.strong}`, alignItems: "flex-end" }}>
          <div style={{ flex: 2, ...TYPE.small, fontFamily: FONT.label, color: C.text.muted, textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, ...useFade(32, 12) }}>Task</div>
          <ColHeader icon="🤷" label="No Skill" color={C.text.muted} delay={36} />
          <ColHeader icon="📄" label="Full (346L)" color={C.brand.primary} delay={40} />
          <ColHeader icon="✂️" label="Slim (78L)" color={C.brand.accent} delay={44} />
        </div>
        {tasks.map((r, i) => {
          const s = useFade(r.d, 12);
          const times = [parseFloat(r.no.t), parseFloat(r.full.t), parseFloat(r.slim.t)];
          const minT = Math.min(...times);
          return (
            <div key={i} style={{ ...s, display: "flex", padding: "14px 0", borderBottom: `1px solid ${C.border.subtle}`, alignItems: "center" }}>
              <div style={{ flex: 2, fontSize: 22, color: C.text.primary, fontFamily: FONT.body }}>{r.task}</div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 22, fontFamily: FONT.body, color: parseFloat(r.no.t) === minT ? C.brand.primary : C.text.secondary, fontWeight: parseFloat(r.no.t) === minT ? 600 : 400 }}>{r.no.t}</div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 22, fontFamily: FONT.body, color: parseFloat(r.full.t) === minT ? C.brand.primary : C.text.secondary, fontWeight: parseFloat(r.full.t) === minT ? 600 : 400 }}>{r.full.t}</div>
              <div style={{ flex: 1, textAlign: "center", fontSize: 22, fontFamily: FONT.body, color: parseFloat(r.slim.t) === minT ? C.brand.primary : C.text.secondary, fontWeight: parseFloat(r.slim.t) === minT ? 600 : 400 }}>{r.slim.t}</div>
            </div>
          );
        })}
        <div style={{ ...useFade(160, 14), display: "flex", padding: "14px 0", borderTop: `3px solid ${C.border.strong}`, marginTop: 4 }}>
          <div style={{ flex: 2, fontSize: 20, fontWeight: 600, color: C.text.primary, fontFamily: FONT.body }}>Total</div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 20, fontFamily: FONT.body, color: C.text.muted }}>14.4s</div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 20, fontFamily: FONT.body, color: C.text.secondary }}>14.5s</div>
          <div style={{ flex: 1, textAlign: "center", fontSize: 20, fontFamily: FONT.body, color: C.brand.primary, fontWeight: 600 }}>10.5s ✂️</div>
        </div>
      </div>
    </Scene>
  );
};

// 18. ANALYSIS (300f/10s)
const Analysis: React.FC = () => (
  <Scene alt>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 160px" }}>
      <Label text="Analysis" style={useFade(10, 10)} />
      <div style={{ ...useFade(18, 18), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 36px" }}>What the data tells us</div>
      {[
        { t: "Full skill knew the right handle (@AnthropicAI)", d: 45, c: C.brand.primary },
        { t: "No-skill agent took longer — explored --help first", d: 80, c: C.text.primary },
        { t: "Slim skill was fastest on most tasks", d: 115, c: C.brand.accent },
        { t: "All three failed on suspended/ambiguous accounts", d: 150, c: C.text.muted },
        { t: "Progressive disclosure = best signal-to-noise", d: 185, c: C.brand.primary },
      ].map((it, i) => (
        <div key={i} style={{ ...useFade(it.d, 14), borderLeft: `3px solid ${it.c}`, paddingLeft: 24, marginBottom: 22 }}>
          <div style={{ fontSize: 26, color: C.text.primary, fontFamily: FONT.body, lineHeight: 1.4 }}>{it.t}</div>
        </div>
      ))}
    </div>
  </Scene>
);

// 19. KEY INSIGHT — BIGGER TEXT (240f/8s)
const DesignMatters: React.FC = () => (
  <Scene>
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 140px" }}>
      <Label text="Key Insight" style={useFade(10, 10)} />
      <div style={{ ...useFade(18, 18), fontSize: 48, lineHeight: 1.2, fontWeight: 600, fontFamily: FONT.display, color: C.text.primary, margin: "12px 0 24px" }}>
        Skill design matters more{"\n"}than skill existence
      </div>
      <div style={{ ...useFade(50, 16), fontSize: 28, color: C.text.secondary, fontFamily: FONT.body, lineHeight: 1.6, marginBottom: 32 }}>
        A 346-line all-in-one SKILL.md eats context budget.{"\n"}
        A 78-line lean SKILL.md + references/ gives Claude{"\n"}
        the right info at the right time.
      </div>
      <div style={{ ...useFade(100, 18), borderTop: `3px solid ${C.border.strong}`, borderBottom: `3px solid ${C.border.strong}`, padding: "24px 0" }}>
        <div style={{ fontSize: 34, color: C.text.primary, fontFamily: FONT.display, fontWeight: 600 }}>
          78 lines + progressive disclosure = <span style={{ color: C.brand.primary }}>faster, cheaper, smarter</span>
        </div>
      </div>
    </div>
  </Scene>
);

// 20. TAKEAWAY — BIGGER TEXT (240f/8s)
const Takeaway: React.FC = () => {
  const items = [
    { t: "Skills are methodology, not capability.", big: true },
    { t: "Keep SKILL.md lean — use references/ for depth.", big: true },
    { t: "MCP eats tokens silently.", big: false },
    { t: "Test with evals — 3 scenarios, real data.", big: false },
    { t: "Progressive disclosure wins.", big: true },
  ];
  return (
    <Scene alt>
      <Rings x={1580} y={-40} size={170} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 160px" }}>
        <div style={{ ...useFade(10, 18), fontSize: 52, fontWeight: 600, fontFamily: FONT.display, color: C.text.primary, marginBottom: 40 }}>TL;DR</div>
        {items.map((it, i) => (
          <div key={i} style={{ ...useFade(30 + i * 20, 14), fontSize: it.big ? 30 : 26, color: it.big ? C.text.primary : C.text.secondary, fontWeight: it.big ? 600 : 400, fontFamily: FONT.body, marginBottom: 18 }}>{it.t}</div>
        ))}
      </div>
    </Scene>
  );
};

// 21. OUTRO — updated (270f/9s)
const Outro: React.FC = () => (
  <Scene>
    <Rings x={80} y={80} size={140} />
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", padding: "0 180px" }}>
      <div style={{ ...useFade(15, 20), ...TYPE.h2, fontFamily: FONT.display, color: C.text.primary, marginBottom: 44 }}>Thanks for watching.</div>
      <div style={useFade(50, 18)}>
        <Label text="Twitter / X" />
        <div style={{ fontSize: 34, color: C.brand.primary, fontWeight: 600, fontFamily: FONT.display, marginTop: 8, marginBottom: 28 }}>@LabFromAbyss</div>
      </div>
      <div style={useFade(80, 18)}>
        <Label text="Bilibili" />
        <div style={{ fontSize: 34, color: C.brand.primary, fontWeight: 600, fontFamily: FONT.display, marginTop: 8, marginBottom: 28 }}>@LabFromAbyss</div>
      </div>
      <div style={{ ...useFade(110, 18), borderTop: `3px solid ${C.border.strong}`, paddingTop: 18, marginTop: 16 }}>
        <div style={{ fontSize: 22, fontFamily: FONT.display, color: C.text.secondary, letterSpacing: "0.05em" }}>
          Built with Remotion · <span style={{ color: C.brand.primary, fontWeight: 600 }}>LabFromAbyss</span>
        </div>
      </div>
    </div>
  </Scene>
);

// ════════════════════════════════════════════════════════════
// COMPOSITION — 21 scenes, 7350 frames = 245s
// ════════════════════════════════════════════════════════════
export const SkillVideoS08: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.bg.primary }}>
    {/* Audio baked in — synced to scene durations */}
    <Audio src={staticFile("voiceover.mp3")} volume={1} />
    <FontLoader />
    <Series>
      <Series.Sequence durationInFrames={240}><Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={540}><Primitives /></Series.Sequence>
      <Series.Sequence durationInFrames={390}><Wrong /></Series.Sequence>
      <Series.Sequence durationInFrames={360}><WhatIs /></Series.Sequence>
      <Series.Sequence durationInFrames={300}><Folder /></Series.Sequence>
      <Series.Sequence durationInFrames={480}><Disclosure /></Series.Sequence>
      <Series.Sequence durationInFrames={480}><Context /></Series.Sequence>
      <Series.Sequence durationInFrames={360}><Tip1 /></Series.Sequence>
      <Series.Sequence durationInFrames={420}><Tip2 /></Series.Sequence>
      <Series.Sequence durationInFrames={240}><Tip3 /></Series.Sequence>
      <Series.Sequence durationInFrames={240}><Tip4 /></Series.Sequence>
      <Series.Sequence durationInFrames={420}><TwitterIntro /></Series.Sequence>
      <Series.Sequence durationInFrames={390}><EvalsJson /></Series.Sequence>
      <Series.Sequence durationInFrames={360}><EvalRunner /></Series.Sequence>
      <Series.Sequence durationInFrames={360}><ThreeScenarios /></Series.Sequence>
      <Series.Sequence durationInFrames={420}><SlimSkillVisual /></Series.Sequence>
      <Series.Sequence durationInFrames={390}><Results /></Series.Sequence>
      <Series.Sequence durationInFrames={390}><Analysis /></Series.Sequence>
      <Series.Sequence durationInFrames={360}><DesignMatters /></Series.Sequence>
      <Series.Sequence durationInFrames={300}><Takeaway /></Series.Sequence>
      <Series.Sequence durationInFrames={210}><Outro /></Series.Sequence>
    </Series>
  </AbsoluteFill>
);
