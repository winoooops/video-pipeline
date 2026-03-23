/**
 * CalloutBox.tsx — Highlighted callout with accent border
 * 
 * Used for key insight callouts (e.g., "The model didn't change. The codebase did.")
 */

import React from "react";
import { FadeIn } from "../animations/FadeIn";

export const CalloutBox: React.FC<{
  color?: string;
  triggerFrame?: number;
  children: React.ReactNode;
}> = ({
  color = "#4ade80",
  triggerFrame = 0,
  children,
}) => {
  return (
    <FadeIn triggerFrame={triggerFrame}>
      <div
        style={{
          backgroundColor: `${color}1a`, // 10% opacity
          border: `1px solid ${color}`,
          borderRadius: 8,
          padding: "14px 32px",
        }}
      >
        {children}
      </div>
    </FadeIn>
  );
};
