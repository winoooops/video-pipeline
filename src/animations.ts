import { interpolate, useCurrentFrame } from "remotion";

// Fade in from below
export const useFadeInUp = (delay = 0, duration = 20) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateY = interpolate(frame, [delay, delay + duration], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `translateY(${translateY}px)` };
};

// Scale in
export const useScaleIn = (delay = 0, duration = 15) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [delay, delay + duration], [0.9, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `scale(${scale})` };
};

// Typewriter
export const useTypewriter = (text: string, startFrame = 0, speed = 2) => {
  const frame = useCurrentFrame();
  const charsToShow = Math.min(
    Math.floor((frame - startFrame) / speed),
    text.length
  );
  return frame >= startFrame ? text.slice(0, Math.max(0, charsToShow)) : "";
};

// Fade in from left
export const useFadeInLeft = (delay = 0, duration = 20) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const translateX = interpolate(frame, [delay, delay + duration], [-40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, transform: `translateX(${translateX}px)` };
};

// Spring config — import this and pass as `config` to the spring() function
export const springConf = {
  damping: 20,
  stiffness: 200,
  mass: 0.5,
};
