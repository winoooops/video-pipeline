/**
 * HE10_SurfaceAreaScene.tsx — The Full Surface Area
 * 
 * Radial layout centered on canvas with 7 satellite nodes.
 * S22 Dark Elegant: glow nodes, CYAN accent, centered.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { BG_GRADIENT } from "../theme-he";
import { springConf } from "../animations";

const TEXT = "#e8eaed";
const CYAN = "#67e8f9";
const NODE_BG = "#141422";

const nodes = [
  "CI config",
  "Internal dev tools",
  "Documentation",
  "Eval harnesses",
  "Review comments",
  "Repo scripts",
  "Dashboard definitions",
];

// Center of 1920×1080 canvas
const CX = 960;
const CY = 440; // slightly above center to leave room for footer
const RADIUS = 300;

const SatelliteNode: React.FC<{
  label: string;
  index: number;
  total: number;
}> = ({ label, index, total }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - 40 - index * 18);
  const entry = spring({ frame: t, fps, config: springConf });

  // Distribute evenly around the circle
  const angleRad = ((index / total) * 2 * Math.PI) - Math.PI / 2;
  const x = CX + RADIUS * Math.cos(angleRad);
  const y = CY + RADIUS * Math.sin(angleRad);

  return (
    <>
      {/* Connecting line from center */}
      <svg style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "visible" }}>
        <line
          x1={CX} y1={CY} x2={x} y2={y}
          stroke={CYAN}
          strokeWidth={1.5}
          strokeDasharray="6,4"
          opacity={entry * 0.25}
        />
      </svg>

      {/* Node */}
      <div style={{
        position: "absolute",
        left: x - 90, top: y - 22,
        width: 180,
        textAlign: "center",
        opacity: entry, transform: `scale(${entry})`,
      }}>
        <div style={{
          display: "inline-block",
          backgroundColor: NODE_BG,
          border: "1px solid rgba(103,232,249,0.25)",
          borderRadius: 10,
          padding: "10px 18px",
          boxShadow: "0 0 12px rgba(103,232,249,0.06)",
        }}>
          <span style={{
            fontSize: 20, fontFamily: "Arial, sans-serif", color: CYAN,
            whiteSpace: "nowrap", letterSpacing: "-0.01em", fontWeight: 600,
          }}>
            {label}
          </span>
        </div>
      </div>
    </>
  );
};

export const HE10_SurfaceAreaScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Center node
  const centerEntry = spring({ frame, fps, config: springConf });

  // Footer
  const footerT = Math.max(0, frame - 220);
  const footerEntry = spring({ frame: footerT, fps, config: springConf });

  return (
    <AbsoluteFill style={{ background: BG_GRADIENT }}>
      {/* Center node: Agent-Generated */}
      <div style={{
        position: "absolute",
        left: CX - 100, top: CY - 26,
        opacity: centerEntry, transform: `scale(${centerEntry})`,
      }}>
        <div style={{
          backgroundColor: CYAN,
          borderRadius: 12,
          padding: "14px 28px",
          boxShadow: "0 0 28px rgba(103,232,249,0.25)",
        }}>
          <span style={{
            fontSize: 22, fontWeight: 800, fontFamily: "Arial, sans-serif",
            color: "#0a0a12", letterSpacing: "-0.02em",
          }}>
            Agent-Generated
          </span>
        </div>
      </div>

      {/* Satellite nodes */}
      {nodes.map((label, i) => (
        <SatelliteNode key={i} label={label} index={i} total={nodes.length} />
      ))}

      {/* Footer */}
      <div style={{
        position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center",
        padding: "0 160px",
        opacity: footerEntry, transform: `translateY(${(1 - footerEntry) * 16}px)`,
      }}>
        <span style={{ fontSize: 28, fontFamily: "Arial, sans-serif", color: TEXT, letterSpacing: "-0.02em" }}>
          The full surface area.{" "}
          <span style={{ color: CYAN, fontWeight: 700 }}>
            All of it needs to be legible, consistent, worth copying.
          </span>
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default HE10_SurfaceAreaScene;
