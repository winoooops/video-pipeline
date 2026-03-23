import { AbsoluteFill } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

export const Tip4Scene: React.FC = () => {
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
          color: "#DC2626",
          textTransform: "uppercase",
          letterSpacing: 3,
          marginBottom: 12,
        }}
      >
        Best Practice #4
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
        Include Troubleshooting
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
        Skills fail in predictable ways. A Common Issues section cuts the back-and-forth.
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
        <div style={{ color: C.codeComment }}>## Common Issues</div>
        <div style={{ color: C.codeComment, marginTop: 12 }}>
          ### MCP Connection Failed
        </div>
        <div style={{ color: C.codeText, marginTop: 8 }}>
          <span style={{ color: "#F38BA8" }}>If</span> you see{" "}
          <span style={{ color: C.codeString }}>"Connection refused"</span>:
        </div>
        <div style={{ color: C.codeString, marginTop: 4 }}>
          {"  "}1. Verify MCP server is running
        </div>
        <div style={{ color: C.codeString }}>
          {"  "}2. Confirm API key is valid
        </div>
        <div style={{ color: C.codeString }}>
          {"  "}3. Try reconnecting: Settings → Extensions
        </div>
        <div style={{ color: C.codeComment, marginTop: 16 }}>
          ### Rate Limited
        </div>
        <div style={{ color: C.codeText, marginTop: 4 }}>
          Wait 60s and retry. Use{" "}
          <span style={{ color: C.codeFunc }}>--backoff</span> flag.
        </div>
      </div>
    </AbsoluteFill>
  );
};
