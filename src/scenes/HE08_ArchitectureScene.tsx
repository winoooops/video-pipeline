/**
 * HE08_ArchitectureScene.tsx — Architecture as Progressive Disclosure
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { BG_GRADIENT } from "../theme-he";
import { springConf } from "../animations";

const TEXT = "#f0f0f0";
const GREEN = "#4ade80";
const RED = "#ff6b6b";
const DIM = "rgba(240,240,240,0.5)";

const Node: React.FC<{
  label: string;
  x: number;
  y: number;
  triggerFrame: number;
}> = ({ label, x, y, triggerFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: entry,
        transform: `scale(${entry})`,
        backgroundColor: "#141422",
        border: "2px solid rgba(255,255,255,0.2)",
        borderRadius: 12,
        padding: "16px 36px",
      }}
    >
      <span style={{ fontSize: 26, fontWeight: 800, fontFamily: "Arial, sans-serif", color: TEXT, letterSpacing: "-0.02em" }}>
        {label}
      </span>
    </div>
  );
};

const Arrow: React.FC<{
  x: number;
  y: number;
  width: number;
  triggerFrame: number;
  color?: string;
  blocked?: boolean;
}> = ({ x, y, width, triggerFrame, color = GREEN, blocked = false }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const progress = spring({ frame: t, fps, config: springConf });

  if (blocked) {
    return (
      <div style={{ position: "absolute", left: x, top: y, opacity: progress }}>
        <span style={{ fontSize: 40, color: RED, fontWeight: 900 }}>✗</span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: width * progress,
        height: 3,
        backgroundColor: color,
        opacity: progress,
      }}
    />
  );
};

const RuleText: React.FC<{
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
        fontSize: 22,
        fontFamily: "Arial, sans-serif",
        color,
        letterSpacing: "-0.01em",
        opacity: entry,
        transform: `translateY(${(1 - entry) * 15}px)`,
      }}
    >
      {text}
    </div>
  );
};

export const HE08_ArchitectureScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BG_GRADIENT, justifyContent: "center", alignItems: "center" }}>
      {/* Diagram area */}
      <div style={{ position: "relative", width: 700, height: 200 }}>
        <Node label="Service" x={80} y={60} triggerFrame={30} />
        <Node label="Types" x={480} y={60} triggerFrame={60} />

        {/* Arrow: Service → Types */}
        <Arrow x={230} y={79} width={240} triggerFrame={120} color={GREEN} />
        <div style={{ position: "absolute", top: 55, left: 330, fontSize: 22, fontWeight: 700, fontFamily: "Arial, sans-serif", color: GREEN, opacity: 0.8 }}>
          ✓ can use
        </div>

        {/* X: Types ✗→ Service */}
        <Arrow x={305} y={79} width={0} triggerFrame={200} color={RED} blocked />
        <div style={{ position: "absolute", top: 55, left: 305, fontSize: 22, fontWeight: 700, fontFamily: "Arial, sans-serif", color: RED, opacity: 0.8 }}>
          ✗ never
        </div>
      </div>

      {/* Rule text */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", marginTop: 50 }}>
        <RuleText text="Service can use Types." triggerFrame={280} color={GREEN} />
        <RuleText text="Types can never import Service." triggerFrame={320} color={RED} />
        <RuleText text="Directional boundaries enforced by the build." triggerFrame={360} color={DIM} />
      </div>
    </AbsoluteFill>
  );
};

export default HE08_ArchitectureScene;
