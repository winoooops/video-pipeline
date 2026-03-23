/**
 * HE01_HookScene.tsx — The Hook
 *
 * 4 lines animate in sequentially:
 * "3 engineers" / "5 months" / "1M lines of code" / "0 lines typed by a human"
 * The last line fades in RED — the shocking reveal.
 *
 * Duration: 330 frames (11s @ 30fps)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const TEXT = "#f0f0f0";
const RED = "#ff6b6b";

const AnimatedLine: React.FC<{
  text: string;
  triggerFrame: number;
  color?: string;
}> = ({ text, triggerFrame, color = TEXT }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div
      style={{
        fontSize: 72,
        fontWeight: 800,
        fontFamily: "Arial, sans-serif",
        color,
        letterSpacing: "-0.03em",
        lineHeight: 1.2,
        opacity: entry,
        transform: `scale(${entry})`,
      }}
    >
      {text}
    </div>
  );
};

export const HE01_HookScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
    >
      <AnimatedLine text="3 engineers" triggerFrame={0} />
      <AnimatedLine text="5 months" triggerFrame={40} />
      <AnimatedLine text="1M lines of code" triggerFrame={80} />
      <AnimatedLine text="0 lines typed by a human" triggerFrame={130} color={RED} />
    </AbsoluteFill>
  );
};

export default HE01_HookScene;
