import React, { FC } from "react";

import { Player } from "./Player";
import { Ground } from "./Ground";
import { Skybox } from "./Skybox";
import { Trees } from "./Trees";
import { Canvas } from "@react-three/fiber";

const Game: FC = () => {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      gl={{ antialias: false }}
    >
      <Skybox />
      <Player position={[0, 0, 0]} />
      <Ground />
      <Trees />
    </Canvas>
  );
};

export default Game;
