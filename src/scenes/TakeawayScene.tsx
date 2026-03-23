import { AbsoluteFill } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

const Item: React.FC<{ icon: string; text: string; delay: number }> = ({
  icon,
  text,
  delay,
}) => {
  const style = useFadeInUp(delay, 15);
  return (
    <div
      style={{
        ...style,
        display: "flex",
        gap: 20,
        alignItems: "center",
        marginBottom: 28,
      }}
    >
      <div
        style={{
          fontSize: 36,
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: C.bgCard,
          borderRadius: 16,
          border: `1px solid ${C.border}`,
          boxShadow: `0 2px 8px ${C.shadow}`,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: 30, color: C.text, lineHeight: 1.4 }}>
        {text}
      </div>
    </div>
  );
};

export const TakeawayScene: React.FC = () => {
  const heading = useFadeInUp(0, 18);

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
          ...heading,
          fontSize: 64,
          fontWeight: 700,
          color: C.text,
          marginBottom: 48,
          letterSpacing: -2,
        }}
      >
        TL;DR
      </div>

      <Item icon="🧠" text="Skills are methodology, not capability." delay={20} />
      <Item icon="✂️" text="Keep SKILL.md lean. 9-token description." delay={45} />
      <Item icon="📊" text="Context is signal-to-noise. MCP eats tokens silently." delay={70} />
      <Item icon="🧪" text="Test with evals — intuition isn't measurement." delay={95} />
      <Item
        icon="🎯"
        text="Make Claude genuinely better at specific things."
        delay={120}
      />
    </AbsoluteFill>
  );
};
