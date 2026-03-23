/**
 * Badge.tsx — BEFORE/AFTER status badge
 * 
 * Style: accent color at 10% opacity bg, 1px solid accent border,
 * uppercase, letter-spacing 0.1em.
 */

import React from "react";

export const Badge: React.FC<{
  text: string;
  color?: string;
}> = ({
  text,
  color = "#ff6b6b",
}) => {
  return (
    <div
      style={{
        display: "inline-block",
        backgroundColor: `${color}1a`, // 10% opacity
        border: `1px solid ${color}`,
        borderRadius: 6,
        padding: "6px 14px",
        fontFamily: "Arial, sans-serif",
        fontSize: 18,
        fontWeight: 700,
        color,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
      }}
    >
      {text}
    </div>
  );
};
