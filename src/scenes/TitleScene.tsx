import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp, useTypewriter } from "../animations";

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const titleStyle = useFadeInUp(10, 25);
  const subtitleStyle = useFadeInUp(50, 25);
  const badgeStyle = useFadeInUp(90, 20);
  const subtitle = useTypewriter("How to build, test, and ship them", 60, 2);

  const lineWidth = interpolate(frame, [35, 70], [0, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Soft gradient orb
  const orbScale = interpolate(frame, [0, 120], [0.8, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* Decorative gradient orb */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primarySoft}, transparent 70%)`,
          top: "15%",
          right: "10%",
          transform: `scale(${orbScale})`,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.secondarySoft}, transparent 70%)`,
          bottom: "20%",
          left: "8%",
          transform: `scale(${orbScale})`,
          opacity: 0.5,
        }}
      />

      <div
        style={{
          ...titleStyle,
          fontSize: 96,
          fontWeight: 700,
          color: C.text,
          letterSpacing: -3,
          textAlign: "center",
        }}
      >
        Skill &{" "}
        <span style={{ color: C.primary }}>Skill Testing</span>
      </div>

      <div
        style={{
          width: lineWidth,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`,
          marginTop: 24,
          marginBottom: 24,
          borderRadius: 2,
        }}
      />

      <div
        style={{
          ...subtitleStyle,
          fontSize: 38,
          color: C.textMid,
          height: 48,
          letterSpacing: -0.5,
        }}
      >
        {subtitle}
        <span style={{ opacity: frame % 30 < 15 ? 1 : 0, color: C.primary }}>
          |
        </span>
      </div>

      <div
        style={{
          ...badgeStyle,
          marginTop: 48,
          padding: "12px 28px",
          backgroundColor: C.bgCard,
          borderRadius: 100,
          border: `1px solid ${C.border}`,
          fontSize: 22,
          color: C.textDim,
          boxShadow: `0 2px 12px ${C.shadow}`,
        }}
      >
        Claude Code · Skills Deep Dive
      </div>
    </AbsoluteFill>
  );
};
