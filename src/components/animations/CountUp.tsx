/**
 * CountUp.tsx — Animated number counter (0 → target)
 */

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const CountUp: React.FC<{
  target: number;
  startFrame?: number;
  duration?: number;
  fontSize?: number;
  color?: string;
  weight?: number;
}> = ({
  target,
  startFrame = 0,
  duration = 20,
  fontSize = 64,
  color = "#f0f0f0",
  weight = 800,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - startFrame);
  const value = Math.round(
    interpolate(t, [0, duration], [0, target], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
  );

  return (
    <span
      style={{
        fontSize,
        fontWeight: weight,
        fontFamily: "Arial, sans-serif",
        color,
        letterSpacing: "-0.03em",
      }}
    >
      {value.toLocaleString()}
    </span>
  );
};
