/**
 * HE03_InstinctScene.tsx — The Instinct
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const TEXT = "#f0f0f0";
const RED = "#ff6b6b";

const Beat: React.FC<{
  text: string;
  triggerFrame: number;
  color?: string;
  wipe?: boolean;
}> = ({ text, triggerFrame, color = TEXT, wipe = false }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });
  const translateX = wipe ? (1 - entry) * 60 : 0;

  return (
    <div
      style={{
        fontSize: 56,
        fontWeight: 800,
        fontFamily: "Arial, sans-serif",
        color,
        letterSpacing: "-0.03em",
        lineHeight: 1.2,
        opacity: entry,
        transform: `translateX(${-translateX}px) scale(${entry})`,
      }}
    >
      {text}
    </div>
  );
};

export const HE03_InstinctScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        justifyContent: "center",
        alignItems: "center",
        gap: 32,
        textAlign: "center",
      }}
    >
      <Beat text='"The code Codex wrote was bad."' triggerFrame={0} />
      <Beat text="So we blamed the model." triggerFrame={90} />
      <Beat text="We were wrong." triggerFrame={210} color={RED} wipe />
    </AbsoluteFill>
  );
};

export default HE03_InstinctScene;
