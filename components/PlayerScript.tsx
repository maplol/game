import React, { useEffect, useState } from "react";
import { Position } from "../@core/GameObject";
import { InteractableRef } from "../@core/Interactable";
import { MoveableRef } from "../@core/Moveable";
import useCollisionTest from "../@core/useCollisionTest";
import useGameLoop from "../@core/useGameLoop";
import useGameObject from "../@core/useGameObject";
import useKeyPress from "../@core/useKeyPress";
import usePathfinding from "../@core/usePathfinding";
import tileUtils from "../@core/utils/tileUtils";

export default function PlayerScript() {
  const { getComponent, transform } = useGameObject();
  const testCollision = useCollisionTest();
  const findPath = usePathfinding();
  const [path, setPath] = useState<Position[]>([]);

  // key controls
  const leftKey = useKeyPress(["ArrowLeft", "KeyA"]);
  const rightKey = useKeyPress(["ArrowRight", "KeyD"]);
  const upKey = useKeyPress(["ArrowUp", "KeyW"]);
  const downKey = useKeyPress(["ArrowDown", "KeyS"]);

  useGameLoop(() => {
    const direction = {
      x: -Number(leftKey) + Number(rightKey),
      y: Number(upKey) - Number(downKey),
    };
    const nextPosition = tileUtils(transform).add(direction);
    // is same position?
    if (tileUtils(nextPosition).equals(transform)) return;

    // is already moving?
    if (!getComponent<MoveableRef>("Moveable").canMove()) return;

    // will cut corner?
    const horizontal = { ...transform, x: nextPosition.x };
    const vertical = { ...transform, y: nextPosition.y };
    const canCross =
      direction.x !== 0 && direction.y !== 0
        ? // test diagonal movement
          testCollision(horizontal) && testCollision(vertical)
        : true;

    if (canCross) {
      setPath([nextPosition]);
    }
  });

  // walk the path
  useEffect(() => {
    if (!path || !path.length) return;

    const [nextPosition] = path;

    (async () => {
      const anyAction =
        (await getComponent<MoveableRef>("Moveable")?.move(nextPosition)) ||
        (path.length === 1 && // try interaction on last step of path
          (await getComponent<InteractableRef>("Interactable")?.interact(
            nextPosition
          )));

      if (anyAction) {
        // proceed with next step in path
        setPath((current) => current.slice(1));
      }
    })();
  }, [path, getComponent]);

  return null;
}
