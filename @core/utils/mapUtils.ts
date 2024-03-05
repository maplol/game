import { Position } from "../GameObject";
import { TileMapData, TileMapDataValue } from "../TileMap";
import tileUtils from "./tileUtils";

export type MapDataCallback = (position: Position) => TileMapDataValue;

export const createMapData = (
  width: number,
  height: number,
  callback: MapDataCallback
): TileMapData =>
  Array.from({ length: height }).map((_, y) =>
    Array.from({ length: width }).map((__, x) => callback({ x, y }))
  );

export const getTilesFromRect = (
  offset: Position,
  width: number,
  height: number
) => {
  const list: Position[] = [];
  Array.from({ length: height }).forEach((_, y) => {
    Array.from({ length: width }).forEach((__, x) => {
      list.push(tileUtils({ x, y }).add(offset));
    });
  });
  return list;
};

export const getTilesFromMapData = (
  data: TileMapData,
  filter: (value: TileMapDataValue) => boolean
) => {
  const list: Position[] = [];
  data.forEach((row, y) => {
    row.forEach((value, x) => {
      if (filter(value)) {
        list.push({ x, y });
      }
    });
  });
  return list;
};

export const mapDataString = (str: string): TileMapData => {
  const lineBreak = "\n";
  const data: TileMapData = [];
  let line = -1;
  let string = str;
  // strip any break at the end
  if (string[string.length - 1] === lineBreak) {
    string = string.slice(0, -1);
  }
  for (const char of string) {
    if (char === " ") continue;
    if (char === lineBreak) {
      data[++line] = [];
    } else {
      data[line].push(char);
    }
  }
  return data;
};

export const injectMapData = (
  source: TileMapData,
  data: TileMapData,
  // bottom left
  { x, y }: Position
) => {
  data.forEach((row, indexY, { length }) => {
    row.forEach((col, indexX) => {
      source[source.length - y - (length - indexY)][x + indexX] = col;
    });
  });
};
