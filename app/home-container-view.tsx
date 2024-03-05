"use client";

import { Global } from "@emotion/react";
import React from "react";
import AssetLoader from "../@core/AssetLoader";
import Game from "../@core/Game";
import Scene from "../@core/Scene";
import SceneManager from "../@core/SceneManager";
import useWindowSize from "../@core/useWindowSize";
import OfficeScene from "../scenes/OfficeScene";
import OtherScene from "../scenes/OtherScene";
import soundData from "../soundData";
import spriteData from "../spriteData";
import globalStyles from "../styles/global";

const urls = [
  ...Object.values(spriteData).map((data) => data.src),
  ...Object.values(soundData).map((data) => data.src),
  // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

export default function HomeContainerView() {
  const [width, height] = useWindowSize();

  return (
    <>
      <Global styles={globalStyles} />

      <Game cameraZoom={80}>
        <AssetLoader urls={urls} placeholder="Loading assets ...">
          <SceneManager defaultScene="office">
            <Scene id="office">
              <OfficeScene />
            </Scene>
            <Scene id="other">
              <OtherScene />
            </Scene>
          </SceneManager>
        </AssetLoader>
      </Game>
    </>
  );
}