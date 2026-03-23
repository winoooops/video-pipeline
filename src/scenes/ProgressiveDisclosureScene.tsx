import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

const Level: React.FC<{
  num: string;
  title: string;
  what: string;
  when: string;
  color: string;
  delay: number;
}> = ({ num, title, what, when, color, delay }) => {
  const frame = useCurrentFrame();
  const style = useFadeInUp(delay, 18);
  const barWidth = interpolate(frame, [delay + 18, delay + 50], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        ...style,
        backgroundColor: C.bgCard,
        borderRadius: 20,
        padding: "32px 36px",
        border: `1px solid ${C.border}`,
        boxShadow: `0 2px 16px ${C.shadow}`,
        flex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 700,
            color,
          }}
        >
          {num}
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: C.text }}>
          {title}
        </div>
      </div>
      <div style={{ fontSize: 24, color: C.textMid, marginBottom: 8 }}>
        {what}
      </div>
      <div style={{ fontSize: 20, color: C.textDim, marginBottom: 16 }}>
        {when}
      </div>
      <div
        style={{
          height: 6,
          backgroundColor: `${color}15`,
          borderRadius: 3,
        }}
      >
        <div
          style={{
            width: `${barWidth}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: 3,
          }}
        />
      </div>
    </div>
  );
};

export const ProgressiveDisclosureScene: React.FC = () => {
  const heading = useFadeInUp(0, 20);
  const sub = useFadeInUp(15, 18);

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
          fontSize: 64,
          fontWeight: 700,
          color: C.text,
          marginBottom: 12,
          letterSpacing: -2,
        }}
      >
        Progressive{" "}
        <span style={{ color: C.secondary }}>Disclosure</span>
      </div>
      <div
        style={{
          ...sub,
          fontSize: 28,
          color: C.textDim,
          marginBottom: 50,
        }}
      >
        Only the right information enters context at the right time
      </div>

      <div style={{ display: "flex", gap: 24 }}>
        <Level
          num="1"
          title="YAML Frontmatter"
          what="Name, description, tags"
          when="Every session — always in context"
          color={C.accent}
          delay={30}
        />
        <Level
          num="2"
          title="SKILL.md Body"
          what="Instructions, workflow, examples"
          when="When Claude decides this skill applies"
          color={C.primary}
          delay={60}
        />
        <Level
          num="3"
          title="Supporting Files"
          what="Deep docs, scripts, references"
          when="On demand — explicitly referenced"
          color={C.secondary}
          delay={90}
        />
      </div>
    </AbsoluteFill>
  );
};
