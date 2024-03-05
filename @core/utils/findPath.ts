import EasyStar from "easystarjs";
import { Position } from "../GameObject";
import { WALKABLE } from "../useMapSnapshot";

type PathOptions = {
  from: Position;
  to: Position;
  map: number[][];
};

// eslint-disable-next-line new-cap
const easystar = new EasyStar.js();
easystar.setAcceptableTiles([WALKABLE]);
easystar.enableDiagonals();
easystar.disableCornerCutting();
easystar.enableSync();

const findPath = ({ from, to, map }: PathOptions) => {
  easystar.setGrid(map);
  let result: any;
  try {
    easystar.findPath(from.x, from.y, to.x, to.y, (path) => {
      if (path != null) result = path.slice(1);
    });
  } catch {
    // possibly out of range
  }
  easystar.calculate();
  return result;
};

export default findPath;
