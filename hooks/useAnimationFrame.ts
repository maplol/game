import { useState, useEffect } from "react";

const useAnimationFrame = (maxFrames: number, isMoving: boolean) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (isMoving) {
      const interval = setInterval(() => {
        setFrame((prevFrame) => (prevFrame + 1) % maxFrames);
      }, 1000 / maxFrames);
      setFrame(5);
      console.log(frame);
      return () => clearInterval(interval);
    }
  }, [maxFrames, isMoving, frame]);

  return frame;
};

export default useAnimationFrame;
