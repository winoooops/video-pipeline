/**
 * DiagramNode.tsx — Rounded rectangle node for diagrams
 * 
 * Style: bg #1a1a2e, 2px border, 10px radius, padding 12px 20px.
 * Border color defaults to rgba(255,255,255,0.15) or custom accent.
 */

import React from "react";
import { FadeIn } from "../animations/FadeIn";
import { ScaleIn } from "../animations/ScaleIn";

export const DiagramNode: React.FC<{
  label: string;
  sublabel?: string;
  borderColor?: string;
  triggerFrame?: number;
  animation?: "fade" | "scale";
}> = ({
  label,
  sublabel,
  borderColor = "rgba(255,255,255,0.15)",
  triggerFrame = 0,
  animation = "scale",
}) => {
  const wrapper = (
    <div
      style={{
        backgroundColor: "#1a1a2e",
        border: `2px solid ${borderColor}`,
        borderRadius: 10,
        padding: "12px 20px",
        display: "inline-block",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          fontSize: 24,
          fontWeight: 700,
          color: "#f0f0f0",
        }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 18,
            fontWeight: 400,
            color: "rgba(240,240,240,0.5)",
            marginTop: 4,
          }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );

  if (animation === "fade") {
    return <FadeIn triggerFrame={triggerFrame}>{wrapper}</FadeIn>;
  }
  return <ScaleIn triggerFrame={triggerFrame}>{wrapper}</ScaleIn>;
};
