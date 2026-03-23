/**
 * Root.tsx — Harness Engineering Video
 * 
 * Uses TransitionSeries with fade crossfades between scenes.
 * Exported as RemotionRoot for index.ts entry point.
 */

import React from "react";
import { Composition } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

import { HE01_HookScene } from "./scenes/HE01_HookScene";
import { HE02_SymphonyScene } from "./scenes/HE02_SymphonyScene";
import { HE03_InstinctScene } from "./scenes/HE03_InstinctScene";
import { HE04_CodexCantSeeScene } from "./scenes/HE04_CodexCantSeeScene";
import { HE05_GapIsAlwaysYoursScene } from "./scenes/HE05_GapIsAlwaysYoursScene";
import { HE06_DuplicationScene } from "./scenes/HE06_DuplicationScene";
import { HE07_NotANoteScene } from "./scenes/HE07_NotANoteScene";
import { HE08_ArchitectureScene } from "./scenes/HE08_ArchitectureScene";
import { HE09_TasteScene } from "./scenes/HE09_TasteScene";
import { HE10_SurfaceAreaScene } from "./scenes/HE10_SurfaceAreaScene";
import { HE11_GoalScene } from "./scenes/HE11_GoalScene";
import { HE12_CloseScene } from "./scenes/HE12_CloseScene";

// Frame counts @ 30fps — padded to compensate for 11 crossfade overlaps (20f each)
// so final timeline stays exactly 6300 frames = 210s = 3:30
const S01 = 342, S02 = 559, S03 = 543, S04 = 543, S05 = 543;
const S06 = 559, S07 = 559, S08 = 559, S09 = 559, S10 = 559;
const S11 = 559, S12 = 636;

// Crossfade duration: 20 frames (~0.67s) — tight, no dead black
const XFADE = 20;
const xfadeTiming = linearTiming({ durationInFrames: XFADE });

// 12 scenes, 11 transitions. Each transition overlaps XFADE frames.
// Total = sum(durations) - 11 * XFADE = 6520 - 220 = 6300 = 210s
const TOTAL = (S01+S02+S03+S04+S05+S06+S07+S08+S09+S10+S11+S12) - (11 * XFADE);

const scenes = [
  { dur: S01, Comp: HE01_HookScene },
  { dur: S02, Comp: HE02_SymphonyScene },
  { dur: S03, Comp: HE03_InstinctScene },
  { dur: S04, Comp: HE04_CodexCantSeeScene },
  { dur: S05, Comp: HE05_GapIsAlwaysYoursScene },
  { dur: S06, Comp: HE06_DuplicationScene },
  { dur: S07, Comp: HE07_NotANoteScene },
  { dur: S08, Comp: HE08_ArchitectureScene },
  { dur: S09, Comp: HE09_TasteScene },
  { dur: S10, Comp: HE10_SurfaceAreaScene },
  { dur: S11, Comp: HE11_GoalScene },
  { dur: S12, Comp: HE12_CloseScene },
];

// Inner composition component with crossfade transitions
const HarnessVideo: React.FC = () => (
  <TransitionSeries>
    {scenes.map(({ dur, Comp }, i) => (
      <React.Fragment key={i}>
        <TransitionSeries.Sequence durationInFrames={dur}>
          <Comp />
        </TransitionSeries.Sequence>
        {i < scenes.length - 1 && (
          <TransitionSeries.Transition
            presentation={fade()}
            timing={xfadeTiming}
          />
        )}
      </React.Fragment>
    ))}
  </TransitionSeries>
);

// Root component — what index.ts registers
export const RemotionRoot: React.FC = () => (
  <Composition
    id="HarnessEngineering"
    component={HarnessVideo}
    durationInFrames={TOTAL}
    fps={30}
    width={1920}
    height={1080}
  />
);

export default RemotionRoot;
