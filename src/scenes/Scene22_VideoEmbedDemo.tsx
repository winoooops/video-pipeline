/**
 * Scene22_VideoEmbedDemo.tsx
 * 
 * Proof of Concept: Video embedding + animated overlay inside Remotion.
 * 
 * Demonstrates:
 * - Video playback using <Video> (from 'remotion')
 * - OffthreadVideo for non-blocking decode of heavy clips
 * - Animated text overlay composited on top of video
 * - Aspect-ratio aware scaling
 * 
 * BLOCKED ON: Sample mp4 clip from winoooops
 * Path expected: sample-clips/demo-clip.mp4
 * 
 * Until clip is provided, this scene renders a placeholder
 * with the same timing/layout so composition doesn't break.
 */

import React from "react";
import {
  Video,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  AbsoluteFill,
  Sequence,
} from "remotion";

const VIDEO_PATH = "../../sample-clips/demo-clip.mp4";

// Demo overlay — animated text that floats in over the video
const VideoOverlay: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const t = frame - start;
  const opacity = interpolate(t, [0, 20], [0, 1], { extrapolateLeft: "clamp" });
  const slideY = interpolate(t, [0, 20], [30, 0], { extrapolateLeft: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        left: 60,
        right: 60,
        opacity,
        transform: `translateY(${slideY}px)`,
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.75)",
          padding: "20px 32px",
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <p
          style={{
            color: "#E8F4FD",
            fontSize: 28,
            fontWeight: 600,
            fontFamily: "Arial, sans-serif",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Real footage. Animated overlays.
        </p>
        <p
          style={{
            color: "#7EB8D8",
            fontSize: 20,
            fontFamily: "Arial, sans-serif",
            margin: "8px 0 0 0",
          }}
        >
          Remotion compositing is production-ready.
        </p>
      </div>
    </div>
  );
};

// Thumbnail badge — top right corner label
const BadgeOverlay: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const t = frame - start;

  const scale = interpolate(t, [0, 15], [0.8, 1], { extrapolateLeft: "clamp" });
  const opacity = interpolate(t, [0, 15], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: 40,
        right: 50,
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: "top right",
        background: "linear-gradient(135deg, #FF6B6B, #C44569)",
        padding: "8px 20px",
        borderRadius: 6,
      }}
    >
      <span
        style={{
          color: "#fff",
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "Arial, sans-serif",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        LIVE DEMO
      </span>
    </div>
  );
};

// Placeholder version — renders without the actual video clip
const PlaceholderScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const progress = frame / durationInFrames;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Animated grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Central content */}
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#fff",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          VIDEO
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#4ECDC4",
            fontFamily: "Arial, sans-serif",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            marginTop: 4,
          }}
        >
          EMBED
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.5)",
            fontFamily: "Arial, sans-serif",
            marginTop: 24,
          }}
        >
          awaiting sample clip from winoooops
        </div>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 60,
          right: 60,
          height: 4,
          background: "rgba(255,255,255,0.1)",
          borderRadius: 2,
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: "linear-gradient(90deg, #4ECDC4, #45B7AA)",
            borderRadius: 2,
            transition: "none",
          }}
        />
      </div>

      <VideoOverlay start={15} />
      <BadgeOverlay start={10} />
    </AbsoluteFill>
  );
};

// Full video scene — uncomment when clip is available
const VideoScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Video as bottom layer */}
      <Video
        src={VIDEO_PATH}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay text on top */}
      <VideoOverlay start={15} />
      <BadgeOverlay start={10} />
    </AbsoluteFill>
  );
};

// Main export — switch between PlaceholderScene and VideoScene
export const Scene22_VideoEmbedDemo: React.FC = () => {
  // Clip provided by winoooops — using full VideoScene:
  return <VideoScene />;
};

export default Scene22_VideoEmbedDemo;
