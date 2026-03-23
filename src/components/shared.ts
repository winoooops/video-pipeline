import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

// Color palette - dark theme with cyan/blue accents
export const COLORS = {
  bg: "#0a0a0f",
  bgLight: "#12121a",
  bgCard: "#1a1a2e",
  primary: "#00d4ff",
  secondary: "#7b68ee",
  accent: "#ff6b6b",
  success: "#4ecdc4",
  warning: "#ffd93d",
  text: "#e8e8f0",
  textDim: "#8888aa",
  codeBg: "#0d1117",
  codeText: "#c9d1d9",
};

export const FONTS = {
  heading: "system-ui, -apple-system, sans-serif",
  mono: "'Courier New', monospace",
};

// Fade in from below
export const useFadeInUp = (delay = 0, duration = 20) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [delay, delay + duration], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `translateY(${translateY}px)` };
};

// Typewriter effect
export const useTypewriter = (text: string, startFrame = 0, speed = 2) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.min(
    Math.floor((frame - startFrame) / speed),
    text.length
  );
  return frame >= startFrame ? text.slice(0, Math.max(0, charsToShow)) : "";
};

// Scale in
export const useScaleIn = (delay = 0, duration = 15) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [delay, delay + duration], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `scale(${scale})` };
};

// Progress bar
export const useProgress = (startFrame: number, endFrame: number) => {
  const frame = useCurrentFrame();
  return interpolate(frame, [startFrame, endFrame], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
};
