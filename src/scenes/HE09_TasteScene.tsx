/**
 * HE09_TasteScene.tsx — Taste Compounds (v2 — centered layout)
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const TEXT = "#f0f0f0";
const DIM = "rgba(240,240,240,0.5)";
const GREEN = "#4ade80";
const CYAN = "#67e8f9";
const PURPLE = "#a78bfa";
const RED_DIM = "rgba(255,107,107,0.3)";

const FadeIn: React.FC<{ triggerFrame: number; children: React.ReactNode }> = ({ triggerFrame, children }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });
  return <div style={{ opacity: entry, transform: `translateY(${(1 - entry) * 20}px)` }}>{children}</div>;
};

const Box: React.FC<{ label: string; sub?: string; color?: string; borderColor?: string }> = ({ label, sub, color = "#1a1a2e", borderColor = "rgba(255,255,255,0.15)" }) => (
  <div style={{
    backgroundColor: color, border: `2px solid ${borderColor}`, borderRadius: 10,
    padding: "12px 20px", textAlign: "center", minWidth: 100,
  }}>
    <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "Arial, sans-serif", color: TEXT }}>{label}</div>
    {sub && <div style={{ fontSize: 13, fontFamily: "Arial, sans-serif", color: DIM, marginTop: 4 }}>{sub}</div>}
  </div>
);

const Arrow: React.FC<{ color?: string }> = ({ color = DIM }) => (
  <div style={{ fontSize: 28, color, fontWeight: 700, margin: "0 8px" }}>→</div>
);

export const HE09_TasteScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const calloutT = Math.max(0, frame - 340);
  const calloutEntry = spring({ frame: calloutT, fps, config: springConf });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center", gap: 40 }}>
      {/* Two-column layout — BEFORE / AFTER */}
      <div style={{ display: "flex", gap: 60, alignItems: "flex-start", justifyContent: "center" }}>
        {/* BEFORE column */}
        <FadeIn triggerFrame={0}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 14, fontFamily: "Arial, sans-serif", color: DIM, letterSpacing: "0.1em", textTransform: "uppercase" }}>BEFORE</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Box label="Ryan" sub="backend infra" />
              <Arrow />
              <Box label="?" color={RED_DIM} borderColor="rgba(255,107,107,0.4)" />
              <Arrow />
              <div style={{ fontSize: 16, fontFamily: "Arial, sans-serif", color: DIM, textAlign: "center" }}>
                mediocre React<br />from Codex
              </div>
            </div>
          </div>
        </FadeIn>

        {/* AFTER column */}
        <FadeIn triggerFrame={150}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 14, fontFamily: "Arial, sans-serif", color: GREEN, letterSpacing: "0.1em", textTransform: "uppercase" }}>AFTER</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Box label="Ryan" />
              <Arrow color={GREEN} />
              <Box label="Sarah" sub="frontend architect" color={PURPLE} borderColor={PURPLE} />
              <Arrow color={GREEN} />
              <div style={{ fontSize: 14, fontFamily: "Arial, sans-serif", color: CYAN, textAlign: "center" }}>
                shared infra<br />(hooks, snapshots,<br />small components)
              </div>
              <Arrow color={GREEN} />
              <div style={{ fontSize: 16, fontFamily: "Arial, sans-serif", color: GREEN, fontWeight: 700, textAlign: "center" }}>
                Better React<br />from everyone's Codex
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Key callout */}
      <div style={{
        opacity: calloutEntry, transform: `translateY(${(1 - calloutEntry) * 20}px)`,
        backgroundColor: "rgba(74,222,128,0.1)", border: `1px solid ${GREEN}`,
        borderRadius: 8, padding: "14px 32px",
      }}>
        <span style={{ fontSize: 26, fontWeight: 700, fontFamily: "Arial, sans-serif", color: GREEN, letterSpacing: "-0.02em" }}>
          The model didn't change. The codebase did.
        </span>
      </div>
    </AbsoluteFill>
  );
};

export default HE09_TasteScene;
