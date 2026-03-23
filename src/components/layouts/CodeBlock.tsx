/**
 * CodeBlock.tsx — Styled code window with optional header
 * 
 * Style: bg #111118, 1px border, 8px radius, monospace font.
 * Syntax colors: CYAN keywords, GREEN strings, DIM comments.
 * 
 * Children should be pre-formatted text or JSX with inline color spans.
 */

import React from "react";
import { FadeIn } from "../animations/FadeIn";

const CODE_COLORS = {
  keyword: "#67e8f9",   // CYAN
  string: "#4ade80",    // GREEN
  comment: "rgba(240,240,240,0.4)", // DIM
  text: "#f0f0f0",      // TEXT
  fn: "#f0f0f0",        // TEXT
};

export { CODE_COLORS };

export const CodeBlock: React.FC<{
  header?: string;
  triggerFrame?: number;
  children: React.ReactNode;
  maxWidth?: number;
}> = ({
  header,
  triggerFrame = 0,
  children,
  maxWidth = 700,
}) => {
  const container = (
    <div
      style={{
        backgroundColor: "#111118",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 8,
        overflow: "hidden",
        maxWidth,
      }}
    >
      {header && (
        <div
          style={{
            height: 32,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 16,
          }}
        >
          <span
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 18,
              fontWeight: 600,
              color: "rgba(240,240,240,0.5)",
            }}
          >
            {header}
          </span>
        </div>
      )}
      <div
        style={{
          padding: "20px 24px",
          fontFamily: "\"Courier New\", monospace",
          fontSize: 20,
          lineHeight: 1.6,
        }}
      >
        {children}
      </div>
    </div>
  );

  return <FadeIn triggerFrame={triggerFrame}>{container}</FadeIn>;
};
