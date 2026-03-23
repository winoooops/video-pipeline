import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

export const TestingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useFadeInUp(0, 18);
  const desc = useFadeInUp(15, 18);

  const step1 = useFadeInUp(40, 15);
  const arrow1Op = interpolate(frame, [65, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const step2a = useFadeInUp(80, 15);
  const step2b = useFadeInUp(100, 15);
  const arrow2Op = interpolate(frame, [125, 140], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const step3 = useFadeInUp(140, 15);

  const Box: React.FC<{
    label: string;
    color: string;
    style: React.CSSProperties;
  }> = ({ label, color, style: s }) => (
    <div
      style={{
        ...s,
        padding: "20px 28px",
        backgroundColor: C.bgCard,
        borderRadius: 14,
        border: `2px solid ${color}`,
        fontSize: 24,
        fontWeight: 600,
        color,
        boxShadow: `0 2px 12px ${C.shadow}`,
        textAlign: "center",
      }}
    >
      {label}
    </div>
  );

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
      <div
        style={{
          ...heading,
          fontSize: 60,
          fontWeight: 700,
          color: C.text,
          marginBottom: 10,
          letterSpacing: -2,
        }}
      >
        Testing with <span style={{ color: C.primary }}>Evals</span>
      </div>
      <div
        style={{
          ...desc,
          fontSize: 28,
          color: C.textDim,
          marginBottom: 50,
        }}
      >
        Every test runs twice — with skill & without. Fresh subagent each time.
      </div>

      {/* Flow */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
        }}
      >
        <Box label="📋 evals.json" color={C.primary} style={step1} />

        <div style={{ fontSize: 36, color: C.textDim, opacity: arrow1Op }}>→</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Box label="🧠 With Skill" color={C.accent} style={step2a} />
          <Box label="🚫 Without Skill" color="#DC2626" style={step2b} />
        </div>

        <div style={{ fontSize: 36, color: C.textDim, opacity: arrow2Op }}>→</div>

        <Box label="📊 Compare → results.json" color={C.secondary} style={step3} />
      </div>

      {/* Note */}
      <div
        style={{
          marginTop: 40,
          fontSize: 22,
          color: C.textDim,
          textAlign: "center",
          ...useFadeInUp(165, 18),
        }}
      >
        Workspace goes <strong style={{ color: C.text }}>outside</strong> the
        skill directory — eval output shouldn't enter context
      </div>
    </AbsoluteFill>
  );
};
