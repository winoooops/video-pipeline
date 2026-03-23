/**
 * Strikethrough.tsx — Animated line drawn through text (left → right)
 */

import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const Strikethrough: React.FC<{
  triggerFrame?: number;
  duration?: number;
  color?: string;
  children: React.ReactNode;
}> = ({
  triggerFrame = 0,
  duration = 20,
  color = "#ff6b6b",
  children,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const lineWidth = interpolate(t, [0, duration], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {children}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          width: `${lineWidth}%`,
          height: 2,
          backgroundColor: color,
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
