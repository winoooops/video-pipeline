/**
 * WordReveal.tsx — Per-word spring entrance for hero text
 * 
 * CRITICAL: words prop must be individual words only.
 * Bad:  words={["multiple words"]}     — creates "multi plewords" visual
 * Good: words={["multiple", "words"]} — correct spacing via flexbox gap
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

const springConf = { damping: 20, stiffness: 200, mass: 0.5 };
const WORD_DELAY_DEFAULT = 10;

export const WordReveal: React.FC<{
  words: string[];
  startFrame?: number;
  fontSize?: number;
  color?: string;
  weight?: number;
  wordDelay?: number;
  letterSpacing?: number;
}> = ({
  words,
  startFrame = 0,
  fontSize = 48,
  color = "#f0f0f0",
  weight = 800,
  wordDelay = WORD_DELAY_DEFAULT,
  letterSpacing = -0.03,
}) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.35em",
      }}
    >
      {words.map((word, i) => {
        const t = Math.max(0, frame - (startFrame + i * wordDelay));
        const entry = spring({ frame: t, fps, config: springConf });
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              fontSize,
              fontWeight: weight,
              fontFamily: "Arial, sans-serif",
              color,
              letterSpacing,
              opacity: entry,
              transform: `scale(${entry})`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
