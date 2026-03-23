import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { C, FONT_FAMILY } from "../theme";
import { useFadeInUp } from "../animations";

const HeaderCell: React.FC<{ icon: string; label: string; delay: number }> = ({ icon, label, delay }) => {
  const style = useFadeInUp(delay, 12);
  return (
    <div style={{
      ...style, flex: 1, display: "flex", flexDirection: "column",
      alignItems: "center", gap: 8,
    }}>
      <div style={{ fontSize: 32 }}>{icon}</div>
      <div style={{
        fontSize: 16, fontWeight: 700, color: C.text,
        textTransform: "uppercase", letterSpacing: 2, textAlign: "center",
      }}>
        {label}
      </div>
    </div>
  );
};

const DataRow: React.FC<{
  label: string;
  values: Array<{ text: string; positive: boolean }>;
  delay: number;
}> = ({ label, values, delay }) => {
  const style = useFadeInUp(delay, 10);
  return (
    <div style={{
      ...style, display: "flex", alignItems: "center",
      padding: "14px 24px", borderBottom: `1px solid ${C.border}`,
    }}>
      <div style={{ flex: 1.8, fontSize: 22, color: C.text, fontWeight: 500 }}>
        {label}
      </div>
      {values.map((v, i) => (
        <div key={i} style={{
          flex: 1, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 4,
        }}>
          <div style={{
            width: 14, height: 14, borderRadius: "50%",
            backgroundColor: v.positive ? C.primary : "#D4D4D4",
          }} />
          <div style={{
            fontSize: 16, color: v.positive ? C.text : C.textDim,
            fontWeight: v.positive ? 600 : 400,
          }}>
            {v.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export const ResultsTableScene: React.FC = () => {
  const frame = useCurrentFrame();
  const heading = useFadeInUp(0, 18);
  const grade = useFadeInUp(10, 15);
  const insight = useFadeInUp(180, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
        fontFamily: FONT_FAMILY,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 100px",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 20, marginBottom: 30 }}>
        <div style={{
          ...heading, fontSize: 48, fontWeight: 700, color: C.text, letterSpacing: -1,
        }}>
          Eval Results: <span style={{ color: C.primary }}>Twitter Skill</span>
        </div>
        <div style={{ ...grade, fontSize: 40, fontWeight: 800, color: C.primary }}>
          B+
        </div>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: C.bgCard, borderRadius: 16,
        border: `1px solid ${C.border}`, overflow: "hidden",
        boxShadow: `0 4px 24px ${C.shadow}`,
      }}>
        {/* Header with icons */}
        <div style={{
          display: "flex", alignItems: "center",
          backgroundColor: C.primary, padding: "16px 24px",
        }}>
          <div style={{
            flex: 1.8, fontSize: 16, fontWeight: 700, color: "#FFF",
            textTransform: "uppercase", letterSpacing: 2,
          }}>
            Task
          </div>
          <HeaderCell icon="🧠" label="With Skill" delay={15} />
          <HeaderCell icon="🚫" label="Without" delay={25} />
          <HeaderCell icon="⏱️" label="Time Saved" delay={35} />
          <HeaderCell icon="🏆" label="Winner" delay={45} />
        </div>

        {/* Data rows */}
        <DataRow
          label="Search #AI tweets"
          values={[
            { text: "2m17s", positive: true },
            { text: "11m", positive: false },
            { text: "5.5×", positive: true },
            { text: "✅ Skill", positive: true },
          ]}
          delay={55}
        />
        <DataRow
          label="Anthropic profile"
          values={[
            { text: "17s", positive: true },
            { text: "1m", positive: false },
            { text: "3.6×", positive: true },
            { text: "✅ Skill", positive: true },
          ]}
          delay={75}
        />
        <DataRow
          label="Latest tweet"
          values={[
            { text: "1m44s", positive: false },
            { text: "48s", positive: true },
            { text: "—", positive: false },
            { text: "❌ None", positive: false },
          ]}
          delay={95}
        />
        <DataRow
          label="Show bookmarks"
          values={[
            { text: "27s", positive: false },
            { text: "20s", positive: true },
            { text: "—", positive: false },
            { text: "❌ None", positive: false },
          ]}
          delay={115}
        />
        <DataRow
          label="User timeline"
          values={[
            { text: "44s", positive: false },
            { text: "26s", positive: true },
            { text: "—", positive: false },
            { text: "❌ None", positive: false },
          ]}
          delay={135}
        />
      </div>

      {/* Insight */}
      <div style={{
        ...insight, marginTop: 28, padding: "20px 28px",
        backgroundColor: C.primarySoft, borderRadius: 14,
        fontSize: 26, color: C.textMid, textAlign: "center",
        border: `1px solid ${C.primary}30`,
      }}>
        Skills shine on <strong style={{ color: C.primary }}>complex tasks</strong> —
        simple reads run better without the overhead
      </div>
    </AbsoluteFill>
  );
};
