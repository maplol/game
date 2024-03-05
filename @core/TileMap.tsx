import React, { FC, useEffect, useMemo } from "react";
import useGame from "./useGame";
import { PubSubEvent } from "./utils/createPubSub";

export type TileMapUpdateEvent = PubSubEvent<"tile-map-update", void>;

export type TileMapDataValue = number | string;
export type TileMapData = TileMapDataValue[][];

export interface TileMapResolver {
  type: TileMapDataValue;
  x: number;
  y: number;
}

interface Props {
  data: TileMapData;
  definesMapSize?: boolean;
  children: (
    type: TileMapDataValue,
    x: number,
    y: number
  ) => React.ReactElement;
}

const TileMap: FC<Props> = ({ data, children, definesMapSize = false }) => {
  const { setMapSize, publish } = useGame();
  const reversedMapData = useMemo(() => data.slice().reverse(), [data]);

  useEffect(() => {
    if (definesMapSize && reversedMapData.length) {
      const sizeX = reversedMapData[0].length;
      const sizeY = reversedMapData.length;
      setMapSize([sizeX, sizeY]);
    }
  }, [reversedMapData, definesMapSize, setMapSize]);

  return (
    <>
      {reversedMapData.map((row, y) =>
        row.map((type, x) => children(type, x, y))
      )}
    </>
  );
};

export default TileMap;
