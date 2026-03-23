/**
 * HE10_SurfaceAreaScene.tsx — The Full Surface Area
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const TEXT = "#f0f0f0";
const CYAN = "#67e8f9";

const nodes = [
  { label: "CI config", angle: -90 },
  { label: "Internal dev tools", angle: -39 },
  { label: "Documentation", angle: 13 },
  { label: "Eval harnesses", angle: 64 },
  { label: "Review comments", angle: 115 },
  { label: "Scripts that manage the repo", angle: 166 },
  { label: "Production dashboard definitions", angle: 217 },
];

const RADIUS = 220;
const CENTER_X = 480;
const CENTER_Y = 300;

const NodeItem: React.FC<{ label: string; angleDeg: number; index: number }> = ({ label, angleDeg, index }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - 30 - index * 20);
  const entry = spring({ frame: t, fps, config: springConf });

  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  const x = CENTER_X + RADIUS * Math.cos(angleRad) - 90;
  const y = CENTER_Y + RADIUS * Math.sin(angleRad) - 20;

  return (
    <div style={{
      position: "absolute", left: x, top: y,
      opacity: entry, transform: `scale(${entry})`,
      backgroundColor: "rgba(103,232,249,0.1)", border: `1px solid rgba(103,232,249,0.3)`,
      borderRadius: 8, padding: "8px 14px",
    }}>
      <span style={{ fontSize: 16, fontFamily: "Arial, sans-serif", color: CYAN, whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
        {label}
      </span>
    </div>
  );
};

const CenterLabel: React.FC<{ triggerFrame: number }> = ({ triggerFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div style={{
      position: "absolute", left: CENTER_X - 80, top: CENTER_Y - 24,
      opacity: entry, transform: `scale(${entry})`,
      backgroundColor: CYAN, borderRadius: 10, padding: "10px 22px",
    }}>
      <span style={{ fontSize: 18, fontWeight: 800, fontFamily: "Arial, sans-serif", color: BG, letterSpacing: "-0.02em" }}>
        Agent-Generated
      </span>
    </div>
  );
};

const FooterText: React.FC<{ triggerFrame: number }> = ({ triggerFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div style={{
      position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center",
      opacity: entry, transform: `translateY(${(1 - entry) * 15}px)`,
    }}>
      <span style={{ fontSize: 24, fontFamily: "Arial, sans-serif", color: TEXT, letterSpacing: "-0.02em" }}>
        The full surface area.{" "}
        <span style={{ color: CYAN }}>All of it needs to be legible, consistent, worth copying.</span>
      </span>
    </div>
  );
};

export const HE10_SurfaceAreaScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <CenterLabel triggerFrame={0} />
      {nodes.map((n, i) => <NodeItem key={i} label={n.label} angleDeg={n.angle} index={i} />)}
      <FooterText triggerFrame={200} />
    </AbsoluteFill>
  );
};

export default HE10_SurfaceAreaScene;
