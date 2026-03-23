import { useEffect, useState } from "react";
import { continueRender, delayRender, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";

export const FontLoader: React.FC = () => {
  const [handle] = useState(() => delayRender("Loading fonts"));

  useEffect(() => {
    Promise.all([
      loadFont({ family: "Maple Mono", url: staticFile("fonts/MapleMono-CN-Light.ttf"), weight: "300" }),
      loadFont({ family: "Maple Mono", url: staticFile("fonts/MapleMono-CN-Regular.ttf"), weight: "400" }),
      loadFont({ family: "Maple Mono", url: staticFile("fonts/MapleMono-CN-SemiBold.ttf"), weight: "600" }),
      loadFont({ family: "Maple Mono", url: staticFile("fonts/MapleMono-CN-Bold.ttf"), weight: "700" }),
    ]).then(() => continueRender(handle));
  }, [handle]);

  return null;
};
