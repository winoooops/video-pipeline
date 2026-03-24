/**
 * HE12_CloseScene.tsx — The Close
 * 
 * Word-by-word reveal of closing statement.
 * S22 Dark Elegant: gradient bg, radial glow.
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill, interpolate } from "remotion";

import { springConf } from "../animations";

const TEXT = "#e8eaed";
const RED = "#ff6b6b";
const DIM = "rgba(232,234,237,0.5)";
const WORD_DELAY = 10;

const WordReveal: React.FC<{
  text: string;
  startFrame: number;
  fontSize?: number;
  color?: string;
}> = ({ text, startFrame, fontSize = 48, color = TEXT }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const words = text.split(" ");

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "baseline",
    }}>
      {words.map((word, i) => {
        const t = Math.max(0, frame - (startFrame + i * WORD_DELAY));
        const entry = spring({ frame: t, fps, config: springConf });
        return (
          <span key={i} style={{
            display: "inline-block",
            fontSize,
            fontWeight: 800,
            fontFamily: "Arial, sans-serif",
            color,
            letterSpacing: "-0.03em",
            opacity: entry,
            transform: `scale(${entry})`,
            marginRight: i < words.length - 1 ? fontSize * 0.3 : 0,
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
    <AbsoluteFill style={{
      background: "radial-gradient(ellipse 60% 50% at 50% 40%, #12122a 0%, #0a0a12 50%, #0d1117 100%)",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: 24,
      padding: "80px 120px",
    }}>
      <WordReveal text="The bottleneck isn't the AI." startFrame={20} fontSize={52} />
      <WordReveal text="It's the infrastructure around it." startFrame={110} fontSize={52} color={RED} />

      <div style={{ height: 16 }} />

      <WordReveal text="In the agent-first world," startFrame={220} fontSize={38} color={DIM} />
      <WordReveal text="scaffolding matters more" startFrame={280} fontSize={56} />
      <WordReveal text="than the code itself." startFrame={360} fontSize={56} />

      {/* Final card */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center", gap: 16,
        opacity: finalCardEntry, transform: `scale(${finalCardEntry})`,
        pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 50% at 50% 40%, #12122a 0%, #0a0a12 50%, #0d1117 100%)",
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "Arial, sans-serif", color: TEXT, letterSpacing: "0.05em", textTransform: "uppercase" }}>
          What Is Harness Engineering
        </div>
        <div style={{ fontSize: 18, fontFamily: "Arial, sans-serif", color: DIM }}>
          Built with Remotion · LabFromAbyss
        </div>
      </div>

      {/* Fade to black */}
      <div style={{ position: "absolute", inset: 0, background: "#0a0a12", opacity: fadeBlack, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

export default HE12_CloseScene;
