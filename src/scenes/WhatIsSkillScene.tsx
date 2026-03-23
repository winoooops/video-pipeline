import { AbsoluteFill } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

export const WhatIsSkillScene: React.FC = () => {
  const h1 = useFadeInUp(0, 20);
  const p1 = useFadeInUp(20, 20);
  const p2 = useFadeInUp(50, 20);
  const card = useFadeInUp(80, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 160px",
      }}
    >
      <div
        style={{
          ...h1,
          fontSize: 72,
          fontWeight: 700,
          color: C.text,
          marginBottom: 40,
          letterSpacing: -2,
        }}
      >
        What Is a{" "}
        <span style={{ color: C.primary }}>Skill</span>?
      </div>

      <div
        style={{
          ...p1,
          fontSize: 36,
          color: C.textMid,
          lineHeight: 1.6,
          marginBottom: 24,
          maxWidth: 1200,
        }}
      >
        A Skill is a <strong style={{ color: C.text }}>folder</strong>.
      </div>

      <div
        style={{
          ...p2,
          fontSize: 32,
          color: C.textMid,
          lineHeight: 1.6,
          marginBottom: 40,
          maxWidth: 1200,
        }}
      >
        <span style={{ color: C.primary, fontWeight: 600 }}>SKILL.md</span> is
        its core — everything else is a{" "}
        <strong style={{ color: C.text }}>supporting file</strong>.
      </div>

      <div
        style={{
          ...card,
          padding: "28px 36px",
          backgroundColor: C.bgCard,
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          boxShadow: `0 4px 24px ${C.shadow}`,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            fontSize: 26,
            color: C.textDim,
            lineHeight: 1.6,
            borderLeft: `3px solid ${C.primary}`,
            paddingLeft: 20,
          }}
        >
          Tools alone don't make Claude better at your specific problem.
          Skills tell Claude <span style={{ color: C.primary, fontWeight: 600 }}>when</span> to
          use something and <span style={{ color: C.primary, fontWeight: 600 }}>how</span> to
          do it well.
        </div>
      </div>
    </AbsoluteFill>
  );
};
