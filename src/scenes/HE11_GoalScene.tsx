/**
 * HE11_GoalScene.tsx — The Goal: Autonomy
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const TEXT = "#f0f0f0";
const DIM = "rgba(240,240,240,0.55)";
const GREEN = "#4ade80";
const RED = "#ef4444";

const BigLine: React.FC<{ text: string; triggerFrame: number; color?: string }> = ({ text, triggerFrame, color = TEXT }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div style={{
      fontSize: 52, fontWeight: 800, fontFamily: "Arial, sans-serif",
      color, letterSpacing: "-0.03em", lineHeight: 1.2,
      opacity: entry, transform: `translateY(${(1 - entry) * 25}px)`,
    }}>
      {text}
    </div>
  );
};

const SmallLine: React.FC<{ text: string; triggerFrame: number; color?: string }> = ({ text, triggerFrame, color = DIM }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div style={{
      fontSize: 30, fontFamily: "Arial, sans-serif",
      color, letterSpacing: "-0.02em",
      opacity: entry, transform: `translateY(${(1 - entry) * 15}px)`,
    }}>
      {text}
    </div>
  );
};

export const HE11_GoalScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center", gap: 28 }}>
      <BigLine text="The goal: agents that work longer." triggerFrame={0} />
      <BigLine text="More reliably." triggerFrame={70} />
      <BigLine text="With less hand-holding." triggerFrame={140} />
      <div style={{ height: 20 }} />
      <SmallLine text="Not because the model got better." triggerFrame={260} color={RED} />
      <SmallLine text="Because the foundation got clearer." triggerFrame={340} color={GREEN} />
    </AbsoluteFill>
  );
};

export default HE11_GoalScene;
