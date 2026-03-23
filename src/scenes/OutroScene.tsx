import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp, useScaleIn } from "../animations";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useFadeInUp(0, 20);
  const sub = useFadeInUp(20, 18);
  const card1 = useScaleIn(40, 20);
  const card2 = useScaleIn(60, 20);
  const cta = useFadeInUp(90, 20);
  const credits = useFadeInUp(130, 18);

  // Pulsing subscribe button
  const pulseScale = interpolate(
    frame % 60,
    [0, 15, 30, 45, 60],
    [1, 1.04, 1, 1.02, 1]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Decorative orbs */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.primarySoft}, transparent 70%)`,
          top: "5%",
          left: "5%",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.secondarySoft}, transparent 70%)`,
          bottom: "10%",
          right: "8%",
          opacity: 0.4,
        }}
      />

      <div
        style={{
          ...heading,
          fontSize: 60,
          fontWeight: 700,
          color: C.text,
          marginBottom: 12,
          letterSpacing: -2,
        }}
      >
        Thanks for watching! 🙏
      </div>

      <div
        style={{
          ...sub,
          fontSize: 28,
          color: C.textDim,
          marginBottom: 50,
        }}
      >
        Like, subscribe, and follow for more Claude Code deep dives
      </div>

      {/* Social cards */}
      <div style={{ display: "flex", gap: 30, marginBottom: 40 }}>
        {/* Twitter/X */}
        <div
          style={{
            ...card1,
            backgroundColor: C.bgCard,
            borderRadius: 20,
            padding: "32px 48px",
            border: `1px solid ${C.border}`,
            boxShadow: `0 4px 24px ${C.shadow}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            minWidth: 360,
          }}
        >
          <div style={{ fontSize: 48 }}>𝕏</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.text }}>
            @LabFromAbyss
          </div>
          <div style={{ fontSize: 20, color: C.textDim }}>
            x.com/LabFromAbyss
          </div>
        </div>

        {/* Bilibili */}
        <div
          style={{
            ...card2,
            backgroundColor: C.bgCard,
            borderRadius: 20,
            padding: "32px 48px",
            border: `1px solid ${C.border}`,
            boxShadow: `0 4px 24px ${C.shadow}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            minWidth: 360,
          }}
        >
          <div style={{ fontSize: 48 }}>📺</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.text }}>
            Bilibili
          </div>
          <div style={{ fontSize: 20, color: C.textDim }}>
            space.bilibili.com/3546375784499880
          </div>
        </div>
      </div>

      {/* Subscribe button */}
      <div
        style={{
          ...cta,
          transform: `scale(${pulseScale})`,
          padding: "18px 60px",
          backgroundColor: "#DC2626",
          borderRadius: 100,
          fontSize: 28,
          fontWeight: 700,
          color: "#FFFFFF",
          letterSpacing: 1,
          boxShadow: "0 4px 20px rgba(220,38,38,0.3)",
        }}
      >
        SUBSCRIBE
      </div>

      {/* Credits */}
      <div
        style={{
          ...credits,
          position: "absolute",
          bottom: 40,
          fontSize: 20,
          color: C.textDim,
        }}
      >
        Built with Remotion · winoooops & Claw · Ithaqua 🌬️
      </div>
    </AbsoluteFill>
  );
};
