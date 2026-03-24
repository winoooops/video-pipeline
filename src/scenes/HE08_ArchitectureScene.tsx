/**
 * HE08_ArchitectureScene.tsx — Architecture as Progressive Disclosure
 * 
 * Service → Types directional dependency diagram.
 * S22 Dark Elegant: glow nodes, gradient connectors, centered.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { BG_GRADIENT } from "../theme-he";
import { springConf } from "../animations";

const TEXT = "#e8eaed";
const GREEN = "#4ade80";
const RED = "#ff6b6b";
const DIM = "rgba(232,234,237,0.5)";
const NODE_BG = "#141422";

const Node: React.FC<{
  label: string;
  triggerFrame: number;
  glowColor?: string;
}> = ({ label, triggerFrame, glowColor = "rgba(255,255,255,0.08)" }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div style={{
      opacity: entry,
      transform: `scale(${entry})`,
      backgroundColor: NODE_BG,
      border: "2px solid rgba(255,255,255,0.15)",
      borderRadius: 16,
      padding: "24px 56px",
      boxShadow: `0 0 24px ${glowColor}, 0 4px 20px rgba(0,0,0,0.3)`,
    }}>
      <span style={{ fontSize: 36, fontWeight: 800, fontFamily: "Arial, sans-serif", color: TEXT, letterSpacing: "-0.02em" }}>
        {label}
      </span>
    </div>
  );
};

const ArrowConnector: React.FC<{
  triggerFrame: number;
  color: string;
  label: string;
  blocked?: boolean;
}> = ({ triggerFrame, color, label, blocked = false }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const progress = spring({ frame: t, fps, config: springConf });

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      opacity: progress,
    }}>
      {/* Arrow line */}
      <div style={{ position: "relative", width: 200, height: 4, overflow: "visible" }}>
        {blocked ? (
          /* Red X block */
          <div style={{
            position: "absolute", top: -24, left: "50%", transform: `translateX(-50%) scale(${progress})`,
          }}>
            <span style={{
              fontSize: 56, color: RED, fontWeight: 900,
              textShadow: "0 0 16px rgba(255,107,107,0.5)",
            }}>✗</span>
          </div>
        ) : (
          /* Green arrow with glow */
          <>
            <div style={{
              width: `${progress * 100}%`, height: 4,
              background: `linear-gradient(90deg, ${color}66, ${color})`,
              borderRadius: 2,
              boxShadow: `0 0 12px ${color}44`,
            }} />
            {/* Arrow head */}
            <div style={{
              position: "absolute", right: -6, top: -6,
              width: 0, height: 0,
              borderTop: "8px solid transparent",
              borderBottom: "8px solid transparent",
              borderLeft: `12px solid ${color}`,
              opacity: progress,
              filter: `drop-shadow(0 0 4px ${color}66)`,
            }} />
          </>
        )}
      </div>
      {/* Label */}
      <span style={{
        fontSize: 24, fontWeight: 700, fontFamily: "Arial, sans-serif",
        color, letterSpacing: "-0.01em",
        textShadow: `0 0 8px ${color}33`,
      }}>
        {label}
      </span>
    </div>
  );
};

export const HE08_ArchitectureScene: React.FC = () => {
  return (
    <AbsoluteFill style={{
      background: BG_GRADIENT,
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      gap: 48,
      padding: "80px 120px",
    }}>
      {/* Title */}
      <div style={{
        fontSize: 26, fontWeight: 600, fontFamily: "Arial, sans-serif",
        color: DIM, letterSpacing: "0.08em", textTransform: "uppercase",
      }}>
        Progressive Disclosure
      </div>

      {/* Diagram: Service ↔ Types */}
      <div style={{
        display: "flex", alignItems: "center", gap: 60,
      }}>
        <Node label="Service" triggerFrame={30} glowColor="rgba(74,222,128,0.12)" />

        {/* Arrows column */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 28,
        }}>
          <ArrowConnector triggerFrame={120} color={GREEN} label="✓ can use" />
          <ArrowConnector triggerFrame={200} color={RED} label="✗ never imports" blocked />
        </div>

        <Node label="Types" triggerFrame={60} glowColor="rgba(103,232,249,0.12)" />
      </div>

      {/* Rule text */}
      <div style={{
        display: "flex", flexDirection: "column", gap: 14, alignItems: "center",
        marginTop: 16,
      }}>
        {[
          { text: "Service can use Types.", frame: 280, color: GREEN },
          { text: "Types can never import Service.", frame: 320, color: RED },
          { text: "Directional boundaries enforced by the build.", frame: 360, color: DIM },
        ].map(({ text, frame: tf, color }, i) => {
          const { fps } = useVideoConfig();
          const f = useCurrentFrame();
          const t = Math.max(0, f - tf);
          const entry = spring({ frame: t, fps, config: springConf });
          return (
            <div key={i} style={{
              fontSize: 28, fontFamily: "Arial, sans-serif", color,
              letterSpacing: "-0.01em", fontWeight: 600,
              opacity: entry, transform: `translateY(${(1 - entry) * 12}px)`,
            }}>
              {text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export default HE08_ArchitectureScene;
