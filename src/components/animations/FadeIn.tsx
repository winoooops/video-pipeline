/**
 * FadeIn.tsx — Fade + slide up wrapper
 * 
 * Wraps any children with spring-driven opacity + translateY entrance.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

const springConf = { damping: 20, stiffness: 200, mass: 0.5 };

export const FadeIn: React.FC<{
  triggerFrame?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ triggerFrame = 0, children, style }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div
      style={{
        opacity: entry,
        transform: `translateY(${(1 - entry) * 20}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
