import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

export const WrongApproachScene: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useFadeInUp(0, 18);
  const wrong = useFadeInUp(25, 18);
  const right = useFadeInUp(70, 18);
  const arrow = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 120px",
      }}
    >
      <div style={{
        ...heading, fontSize: 52, fontWeight: 700, color: C.text,
        marginBottom: 60, textAlign: "center", letterSpacing: -1,
      }}>
        The First Instinct is <span style={{ color: "#DC2626" }}>Wrong</span>
      </div>

      <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
        {/* Wrong */}
        <div style={{
          ...wrong, flex: 1, backgroundColor: C.bgCard, borderRadius: 20,
          padding: "40px 36px", border: `2px solid #FECACA`,
          boxShadow: `0 4px 24px ${C.shadow}`,
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔌</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#DC2626", marginBottom: 12 }}>
            More MCP Tools
          </div>
          <div style={{ fontSize: 24, color: C.textDim, lineHeight: 1.5 }}>
            More tools, more access, more APIs.{"\n"}
            Expands what Claude <em>can</em> do —{"\n"}
            but not what it <em>should</em> do.
          </div>
        </div>

        {/* Arrow */}
        <div style={{ fontSize: 60, color: C.primary, opacity: arrow }}>→</div>

        {/* Right */}
        <div style={{
          ...right, flex: 1, backgroundColor: C.bgCard, borderRadius: 20,
          padding: "40px 36px", border: `2px solid ${C.accentSoft}`,
          borderColor: C.accent, boxShadow: `0 4px 24px ${C.shadow}`,
        }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🧠</div>
          <div style={{ fontSize: 30, fontWeight: 700, color: C.accent, marginBottom: 12 }}>
            Skills = Methodology
          </div>
          <div style={{ fontSize: 24, color: C.textDim, lineHeight: 1.5 }}>
            Tell Claude <strong style={{ color: C.text }}>when</strong> to use something{"\n"}
            and <strong style={{ color: C.text }}>how</strong> to do it well.{"\n"}
            That's what Skills are for.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
