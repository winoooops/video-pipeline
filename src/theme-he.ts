/**
 * theme-he.ts — S22 Dark Elegant theme for Harness Engineering
 * 
 * All scenes import colors and styles from here.
 * Based on StylePrompt S22 暗夜優雅 (Dark Elegant).
 */

import React from "react";

// Background gradients
// 3-stop diagonal gradient — visible at canvas edges per kanban spec
export const BG_GRADIENT = "linear-gradient(135deg, #0a0a12 0%, #0d1117 50%, #0a0a12 100%)";
export const BG_GLOW = "radial-gradient(ellipse 80% 60% at 50% 40%, #12122a 0%, #0a0a12 45%, #0d1117 100%)";

// Core colors
export const TEXT = "#e8eaed";
export const DIM = "rgba(232,234,237,0.45)";
export const DIM_STRONG = "rgba(232,234,237,0.65)";
export const RED = "#ff6b6b";
export const GREEN = "#4ade80";
export const CYAN = "#67e8f9";
export const PURPLE = "#a78bfa";

// Element backgrounds
export const NODE_BG = "#141422";
export const NODE_BORDER = "rgba(255,255,255,0.12)";
export const CODE_BG = "#0d1117";
export const CODE_BORDER = "rgba(255,255,255,0.08)";

// Glow effects
export const GLOW_CYAN = "0 0 20px rgba(103,232,249,0.15), 0 0 40px rgba(103,232,249,0.05)";
export const GLOW_RED = "0 0 20px rgba(255,107,107,0.15), 0 0 40px rgba(255,107,107,0.05)";
export const GLOW_GREEN = "0 0 20px rgba(74,222,128,0.15), 0 0 40px rgba(74,222,128,0.05)";
export const GLOW_PURPLE = "0 0 20px rgba(167,139,250,0.15), 0 0 40px rgba(167,139,250,0.05)";
export const SHADOW_DEPTH = "0 4px 24px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.05)";

// Shared scene root style
export const sceneRootStyle: React.CSSProperties = {
  background: BG_GRADIENT,
  justifyContent: "center",
  alignItems: "center",
  padding: "80px 120px",
};

// Glow scene root (for emphasis scenes 05, 11, 12)
export const sceneGlowRootStyle: React.CSSProperties = {
  background: BG_GLOW,
  justifyContent: "center",
  alignItems: "center",
  padding: "80px 120px",
};

// Node style
export const nodeStyle: React.CSSProperties = {
  backgroundColor: NODE_BG,
  border: `2px solid ${NODE_BORDER}`,
  borderRadius: 12,
  padding: "14px 24px",
  textAlign: "center",
};

// Code block style
export const codeBlockStyle: React.CSSProperties = {
  backgroundColor: CODE_BG,
  border: `1px solid ${CODE_BORDER}`,
  borderRadius: 10,
  boxShadow: SHADOW_DEPTH,
};

// Badge style generator
export const badgeStyle = (color: string): React.CSSProperties => ({
  display: "inline-block",
  backgroundColor: `${color}1a`,
  border: `1px solid ${color}`,
  borderRadius: 6,
  padding: "6px 14px",
  fontFamily: "Arial, sans-serif",
  fontSize: 18,
  fontWeight: 700,
  color,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  boxShadow: `0 0 12px ${color}22`,
});

// Need React import for CSSProperties — imported at top
