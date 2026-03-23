import { AbsoluteFill } from "remotion";
import { COLORS, FONTS, useFadeInUp } from "../components/shared";

const Tip: React.FC<{
  number: string;
  title: string;
  detail: string;
  delay: number;
  color: string;
}> = ({ number, title, detail, delay, color }) => {
  const style = useFadeInUp(delay, 12);
  return (
    <div
      style={{
        ...style,
        display: "flex",
        gap: 20,
        marginBottom: 20,
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          backgroundColor: `${color}20`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 800,
          color,
          flexShrink: 0,
        }}
      >
        {number}
      </div>
      <div>
        <div style={{ fontSize: 26, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>
          {title}
        </div>
        <div style={{ fontSize: 20, color: COLORS.textDim, lineHeight: 1.4 }}>
          {detail}
        </div>
      </div>
    </div>
  );
};

export const WritingTipsScene: React.FC = () => {
  const headingStyle = useFadeInUp(0, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: FONTS.heading,
        padding: 80,
      }}
    >
      <div
        style={{
          ...headingStyle,
          fontSize: 56,
          fontWeight: 700,
          color: COLORS.text,
          marginBottom: 40,
        }}
      >
        Writing the <span style={{ color: COLORS.success }}>Skill</span>
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <Tip number="1" title="Minimal description (~9 tokens)" detail='Clear trigger signal, not a brochure. "Use for PR reviews with focus on correctness."' delay={30} color={COLORS.primary} />
          <Tip number="2" title="Lead with use cases" detail="First section: when would I reach for this? In user language." delay={70} color={COLORS.primary} />
          <Tip number="3" title='Verb-noun folder naming' detail='self-explanatory names. Avoid "helper", "utils" — no trigger signal.' delay={110} color={COLORS.primary} />
          <Tip number="4" title="No README.md" detail="Everything in SKILL.md or subdirectories. README is for humans, not Claude." delay={150} color={COLORS.primary} />
        </div>
        <div style={{ flex: 1 }}>
          <Tip number="5" title="Explicit inputs & outputs" detail="State what Claude receives, what it does, where results go." delay={190} color={COLORS.secondary} />
          <Tip number="6" title="Troubleshooting section" detail="Skills fail predictably. A Common Issues section saves back-and-forth." delay={230} color={COLORS.secondary} />
          <Tip number="7" title="References in supporting files" detail="Long examples, API docs → references/. Don't break Progressive Disclosure." delay={270} color={COLORS.secondary} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
