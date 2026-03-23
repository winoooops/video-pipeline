import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

const Bar: React.FC<{
  label: string;
  tokens: string;
  pct: number;
  color: string;
  delay: number;
  alert?: boolean;
}> = ({ label, tokens, pct, color, delay, alert }) => {
  const frame = useCurrentFrame();
  const style = useFadeInUp(delay, 12);
  const w = interpolate(frame, [delay + 8, delay + 30], [0, pct], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ ...style, marginBottom: 18 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          fontSize: 22,
        }}
      >
        <span style={{ color: C.text }}>
          {label}
          {alert && (
            <span style={{ color: "#DC2626", marginLeft: 12, fontWeight: 600 }}>
              ← budget killer
            </span>
          )}
        </span>
        <span style={{ color: C.textDim }}>{tokens}</span>
      </div>
      <div
        style={{
          height: 20,
          backgroundColor: `${color}12`,
          borderRadius: 10,
        }}
      >
        <div
          style={{
            width: `${w}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 10,
          }}
        />
      </div>
    </div>
  );
};

export const ContextBudgetScene: React.FC = () => {
  const heading = useFadeInUp(0, 18);
  const badge = useFadeInUp(15, 15);
  const callout = useFadeInUp(160, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 120px",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 8 }}>
        <div
          style={{
            ...heading,
            fontSize: 56,
            fontWeight: 700,
            color: C.text,
            letterSpacing: -1,
          }}
        >
          Context is{" "}
          <span style={{ color: "#DC2626" }}>Signal-to-Noise</span>
        </div>
      </div>
      <div
        style={{
          ...badge,
          fontSize: 24,
          color: C.textDim,
          marginBottom: 40,
        }}
      >
        200K total · Here's how it's really spent
      </div>

      <div style={{ display: "flex", gap: 50 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 22,
              color: C.primary,
              fontWeight: 600,
              marginBottom: 16,
              ...useFadeInUp(25, 12),
            }}
          >
            Fixed Overhead (~15-20K)
          </div>
          <Bar label="System instructions" tokens="~2K" pct={10} color={C.textDim} delay={35} />
          <Bar label="Skill descriptors" tokens="~1-5K" pct={18} color={C.accent} delay={50} />
          <Bar label="MCP tool definitions" tokens="~10-20K" pct={65} color="#DC2626" delay={65} alert />
          <Bar label="LSP state" tokens="~2-5K" pct={18} color={C.textDim} delay={80} />
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 22,
              color: C.secondary,
              fontWeight: 600,
              marginBottom: 16,
              ...useFadeInUp(95, 12),
            }}
          >
            Dynamic (~160-180K)
          </div>
          <Bar label="Conversation history" tokens="" pct={90} color={C.secondary} delay={105} />
          <Bar label="File contents" tokens="" pct={70} color={C.primary} delay={120} />
          <Bar label="Tool call results" tokens="" pct={50} color={C.accent} delay={135} />
        </div>
      </div>

      <div
        style={{
          ...callout,
          marginTop: 30,
          padding: "20px 28px",
          backgroundColor: C.bgCard,
          borderRadius: 14,
          border: `1px solid #FECACA`,
          fontSize: 26,
          color: C.textMid,
          textAlign: "center",
        }}
      >
        5 MCP servers × 20-30 tools ={" "}
        <strong style={{ color: "#DC2626" }}>~25,000 tokens</strong> before
        you type a single message
      </div>
    </AbsoluteFill>
  );
};
