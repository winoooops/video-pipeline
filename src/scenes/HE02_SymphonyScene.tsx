/**
 * HE02_SymphonyScene.tsx — The Symphony Team
 * 
 * 5 lines appear sequentially. Lines 1-3 set context; lines 4-5 pivot.
 * Lines 1-3 dim to 70% opacity once the pivot (line 4) appears.
 * 
 * Uses: FadeIn (from components)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";
import { BG_GRADIENT } from "../theme-he";
import { springConf } from "../animations";

const DIM = "rgba(240,240,240,0.4)";

const lines = [
  { text: "OpenAI's Symphony team.", size: 38, weight: 600, pivotDim: true },
  { text: "Three engineers.", size: 38, weight: 600, pivotDim: true },
  { text: "Everything — every single line — written by Codex.", size: 38, weight: 600, pivotDim: true },
  { text: "The real innovation wasn't Codex.", size: 42, weight: 800, pivotDim: false },
  { text: "It was what they built around it.", size: 42, weight: 800, pivotDim: false },
];
const delays = [20, 95, 155, 270, 360];
const pivotFrame = delays[3];

const SeqLine: React.FC<{
  text: string;
  size: number;
  weight: number;
  triggerFrame: number;
  pivotDim?: boolean;
}> = ({ text, size, weight, triggerFrame, pivotDim = false }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });
  const dimmedOpacity = pivotDim && frame >= pivotFrame
    ? interpolate(frame, [pivotFrame, pivotFrame + 20], [0.7, 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  return (
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        fontFamily: "Arial, sans-serif",
        color: DIM,
        letterSpacing: "-0.02em",
        lineHeight: 1.3,
        opacity: entry * dimmedOpacity,
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
        background: BG_GRADIENT,
        justifyContent: "center",
        alignItems: "center",  // centered per storyboard
        gap: 20,
      }}
    >
      {lines.map((l, i) => (
        <SeqLine
          key={i}
          text={l.text}
          size={l.size}
          weight={l.weight}
          triggerFrame={delays[i]}
          pivotDim={l.pivotDim}
        />
      ))}
    </AbsoluteFill>
  );
};

export default HE02_SymphonyScene;
