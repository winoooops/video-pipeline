/**
 * HE04_CodexCantSeeScene.tsx — What Codex Can't See
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const TEXT = "#f0f0f0";
const DIM = "rgba(240,240,240,0.2)";
const LINE = "rgba(240,240,240,0.4)";
const RED = "#ff6b6b";
const CODEX_BG = "#1a1a2e";
const CODEX_BORDER = "#4ade80";

const boxes = ["Google Docs", "Slack threads", "Decisions in someone's head", "Notion pages", "Meeting notes"];
const boxPositions = [
  { x: 200, y: 120 }, { x: 580, y: 120 },
  { x: 100, y: 340 }, { x: 680, y: 340 },
  { x: 390, y: 420 },
];

const BoxLabel: React.FC<{ text: string; x: number; y: number; triggerFrame: number; faded?: boolean }> = ({ text, x, y, triggerFrame, faded = false }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div
      style={{
        position: "absolute",
        left: x, top: y,
        opacity: entry * (faded ? 0.25 : 1),
        transform: `scale(${entry})`,
        border: `2px solid ${faded ? DIM : LINE}`,
        borderRadius: 8,
        padding: "10px 16px",
        backgroundColor: faded ? "transparent" : CODEX_BG,
      }}
    >
      <span style={{ fontSize: 24, fontFamily: "Arial, sans-serif", color: faded ? DIM : TEXT, whiteSpace: "nowrap" }}>
        {text}
      </span>
    </div>
  );
};

const CodexBox: React.FC<{ triggerFrame: number }> = ({ triggerFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div
      style={{
        position: "absolute", left: 350, top: 220,
        opacity: entry, transform: `scale(${entry})`,
        backgroundColor: CODEX_BG, border: `3px solid ${CODEX_BORDER}`, borderRadius: 12, padding: "20px 40px",
      }}
    >
      <span style={{ fontSize: 32, fontWeight: 800, fontFamily: "Arial, sans-serif", color: TEXT, letterSpacing: "-0.02em" }}>
        Codex
      </span>
    </div>
  );
};

const ConnectingLine: React.FC<{ x1: number; y1: number; x2: number; y2: number; triggerFrame: number }> = ({ x1, y1, x2, y2, triggerFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const progress = spring({ frame: t, fps, config: springConf });
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const strokeDashoffset = length * (1 - progress);

  return (
    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", overflow: "visible" }}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={LINE} strokeWidth={1.5}
        strokeDasharray={length} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
    </svg>
  );
};

export const HE04_CodexCantSeeScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - 380);
  const entry = spring({ frame: t, fps, config: springConf });
  const centerX = 420 + 120;
  const centerY = 220 + 35;

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      {boxes.map((_, i) => (
        <ConnectingLine key={i}
          x1={centerX} y1={centerY}
          x2={boxPositions[i].x + 80} y2={boxPositions[i].y + 25}
          triggerFrame={30 + i * 20} />
      ))}
      {boxes.map((text, i) => (
        <BoxLabel key={i} text={text} x={boxPositions[i].x} y={boxPositions[i].y}
          triggerFrame={20 + i * 25} faded />
      ))}
      <CodexBox triggerFrame={0} />
      <div style={{
        position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center",
        opacity: entry, transform: `translateY(${(1 - entry) * 30}px)`,
      }}>
        <span style={{ fontSize: 36, fontWeight: 700, fontFamily: "Arial, sans-serif", color: RED, letterSpacing: "-0.02em" }}>
          What Codex can't see — doesn't exist.
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default HE04_CodexCantSeeScene;
