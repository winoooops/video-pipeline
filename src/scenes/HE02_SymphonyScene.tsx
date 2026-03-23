/**
 * HE02_SymphonyScene.tsx — The Symphony Team
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const TEXT = "#f0f0f0";
const DIM = "rgba(240,240,240,0.4)";

const lines = [
  { text: "OpenAI's Symphony team.", delay: 0 },
  { text: "Three engineers.", delay: 45 },
  { text: "Everything — every single line — written by Codex.", delay: 90 },
  { text: "The real innovation wasn't Codex.", delay: 200 },
  { text: "It was what they built around it.", delay: 310 },
];

const SeqLine: React.FC<{ text: string; triggerFrame: number; dim?: boolean }> = ({
  text,
  triggerFrame,
  dim = false,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div
      style={{
        fontSize: 44,
        fontWeight: 700,
        fontFamily: "Arial, sans-serif",
        color: dim ? DIM : TEXT,
        letterSpacing: "-0.02em",
        lineHeight: 1.3,
        opacity: entry,
        transform: `translateY(${(1 - entry) * 20}px)`,
      }}
    >
      {text}
    </div>
  );
};

export const HE02_SymphonyScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 120px",
        gap: 20,
      }}
    >
      {lines.map((l, i) => (
        <SeqLine key={i} text={l.text} triggerFrame={l.delay} />
      ))}
    </AbsoluteFill>
  );
};

export default HE02_SymphonyScene;
