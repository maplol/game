import React, { FC, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { usePlayerControls } from "@/hooks/usePlayerControls";
import { Mesh, MeshBasicMaterial, RepeatWrapping } from "three";
import player from "@/public/assets/player.png";
import { useTexture } from "@/hooks/useTexture";
import useAnimationFrame from "@/hooks/useAnimationFrame";
import useCameraControls from "@/hooks/useCameraControls";

interface PlayerProps {
  position: [number, number, number];
}

export const Player: FC<PlayerProps> = ({ position }) => {
  const { forward, backward, left, right } = usePlayerControls();
  const isMoving = forward || backward || left || right;

  const [playerState, setPlayerState] = useState({
    position,
    direction: "idle",
    animation: "idle",
  });
  const [lastDirection, setLastDirection] = useState("right");

  const meshRef = useRef<Mesh>(null);
  const texture = useTexture(player.src);
  const framesX = 3;
  const framesY = 3;
  const maxFrames = framesX * framesY;
  const currentFrame = useAnimationFrame(maxFrames, isMoving);

  if (texture) {
    texture.wrapS = texture.wrapT = RepeatWrapping;
    texture.repeat.set(1 / framesX, 1 / framesY);
  }

  useFrame(() => {
    if (meshRef.current && texture) {
      const material = meshRef.current.material as MeshBasicMaterial;

      if (texture.image) {
        material.map = texture;

        if (isMoving) {
          const frameOffsetX = (currentFrame % framesX) / framesX;
          const frameOffsetY = Math.floor(currentFrame / framesX) / framesY;
          console.log(frameOffsetX, frameOffsetY);

          material.map.offset.x = frameOffsetX;
          material.map.offset.y = frameOffsetY;
          material.needsUpdate = true;
        } else {
          material.map.offset.x = 0;
          material.map.offset.y = 0;
        }

        meshRef.current.scale.x = lastDirection === "left" ? -1 : 1;
      }
    }

    const updatePlayerState = (direction: string) => {
      setPlayerState((state) => ({
        ...state,
        position: [
          state.position[0] + (left ? -1 : right ? 1 : 0),
          state.position[1] + (backward ? -1 : forward ? 1 : 0),
          state.position[2],
        ],
        direction,
        animation: "run",
      }));

      setLastDirection(direction);
    };

    if (forward) updatePlayerState("forward");
    if (backward) updatePlayerState("backward");
    if (left) updatePlayerState("left");
    if (right) updatePlayerState("right");
  });

  useCameraControls(meshRef);

  return (
    <mesh position={playerState.position} ref={meshRef}>
      <planeGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
};
