import { AbsoluteFill } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

export const Tip3Scene: React.FC = () => {
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
          color: C.accent,
          textTransform: "uppercase",
          letterSpacing: 3,
          marginBottom: 12,
        }}
      >
        Best Practice #3
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
        Explicit Inputs & Outputs
      </div>
      <div
        style={{
          ...desc,
          fontSize: 28,
          color: C.textDim,
          marginBottom: 40,
          lineHeight: 1.5,
        }}
      >
        For each procedure: what Claude receives → what it does → where results go
      </div>

      <div
        style={{
          ...code,
          backgroundColor: C.bgCode,
          borderRadius: 16,
          padding: "32px 36px",
          boxShadow: `0 4px 20px rgba(0,0,0,0.12)`,
          fontSize: 24,
          lineHeight: 1.7,
        }}
      >
        <div style={{ color: C.codeComment }}>## Workflow</div>
        <div style={{ color: C.codeText, marginTop: 8 }}>
          <span style={{ color: C.codeKeyword }}>Input:</span> PR diff from
          GitHub MCP (files changed, line count)
        </div>
        <div style={{ color: C.codeText, marginTop: 4 }}>
          <span style={{ color: C.codeKeyword }}>Process:</span>
        </div>
        <div style={{ color: C.codeString }}>
          {"  "}1. Check each file against security patterns
        </div>
        <div style={{ color: C.codeString }}>
          {"  "}2. Flag unsafe blocks with line references
        </div>
        <div style={{ color: C.codeString }}>
          {"  "}3. Generate severity score (low/med/high)
        </div>
        <div style={{ color: C.codeText, marginTop: 4 }}>
          <span style={{ color: C.codeKeyword }}>Output:</span> Review comment
          posted to PR via GitHub API
        </div>
      </div>
    </AbsoluteFill>
  );
};
