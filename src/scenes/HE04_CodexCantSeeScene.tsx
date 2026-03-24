/**
 * HE04_CodexCantSeeScene.tsx — What Codex Can't See
 * 
 * Center node "Codex" with 5 satellite nodes that fade to 20% + red ✗.
 * S22 Dark Elegant: gradient bg, glowing nodes, animated stroke connectors.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from "remotion";
import { BG_GRADIENT } from "../theme-he";
import { springConf } from "../animations";

const TEXT = "#e8eaed";
const RED = "#ff6b6b";
const CYAN = "#67e8f9";
const NODE_BG = "#141422";

const satellites = [
  "Google Docs",
  "Slack threads",
  "Decisions in someone's head",
  "Notion pages",
  "Meeting notes",
];

// Radial positions around center (angles in degrees, radius in px)
const angles = [-72, -36, 0, 36, 72]; // spread across top arc
const RADIUS = 280;
const CX = 960; // center X (1920/2)
const CY = 400; // center Y (slightly above middle)

const SatelliteNode: React.FC<{
  label: string;
  angle: number;
  triggerFrame: number;
  dimFrame: number;
}> = ({ label, angle, triggerFrame, dimFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  // Dim to 25% after dimFrame
  const dimT = Math.max(0, frame - dimFrame);
  const opacity = frame >= dimFrame
    ? interpolate(dimT, [0, 20], [1, 0.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : 1;

  // Red ✗ appears after dimFrame
  const xEntry = frame >= dimFrame
    ? spring({ frame: dimT, fps, config: { damping: 18, stiffness: 250, mass: 0.4 } })
    : 0;

  const rad = (angle * Math.PI) / 180;
  const x = CX + Math.sin(rad) * RADIUS;
  const y = CY - Math.cos(rad) * RADIUS;

  return (
    <>
      {/* Connecting line from center to satellite */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
        <line
          x1={CX} y1={CY} x2={x} y2={y}
          stroke={CYAN}
          strokeWidth={2}
          strokeDasharray="6,4"
          opacity={entry * opacity * 0.4}
          strokeLinecap="round"
          filter="url(#glow)"
        />
      </svg>

      {/* Satellite node */}
      <div style={{
        position: "absolute",
        left: x - 100, top: y - 25,
        width: 200,
        textAlign: "center",
        opacity: entry * opacity,
        transform: `scale(${entry})`,
      }}>
        <div style={{
          backgroundColor: NODE_BG,
          border: `2px solid rgba(255,255,255,${opacity > 0.5 ? 0.12 : 0.06})`,
          borderRadius: 10,
          padding: "10px 16px",
          boxShadow: opacity > 0.5 ? "0 0 16px rgba(103,232,249,0.08)" : "none",
          display: "inline-block",
          position: "relative",
        }}>
          <span style={{ fontSize: 20, fontWeight: 600, fontFamily: "Arial, sans-serif", color: TEXT, whiteSpace: "nowrap" }}>
            {label}
          </span>
          {/* Red ✗ overlay */}
          {xEntry > 0 && (
            <span style={{
              position: "absolute", top: -8, right: -8,
              fontSize: 22, fontWeight: 800, color: RED,
              opacity: xEntry, transform: `scale(${xEntry})`,
              textShadow: "0 0 8px rgba(255,107,107,0.5)",
            }}>✗</span>
          )}
        </div>
      </div>
    </>
  );
};

export const HE04_CodexCantSeeScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Center node entrance
  const centerEntry = spring({ frame, fps, config: springConf });

  // Caption entrance
  const captionT = Math.max(0, frame - 300);
  const captionEntry = spring({ frame: captionT, fps, config: springConf });

  return (
    <AbsoluteFill style={{ background: BG_GRADIENT }}>
      {/* SVG filter for glow effect */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Center node: Codex */}
      <div style={{
        position: "absolute",
        left: CX - 80, top: CY - 30,
        opacity: centerEntry, transform: `scale(${centerEntry})`,
      }}>
        <div style={{
          backgroundColor: NODE_BG,
          border: `3px solid ${CYAN}`,
          borderRadius: 14,
          padding: "18px 40px",
          boxShadow: `0 0 24px rgba(103,232,249,0.2), 0 0 48px rgba(103,232,249,0.08)`,
        }}>
          <span style={{ fontSize: 32, fontWeight: 800, fontFamily: "Arial, sans-serif", color: TEXT, letterSpacing: "-0.02em" }}>
            Codex
          </span>
        </div>
      </div>

      {/* Satellite nodes */}
      {satellites.map((label, i) => (
        <SatelliteNode
          key={i}
          label={label}
          angle={angles[i]}
          triggerFrame={40 + i * 15}
          dimFrame={200}
        />
      ))}

      {/* Caption */}
      <div style={{
        position: "absolute", bottom: 120, left: 0, right: 0, textAlign: "center",
        opacity: captionEntry, transform: `translateY(${(1 - captionEntry) * 20}px)`,
      }}>
        <span style={{
          fontSize: 38, fontWeight: 800, fontFamily: "Arial, sans-serif", color: RED,
          letterSpacing: "-0.02em",
          textShadow: "0 0 20px rgba(255,107,107,0.3)",
        }}>
          What Codex can't see — doesn't exist.
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default HE04_CodexCantSeeScene;
