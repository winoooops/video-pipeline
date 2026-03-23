import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp, useTypewriter } from "../animations";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const titleLine1 = useFadeInUp(10, 25);
  const titleLine2 = useFadeInUp(30, 25);
  const stat = useFadeInUp(80, 20);
  const subtitle = useTypewriter("here's how to improve it", 100, 2);

  const lineWidth = interpolate(frame, [55, 85], [0, 700], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative orbs
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
      {/* Decorative orbs */}
      <div style={{
        position: "absolute", width: 500, height: 500, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primarySoft}, transparent 70%)`,
        top: "10%", right: "8%", transform: `scale(${orbScale})`, opacity: 0.5,
      }} />
      <div style={{
        position: "absolute", width: 350, height: 350, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.secondarySoft}, transparent 70%)`,
        bottom: "15%", left: "5%", transform: `scale(${orbScale})`, opacity: 0.4,
      }} />

      {/* Title line 1 */}
      <div style={{
        ...titleLine1, fontSize: 72, fontWeight: 700, color: C.text,
        letterSpacing: -2, textAlign: "center", maxWidth: 1400,
      }}>
        Most people's Skills actually make
      </div>

      {/* Title line 2 - emphasis */}
      <div style={{
        ...titleLine2, fontSize: 88, fontWeight: 700,
        letterSpacing: -3, textAlign: "center",
      }}>
        Claude <span style={{ color: "#DC2626" }}>dumber</span>
      </div>

      {/* Divider */}
      <div style={{
        width: lineWidth, height: 3, marginTop: 28, marginBottom: 28,
        background: `linear-gradient(90deg, transparent, ${C.primary}, transparent)`,
        borderRadius: 2,
      }} />

      {/* Subtitle with typewriter */}
      <div style={{
        ...stat, fontSize: 40, color: C.textMid, height: 50,
        textAlign: "center",
      }}>
        {subtitle}
        <span style={{ opacity: frame % 30 < 15 ? 1 : 0, color: C.primary }}>|</span>
      </div>
    </AbsoluteFill>
  );
};
