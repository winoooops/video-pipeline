/**
 * HE07_NotANoteScene.tsx — Not a Note, a Lint
 */

import React from "react";
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from "remotion";
import { springConf } from "../animations";

const BG = "#0a0a0f";
const TEXT = "#f0f0f0";
const RED = "#ff6b6b";
const GREEN = "#4ade80";
const DIM = "rgba(240,240,240,0.3)";

const SplitPane: React.FC<{ side: "left" | "right"; triggerFrame: number }> = ({ side, triggerFrame }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const t = Math.max(0, frame - triggerFrame);
  const entry = spring({ frame: t, fps, config: springConf });

  if (side === "left") {
    return (
      <div style={{
        opacity: entry, transform: `translateX(${(1 - entry) * -40}px)`,
        backgroundColor: "#111827", borderRadius: 12, padding: "24px 28px",
        border: "1px solid rgba(255,255,255,0.08)", width: 400,
      }}>
        <div style={{ fontSize: 14, fontFamily: "Arial, sans-serif", color: DIM, marginBottom: 16, letterSpacing: "0.05em" }}>
          AGENTS.md
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 22, fontFamily: "Arial, sans-serif", color: DIM, textDecoration: "line-through", lineHeight: 1.6 }}>
            ⚠️ Please don't define<br />getConcurrencyHelper() in<br />multiple places
          </div>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 64, color: RED, opacity: 0.6 }}>✗</span>
          </div>
        </div>
        <div style={{ marginTop: 16, fontSize: 16, color: DIM, fontFamily: "Arial, sans-serif", fontStyle: "italic" }}>
          Ignored. Forgotten. Unenforceable.
        </div>
      </div>
    );
  }

  return (
    <div style={{
      opacity: entry, transform: `translateX(${(1 - entry) * 40}px)`,
      backgroundColor: "#0d1117", borderRadius: 12, padding: "24px 28px",
      border: `1px solid ${RED}`, width: 560,
    }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, alignItems: "center" }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: RED }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#fbbf24" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: GREEN }} />
        <div style={{ marginLeft: 8, fontSize: 13, fontFamily: "Courier New, monospace", color: DIM }}>terminal</div>
      </div>
      <div style={{ fontFamily: "Courier New, monospace", fontSize: 17, color: RED, lineHeight: 1.8 }}>
        <div>ERROR: getConcurrencyHelper()</div>
        <div style={{ color: DIM }}>&nbsp;&nbsp;defined here. This function must only be defined at</div>
        <div style={{ color: GREEN }}>lib/concurrency.ts:1</div>
        <div style={{ color: DIM, marginTop: 8 }}>ESLint (no-restricted-syntax)</div>
        <div style={{ color: DIM }}>Parse error. Build failed.</div>
      </div>
      <div style={{ marginTop: 16, fontSize: 16, color: GREEN, fontFamily: "Arial, sans-serif", fontWeight: 600 }}>
        ✓ Enforced. Automatic. Unbypassable.
      </div>
    </div>
  );
};

export const HE07_NotANoteScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center", gap: 40 }}>
      <div style={{ fontSize: 28, fontFamily: "Arial, sans-serif", color: TEXT, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 10 }}>
        Not a note. A lint.
      </div>
      <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
        <SplitPane side="left" triggerFrame={40} />
        <SplitPane side="right" triggerFrame={80} />
      </div>
    </AbsoluteFill>
  );
};

export default HE07_NotANoteScene;
