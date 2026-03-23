import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

const FolderLine: React.FC<{
  text: string;
  indent: number;
  color: string;
  delay: number;
  highlight?: boolean;
}> = ({ text, indent, color, delay, highlight }) => {
  const frame = useCurrentFrame();
  const style = useFadeInUp(delay, 10);
  const glowOpacity = highlight
    ? interpolate(frame, [delay + 20, delay + 35], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;

  return (
    <div
      style={{
        ...style,
        position: "relative",
        paddingLeft: indent * 36 + 24,
        fontSize: 30,
        color,
        marginBottom: 6,
        lineHeight: 1.8,
      }}
    >
      {highlight && (
        <div
          style={{
            position: "absolute",
            left: indent * 36,
            right: 0,
            top: -2,
            bottom: -2,
            borderRadius: 8,
            backgroundColor: `${C.primary}12`,
            border: `1.5px solid ${C.primary}40`,
            opacity: glowOpacity,
          }}
        />
      )}
      {text}
    </div>
  );
};

export const FolderStructureScene: React.FC = () => {
  const heading = useFadeInUp(0, 18);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "0 120px",
        gap: 80,
      }}
    >
      {/* Left label */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            ...heading,
            fontSize: 52,
            fontWeight: 700,
            color: C.text,
            marginBottom: 24,
            letterSpacing: -1,
          }}
        >
          Folder Structure
        </div>
        <div
          style={{
            ...useFadeInUp(20, 18),
            fontSize: 28,
            color: C.textDim,
            lineHeight: 1.6,
          }}
        >
          SKILL.md is required.{"\n"}Everything else is optional — scripts, references, assets.
        </div>
      </div>

      {/* Right: code card */}
      <div
        style={{
          flex: 1.2,
          backgroundColor: C.bgCode,
          borderRadius: 20,
          padding: "36px 24px",
          boxShadow: `0 8px 40px rgba(0,0,0,0.15)`,
        }}
      >
        <FolderLine text=".claude/skills/" indent={0} color={C.codeComment} delay={15} />
        <FolderLine text="└── your-skill-name/" indent={0} color={C.codeFunc} delay={25} />
        <FolderLine text="    ├── SKILL.md" indent={1} color={C.codeString} delay={40} highlight />
        <FolderLine text="    ├── scripts/" indent={1} color={C.codeKeyword} delay={55} />
        <FolderLine text="    │   ├── process_data.py" indent={1} color={C.codeText} delay={65} />
        <FolderLine text="    │   └── validate.sh" indent={1} color={C.codeText} delay={75} />
        <FolderLine text="    ├── references/" indent={1} color={C.codeKeyword} delay={90} />
        <FolderLine text="    │   └── api-guide.md" indent={1} color={C.codeText} delay={100} />
        <FolderLine text="    └── assets/" indent={1} color={C.codeKeyword} delay={115} />
        <FolderLine text="        └── report-template.md" indent={1} color={C.codeText} delay={125} />
      </div>
    </AbsoluteFill>
  );
};
