/**
 * LightLeak.tsx — Warm atmospheric overlay (radial gradient fallback)
 * 
 * Simulates @remotion/light-leaks using a CSS radial gradient.
 * Scenes 05 and 11 use this for atmospheric warmth.
 */

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const LightLeak: React.FC<{
  triggerFrame?: number;
  peakOpacity?: number;
  fadeInEnd?: number;      // frame at which opacity reaches peak
  holdUntil?: number;     // frame at which fade-out begins
  fadeOutDuration?: number; // frames to fade from peak to 0
  color?: string;
}> = ({
  triggerFrame = 0,
  peakOpacity = 0.15,
  fadeInEnd = 30,
  holdUntil = 350,
  fadeOutDuration = 100,
  color = "#ffd4a3",
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);

  const opacity = t < holdUntil
    ? interpolate(t, [0, fadeInEnd], [0, peakOpacity], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    : interpolate(t, [holdUntil, holdUntil + fadeOutDuration], [peakOpacity, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse 80% 60% at 40% 30%, ${color}33 0%, transparent 70%)`,
        opacity,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
};
