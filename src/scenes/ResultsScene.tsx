import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

const Row: React.FC<{
  task: string;
  withT: string;
  withoutT: string;
  winner: "with" | "without";
  delay: number;
}> = ({ task, withT, withoutT, winner, delay }) => {
  const style = useFadeInUp(delay, 10);
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        padding: "14px 24px",
        marginBottom: 8,
        borderRadius: 12,
        backgroundColor: C.bgCard,
        border: `1px solid ${C.border}`,
      }}
    >
      <div style={{ flex: 2.5, fontSize: 24, color: C.text }}>{task}</div>
      <div
        style={{
          flex: 1,
          fontSize: 24,
          textAlign: "center",
          color: winner === "with" ? C.accent : C.textDim,
          fontWeight: winner === "with" ? 700 : 400,
          backgroundColor: winner === "with" ? C.accentSoft : "transparent",
          padding: "4px 12px",
          borderRadius: 8,
        }}
      >
        {withT}
      </div>
      <div
        style={{
          flex: 1,
          fontSize: 24,
          textAlign: "center",
          color: winner === "without" ? "#DC2626" : C.textDim,
          fontWeight: winner === "without" ? 700 : 400,
        }}
      >
        {withoutT}
      </div>
      <div style={{ width: 40, textAlign: "center", fontSize: 24 }}>
        {winner === "with" ? "✅" : "❌"}
      </div>
    </div>
  );
};

export const ResultsScene: React.FC = () => {
  const heading = useFadeInUp(0, 18);
  const insight = useFadeInUp(150, 20);

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
      <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 30 }}>
        <div
          style={{
            ...heading,
            fontSize: 52,
            fontWeight: 700,
            color: C.text,
            letterSpacing: -1,
          }}
        >
          Results: <span style={{ color: C.primary }}>Twitter Skill</span>
        </div>
        <div
          style={{
            ...useFadeInUp(10, 15),
            fontSize: 40,
            fontWeight: 800,
            color: C.primary,
          }}
        >
          B+
        </div>
      </div>

      {/* Header */}
      <div
        style={{
          display: "flex",
          padding: "8px 24px",
          marginBottom: 8,
          fontSize: 18,
          fontWeight: 600,
          color: C.textDim,
          ...useFadeInUp(15, 12),
        }}
      >
        <div style={{ flex: 2.5 }}>Task</div>
        <div style={{ flex: 1, textAlign: "center" }}>With Skill</div>
        <div style={{ flex: 1, textAlign: "center" }}>Without</div>
        <div style={{ width: 40 }} />
      </div>

      <Row task="Search #AI tweets" withT="2m17s" withoutT="11m" winner="with" delay={30} />
      <Row task="Anthropic profile" withT="17s" withoutT="1m" winner="with" delay={50} />
      <Row task="Latest tweet" withT="1m44s" withoutT="48s" winner="without" delay={70} />
      <Row task="Show bookmarks" withT="27s" withoutT="20s" winner="without" delay={90} />
      <Row task="User timeline" withT="44s" withoutT="26s" winner="without" delay={110} />

      <div
        style={{
          ...insight,
          marginTop: 28,
          padding: "20px 28px",
          backgroundColor: C.primarySoft,
          borderRadius: 14,
          fontSize: 26,
          color: C.textMid,
          textAlign: "center",
          border: `1px solid ${C.primary}30`,
        }}
      >
        Skills aren't always faster. The question:{" "}
        <strong style={{ color: C.primary }}>
          "Does it help here?"
        </strong>
      </div>
    </AbsoluteFill>
  );
};
