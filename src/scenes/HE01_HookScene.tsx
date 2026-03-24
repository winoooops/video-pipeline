/**
 * HE01_HookScene.tsx — The Hook
 * 
 * 4 lines animate in sequentially with count-up on numbers:
 * "3 engineers" / "5 months" / "1,000,000 lines of code" / "0 lines typed by a human"
 * The "0" appears in RED — the shocking reveal.
 * 
 * Uses: CountUp, FadeIn (from components), springConf (from animations.ts)
 */

import React from "react";
import { AbsoluteFill } from "remotion";
import { BG_GRADIENT } from "../theme-he";
import { FadeIn } from "../components/animations/FadeIn";
import { CountUp } from "../components/animations/CountUp";
import { ScaleIn } from "../components/animations/ScaleIn";

const RED = "#ff6b6b";
const DIM = "rgba(240,240,240,0.5)";

const StatRow: React.FC<{
  count: number;
  label: string;
  triggerFrame: number;
  countDuration?: number;
  color?: string;
}> = ({ count, label, triggerFrame, countDuration = 20, color = "#f0f0f0" }) => (
  <FadeIn triggerFrame={triggerFrame}>
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.15em", justifyContent: "center" }}>
      <CountUp target={count} startFrame={triggerFrame} duration={countDuration} color={color} />
      <span style={{ fontSize: 48, fontWeight: 600, fontFamily: "Arial, sans-serif", color: DIM, letterSpacing: "-0.02em" }}>
        {label}
      </span>
    </div>
  </FadeIn>
);

export const HE01_HookScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: BG_GRADIENT,
        justifyContent: "center",
        alignItems: "center",
        gap: 24,
      }}
    >
      {/* Line 1: 3 engineers */}
      <StatRow count={3} label="engineers" triggerFrame={15} />

      {/* Line 2: 5 months */}
      <StatRow count={5} label="months" triggerFrame={60} />

      {/* Line 3: 1,000,000 lines of code */}
      <StatRow count={1000000} label="lines of code" triggerFrame={105} countDuration={25} />

      {/* Line 4: 0 — RED, ScaleIn, no count */}
      <FadeIn triggerFrame={165}>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.15em", justifyContent: "center" }}>
          <ScaleIn triggerFrame={165}>
            <span style={{ fontSize: 72, fontWeight: 800, fontFamily: "Arial, sans-serif", color: RED, letterSpacing: "-0.03em" }}>
              0
            </span>
          </ScaleIn>
          <span style={{ fontSize: 48, fontWeight: 600, fontFamily: "Arial, sans-serif", color: DIM, letterSpacing: "-0.02em" }}>
            lines typed by a human
          </span>
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

export default HE01_HookScene;
