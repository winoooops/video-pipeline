import { AbsoluteFill } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

export const Tip1Scene: React.FC = () => {
  const heading = useFadeInUp(0, 18);
  const sub = useFadeInUp(15, 15);
  const good = useFadeInUp(40, 18);
  const bad = useFadeInUp(80, 18);

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
          ...heading,
          fontSize: 22,
          fontWeight: 600,
          color: C.primary,
          textTransform: "uppercase",
          letterSpacing: 3,
          marginBottom: 12,
        }}
      >
        Best Practice #1
      </div>
      <div
        style={{
          ...sub,
          fontSize: 56,
          fontWeight: 700,
          color: C.text,
          marginBottom: 48,
          letterSpacing: -1,
        }}
      >
        Minimal Description, Clear Trigger
      </div>

      {/* Good example */}
      <div
        style={{
          ...good,
          backgroundColor: C.bgCode,
          borderRadius: 16,
          padding: "28px 32px",
          marginBottom: 20,
          boxShadow: `0 4px 20px rgba(0,0,0,0.12)`,
        }}
      >
        <div style={{ fontSize: 18, color: C.codeComment, marginBottom: 10 }}>
          # ✅ Works (~9 tokens)
        </div>
        <div style={{ fontSize: 28, color: C.codeText }}>
          <span style={{ color: C.codeKeyword }}>description</span>
          <span style={{ color: C.codeText }}>: </span>
          <span style={{ color: C.codeString }}>
            "Use for PR reviews with focus on correctness."
          </span>
        </div>
      </div>

      {/* Bad example */}
      <div
        style={{
          ...bad,
          backgroundColor: C.bgCode,
          borderRadius: 16,
          padding: "28px 32px",
          boxShadow: `0 4px 20px rgba(0,0,0,0.12)`,
        }}
      >
        <div style={{ fontSize: 18, color: C.codeComment, marginBottom: 10 }}>
          # ❌ Doesn't work (~45 tokens, reads like a brochure)
        </div>
        <div style={{ fontSize: 24, color: C.codeText, lineHeight: 1.5 }}>
          <span style={{ color: C.codeKeyword }}>description</span>
          <span style={{ color: C.codeText }}>: </span>
          <span style={{ color: "#F38BA8" }}>
            "This skill helps you review code changes in Rust{"\n"}
            {"  "}projects. It checks for common issues like unsafe{"\n"}
            {"  "}code, error handling..."
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
