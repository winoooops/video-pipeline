/**
 * LineDrawn.tsx — SVG line with animated draw-on effect
 * 
 * Uses @remotion/paths evolvePath(progress, pathD) which returns
 * { strokeDasharray, strokeDashoffset } to animate line drawing.
 */

import React from "react";
import { useCurrentFrame } from "remotion";
import { evolvePath } from "@remotion/paths";

export const LineDrawn: React.FC<{
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  startFrame?: number;
  duration?: number;
  stroke?: string;
  strokeWidth?: number;
  dashed?: boolean;
}> = ({
  fromX,
  fromY,
  toX,
  toY,
  startFrame = 0,
  duration = 20,
  stroke = "rgba(255,255,255,0.3)",
  strokeWidth = 2,
  dashed = false,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - startFrame);
  const rawProgress = t < duration ? t / duration : 1;

  const minX = Math.min(fromX, toX) - 10;
  const minY = Math.min(fromY, toY) - 10;
  const width = Math.abs(toX - fromX) + 20;
  const height = Math.abs(toY - fromY) + 20;

  const pathD = `M ${fromX} ${fromY} L ${toX} ${toY}`;
  const dash = evolvePath(rawProgress, pathD);

  return (
    <svg
      viewBox={`${minX} ${minY} ${width} ${height}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      {/* Placeholder: full dashed line showing final position */}
      <path
        d={pathD}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dashed ? "8,6" : "none"}
        strokeLinecap="round"
        fill="none"
        opacity={0.3}
      />
      {/* Animated: evolves from 0 to full using strokeDashoffset */}
      <path
        d={pathD}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dash.strokeDasharray}
        strokeDashoffset={dash.strokeDashoffset}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
