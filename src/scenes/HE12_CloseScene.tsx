/**
 * HE12_CloseScene.tsx — The Close
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill, interpolate } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const TEXT = "#f0f0f0";
const RED = "#ff6b6b";
const DIM = "rgba(240,240,240,0.5)";
const WORD_DELAY = 10;

const WordReveal: React.FC<{ words: string[]; startFrame: number; fontSize?: number; color?: string }> = ({ words, startFrame, fontSize = 48, color = TEXT }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.2em" }}>
      {words.map((word, i) => {
        const t = Math.max(0, frame - (startFrame + i * WORD_DELAY));
        const entry = spring({ frame: t, fps, config: springConf });
        return (
          <span key={i} style={{
            display: "inline-block", fontSize, fontWeight: 800, fontFamily: "Arial, sans-serif",
            color, letterSpacing: "-0.03em",
            opacity: entry, transform: `scale(${entry})`,
          }}>
            {word}
          </span>
        );
      })}
    </div>
  );
};

export const HE12_CloseScene: React.FC = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const finalCardT = Math.max(0, frame - 480);
  const finalCardEntry = spring({ frame: finalCardT, fps, config: springConf });
  const fadeBlack = interpolate(finalCardT, [0, 60], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center", gap: 32 }}>
      <WordReveal words={["The", "bottleneck", "isn't", "the", "AI."]} startFrame={20} fontSize={52} />
      <WordReveal words={["It's", "the", "infrastructure", "around", "it."]} startFrame={110} fontSize={52} color={RED} />
      <div style={{ height: 20 }} />
      <WordReveal words={["In", "the", "agent-first", "world,"]} startFrame={220} fontSize={38} color={DIM} />
      <WordReveal words={["scaffolding", "matters", "more"]} startFrame={280} fontSize={56} />
      <WordReveal words={["than", "the", "code", "itself."]} startFrame={360} fontSize={56} />

      {/* Final card */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", gap: 16,
        opacity: finalCardEntry, transform: `scale(${finalCardEntry})`,
        pointerEvents: "none",
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "Arial, sans-serif", color: TEXT, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          What Is Harness Engineering
        </div>
        <div style={{ fontSize: 16, fontFamily: "Arial, sans-serif", color: DIM }}>
          Built with Remotion · LabFromAbyss
        </div>
      </div>

      {/* Fade to black */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: BG, opacity: fadeBlack, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

export default HE12_CloseScene;
