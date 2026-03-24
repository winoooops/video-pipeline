/**
 * HE05_GapIsAlwaysYoursScene.tsx — The Gap Is Always Yours
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { BG_GRADIENT } from "../theme-he";
import { springConf } from "../animations";

const RED = "#ff6b6b";
const DIM = "rgba(240,240,240,0.6)";

const ANCHOR = "The gap is always yours.";
const words = ANCHOR.split(" ");

const Word: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - index * 8);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <span
      style={{
        display: "inline-block",
        fontSize: 80,
        fontWeight: 900,
        fontFamily: "Arial, sans-serif",
        color: RED,
        letterSpacing: "-0.04em",
        marginRight: "0.25em",
        opacity: entry,
        transform: `scale(${entry})`,
      }}
    >
      {text}
    </span>
  );
};

const SubText: React.FC<{ text: string; triggerFrame: number }> = ({ text, triggerFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  return (
    <div
      style={{
        fontSize: 28,
        fontFamily: "Arial, sans-serif",
        color: DIM,
        letterSpacing: "-0.01em",
        lineHeight: 1.5,
        opacity: entry,
        transform: `translateY(${(1 - entry) * 20}px)`,
        textAlign: "center",
        maxWidth: 700,
      }}
    >
      {text}
    </div>
  );
};

export const HE05_GapIsAlwaysYoursScene: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: BG_GRADIENT,
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        {words.map((word, i) => (
          <Word key={i} text={word} index={i} />
        ))}
      </div>
      <SubText
        text="The model did what we made possible. The slop was in the scaffolding."
        triggerFrame={100}
      />
    </AbsoluteFill>
  );
};

export default HE05_GapIsAlwaysYoursScene;
