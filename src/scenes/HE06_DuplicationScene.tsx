/**
 * HE06_DuplicationScene.tsx — The Duplication Problem
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill, interpolate } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const CODE_BG = "#111827";
const TEXT = "#f0f0f0";
const RED = "#ff6b6b";
const GREEN = "#4ade80";
const CODE_TEXT = "#a5f3fc";
const COMMENT = "#6b7280";

const instances = [
  { tag: "agent-abc", location: "lib/concurrency.ts:14" },
  { tag: "agent-def", location: "utils/helpers.ts:7" },
  { tag: "agent-xyz", location: "core/sync.ts:29" },
];

const CodeWindow: React.FC<{
  tag: string;
  location: string;
  index: number;
  triggerFrame: number;
}> = ({ tag, location, index, triggerFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div
      style={{
        opacity: entry,
        transform: `translateY(${(1 - entry) * 40}px)`,
        backgroundColor: CODE_BG,
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8,
        padding: "12px 20px",
        fontFamily: "Courier New, monospace",
        fontSize: 18,
      }}
    >
      <div style={{ color: COMMENT, fontSize: 13, marginBottom: 6 }}>
        // {tag} · {location}
      </div>
      <div style={{ color: CODE_TEXT }}>
        <span style={{ color: GREEN }}>const</span>{" "}
        <span style={{ color: TEXT }}>getConcurrencyHelper</span>
        <span style={{ color: TEXT }}>()</span>{" "}
        <span style={{ color: GREEN }}>{"{"}</span>
      </div>
      <div style={{ color: TEXT, paddingLeft: 16 }}>
        <span style={{ color: COMMENT }}>// ... implementation</span>
      </div>
      <div style={{ color: GREEN }}>{"}"}</div>
    </div>
  );
};

const DuplicatedBadge: React.FC<{ triggerFrame: number }> = ({ triggerFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });
  const pulse = interpolate(t, [0, 30, 60], [1, 1.03, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        opacity: entry,
        transform: `scale(${entry * pulse})`,
        backgroundColor: "rgba(255,107,107,0.15)",
        border: `2px solid ${RED}`,
        borderRadius: 8,
        padding: "10px 24px",
      }}
    >
      <span
        style={{
          fontSize: 20,
          fontWeight: 800,
          fontFamily: "Arial, sans-serif",
          color: RED,
          letterSpacing: "0.05em",
        }}
      >
        // DUPLICATED — 3 times
      </span>
    </div>
  );
};

export const HE06_DuplicationScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          fontSize: 22,
          fontFamily: "Arial, sans-serif",
          color: "rgba(240,240,240,0.5)",
          marginBottom: 8,
          letterSpacing: "0.02em",
        }}
      >
        Agents kept duplicating a concurrency helper...
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 560 }}>
        {instances.map((inst, i) => (
          <CodeWindow
            key={i}
            tag={inst.tag}
            location={inst.location}
            index={i}
            triggerFrame={40 + i * 30}
          />
        ))}
      </div>
      <DuplicatedBadge triggerFrame={200} />
    </AbsoluteFill>
  );
};

export default HE06_DuplicationScene;
