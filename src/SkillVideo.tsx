import { AbsoluteFill, Series } from "remotion";
import { C } from "./theme";

import { HookScene } from "./scenes/HookScene";
import { WrongApproachScene } from "./scenes/WrongApproachScene";
import { WhatIsSkillScene } from "./scenes/WhatIsSkillScene";
import { FolderStructureScene } from "./scenes/FolderStructureScene";
import { ProgressiveDisclosureScene } from "./scenes/ProgressiveDisclosureScene";
import { ContextBudgetScene } from "./scenes/ContextBudgetScene";
import { SkillsVsRestScene } from "./scenes/SkillsVsRestScene";
import { Tip1Scene } from "./scenes/Tip1Scene";
import { Tip2Scene } from "./scenes/Tip2Scene";
import { Tip3Scene } from "./scenes/Tip3Scene";
import { Tip4Scene } from "./scenes/Tip4Scene";
import { TestingScene } from "./scenes/TestingScene";
import { ResultsTableScene } from "./scenes/ResultsTableScene";
import { TakeawayScene } from "./scenes/TakeawayScene";
import { OutroScene } from "./scenes/OutroScene";
import { FontLoader } from "./FontLoader";

// Crisis-driven narrative:
// Hook → Wrong Approach → What is a Skill → Folder → Progressive Disclosure
// → Context Crisis → Skills vs Rest → Tips 1-4 → Testing → Results → Takeaway → Outro
// ~100s @ 30fps = 3000 frames

export const SkillVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <FontLoader />
      <Series>
        <Series.Sequence durationInFrames={240}>{/* 8s - Hook */}
          <HookScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={210}>{/* 7s - Wrong approach */}
          <WrongApproachScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>{/* 6s - What is a skill */}
          <WhatIsSkillScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={210}>{/* 7s - Folder */}
          <FolderStructureScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={210}>{/* 7s - Progressive */}
          <ProgressiveDisclosureScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={210}>{/* 7s - Context crisis */}
          <ContextBudgetScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>{/* 6s - vs rest */}
          <SkillsVsRestScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>{/* 6s */}
          <Tip1Scene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>{/* 6s */}
          <Tip2Scene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>{/* 6s */}
          <Tip3Scene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>{/* 6s */}
          <Tip4Scene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>{/* 6s */}
          <TestingScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>{/* 8s - Results table */}
          <ResultsTableScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>{/* 6s */}
          <TakeawayScene />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>{/* 8s - Outro */}
          <OutroScene />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
