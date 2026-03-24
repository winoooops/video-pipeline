/**
 * HE09_TasteScene.tsx — Taste Compounds (v3 — vertical, centered, larger)
 * 
 * BEFORE/AFTER pipeline comparison, stacked vertically.
 * S22 Dark Elegant: glow nodes, centered layout.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { BG_GRADIENT } from "../theme-he";
import { springConf } from "../animations";

const TEXT = "#e8eaed";
const DIM = "rgba(232,234,237,0.5)";
const GREEN = "#4ade80";
const CYAN = "#67e8f9";
const PURPLE = "#a78bfa";
const RED = "#ff6b6b";
const NODE_BG = "#141422";

const FadeIn: React.FC<{ triggerFrame: number; children: React.ReactNode }> = ({ triggerFrame, children }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });
  return <div style={{ opacity: entry, transform: `translateY(${(1 - entry) * 16}px)` }}>{children}</div>;
};

const PipelineNode: React.FC<{
  label: string;
  sub?: string;
  borderColor?: string;
  glowColor?: string;
}> = ({ label, sub, borderColor = "rgba(255,255,255,0.12)", glowColor }) => (
  <div style={{
    backgroundColor: NODE_BG,
    border: `2px solid ${borderColor}`,
    borderRadius: 12,
    padding: "14px 28px",
    textAlign: "center",
    boxShadow: glowColor ? `0 0 16px ${glowColor}` : "0 4px 16px rgba(0,0,0,0.3)",
  }}>
    <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "Arial, sans-serif", color: TEXT }}>{label}</div>
    {sub && <div style={{ fontSize: 18, fontFamily: "Arial, sans-serif", color: DIM, marginTop: 4 }}>{sub}</div>}
  </div>
);

const ArrowRight: React.FC<{ color?: string }> = ({ color = DIM }) => (
  <span style={{ fontSize: 32, color, fontWeight: 700 }}>→</span>
);

export const HE09_TasteScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const calloutT = Math.max(0, frame - 340);
  const calloutEntry = spring({ frame: calloutT, fps, config: springConf });

  return (
    <AbsoluteFill style={{
      background: BG_GRADIENT,
      display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center",
      gap: 48, padding: "80px 120px",
    }}>
      {/* BEFORE pipeline */}
      <FadeIn triggerFrame={0}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{
            fontSize: 18, fontFamily: "Arial, sans-serif", color: RED,
            letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
          }}>
            Before
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <PipelineNode label="Ryan" sub="backend infra" />
            <ArrowRight />
            <PipelineNode label="?" borderColor="rgba(255,107,107,0.4)" glowColor="rgba(255,107,107,0.08)" />
            <ArrowRight />
            <div style={{
              fontSize: 22, fontFamily: "Arial, sans-serif", color: DIM,
              textAlign: "center", lineHeight: 1.4,
            }}>
              mediocre React<br />from Codex
            </div>
          </div>
        </div>
      </FadeIn>

      {/* AFTER pipeline */}
      <FadeIn triggerFrame={150}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          <div style={{
            fontSize: 18, fontFamily: "Arial, sans-serif", color: GREEN,
            letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700,
          }}>
            After
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <PipelineNode label="Ryan" />
            <ArrowRight color={GREEN} />
            <PipelineNode label="Sarah" sub="frontend architect" borderColor={PURPLE} glowColor="rgba(167,139,250,0.12)" />
            <ArrowRight color={GREEN} />
            <div style={{
              fontSize: 20, fontFamily: "Arial, sans-serif", color: CYAN,
              textAlign: "center", lineHeight: 1.4,
            }}>
              shared infra<br />(hooks, snapshots)
            </div>
            <ArrowRight color={GREEN} />
            <div style={{
              fontSize: 22, fontFamily: "Arial, sans-serif", color: GREEN,
              fontWeight: 700, textAlign: "center", lineHeight: 1.4,
            }}>
              Better React<br />from everyone
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Key callout */}
      <div style={{
        opacity: calloutEntry, transform: `translateY(${(1 - calloutEntry) * 16}px)`,
        backgroundColor: "rgba(74,222,128,0.08)", border: `1px solid ${GREEN}`,
        borderRadius: 10, padding: "16px 40px",
        boxShadow: "0 0 16px rgba(74,222,128,0.08)",
      }}>
        <span style={{
          fontSize: 30, fontWeight: 800, fontFamily: "Arial, sans-serif", color: GREEN,
          letterSpacing: "-0.02em",
        }}>
          The model didn't change. The codebase did.
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default HE09_TasteScene;
