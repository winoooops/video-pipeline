import { AbsoluteFill } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

export const Tip2Scene: React.FC = () => {
  const label = useFadeInUp(0, 15);
  const heading = useFadeInUp(10, 18);
  const desc = useFadeInUp(30, 18);
  const code = useFadeInUp(55, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 140px",
      }}
    >
      <div
        style={{
          ...label,
          fontSize: 22,
          fontWeight: 600,
          color: C.secondary,
          textTransform: "uppercase",
          letterSpacing: 3,
          marginBottom: 12,
        }}
      >
        Best Practice #2
      </div>
      <div
        style={{
          ...heading,
          fontSize: 56,
          fontWeight: 700,
          color: C.text,
          marginBottom: 20,
          letterSpacing: -1,
        }}
      >
        Lead with Use Cases
      </div>
      <div
        style={{
          ...desc,
          fontSize: 30,
          color: C.textDim,
          marginBottom: 40,
          maxWidth: 1100,
          lineHeight: 1.5,
        }}
      >
        First section of SKILL.md answers:{" "}
        <span style={{ color: C.text, fontWeight: 600 }}>
          "When would I reach for this?"
        </span>
      </div>

      {/* Code example */}
      <div
        style={{
          ...code,
          backgroundColor: C.bgCode,
          borderRadius: 16,
          padding: "32px 36px",
          boxShadow: `0 4px 20px rgba(0,0,0,0.12)`,
          fontSize: 26,
          lineHeight: 1.7,
        }}
      >
        <div style={{ color: C.codeComment }}>## When to use</div>
        <div style={{ color: C.codeText, marginTop: 8 }}>
          Use this skill when you need to:
        </div>
        <div style={{ color: C.codeString, marginTop: 4 }}>
          {"  "}- Review pull requests for correctness
        </div>
        <div style={{ color: C.codeString }}>
          {"  "}- Audit code for security patterns
        </div>
        <div style={{ color: C.codeString }}>
          {"  "}- Check Rust code for unsafe blocks
        </div>
        <div style={{ color: C.codeComment, marginTop: 16 }}>
          ## When NOT to use
        </div>
        <div style={{ color: "#F38BA8", marginTop: 4 }}>
          {"  "}- Simple formatting or linting (use hooks)
        </div>
      </div>
    </AbsoluteFill>
  );
};
