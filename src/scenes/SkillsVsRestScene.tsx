import { AbsoluteFill } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

const Card: React.FC<{
  icon: string;
  title: string;
  role: string;
  color: string;
  delay: number;
}> = ({ icon, title, role, color, delay }) => {
  const style = useFadeInUp(delay, 15);
  return (
    <div
      style={{
        ...style,
        backgroundColor: C.bgCard,
        borderRadius: 20,
        padding: "36px 32px",
        border: `1px solid ${C.border}`,
        boxShadow: `0 4px 24px ${C.shadow}`,
        flex: 1,
        borderTop: `3px solid ${color}`,
      }}
    >
      <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
      <div
        style={{ fontSize: 30, fontWeight: 700, color: C.text, marginBottom: 10 }}
      >
        {title}
      </div>
      <div style={{ fontSize: 22, color: C.textDim, lineHeight: 1.5 }}>
        {role}
      </div>
    </div>
  );
};

export const SkillsVsRestScene: React.FC = () => {
  const heading = useFadeInUp(0, 18);
  const quote = useFadeInUp(130, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 100px",
      }}
    >
      <div
        style={{
          ...heading,
          fontSize: 60,
          fontWeight: 700,
          color: C.text,
          marginBottom: 44,
          letterSpacing: -2,
        }}
      >
        Skills vs <span style={{ color: C.secondary }}>Everything Else</span>
      </div>

      <div style={{ display: "flex", gap: 20, marginBottom: 36 }}>
        <Card icon="🔌" title="MCP" role="Abilities — what Claude can do" color="#DC2626" delay={20} />
        <Card icon="🧠" title="Skills" role="Methodology — when & how" color={C.primary} delay={45} />
        <Card icon="🔄" title="Subagents" role="Isolation — clean slate" color={C.accent} delay={70} />
        <Card icon="⚡" title="Hooks" role="Deterministic — no context" color={C.secondary} delay={95} />
      </div>

      <div
        style={{
          ...quote,
          padding: "24px 36px",
          backgroundColor: C.bgCard,
          borderRadius: 16,
          borderLeft: `4px solid ${C.primary}`,
          fontSize: 28,
          color: C.textMid,
          fontStyle: "italic",
          boxShadow: `0 2px 12px ${C.shadow}`,
        }}
      >
        MCP tells Claude <strong>what</strong> it can do. Skills tell Claude{" "}
        <strong style={{ color: C.primary }}>when</strong> to use which tool.
      </div>
    </AbsoluteFill>
  );
};
