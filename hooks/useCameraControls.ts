import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Vector3, Mesh } from "three";

const useCameraControls = (
  playerRef: React.MutableRefObject<Mesh | null>,
  minZ = 2,
  maxZ = 10
) => {
  const { camera } = useThree();
  const prevPosition = useRef<Vector3>(
    playerRef.current ? playerRef.current.position.clone() : new Vector3()
  );
  const wheelEventRef = useRef<EventListener>();

  useEffect(() => {
    wheelEventRef.current = (event: Event) => {
      event.preventDefault();

      let newZ =
        camera.position.z + ((event as WheelEvent).deltaY > 0 ? 1 : -1);
      newZ = Math.max(Math.min(newZ, maxZ), minZ);

      camera.position.z = newZ;
    };

    window.addEventListener("wheel", wheelEventRef.current, { passive: false });

    return () => {
      window.removeEventListener(
        "wheel",
        wheelEventRef.current as EventListener
      );
    };
  }, [camera, minZ, maxZ]);

  useEffect(() => {
    const follow = () => {
      if (playerRef.current) {
        // Плавно перемещаем камеру к позиции игрока
        camera.position.x = playerRef.current.position.x;
        camera.position.y = playerRef.current.position.y;
        camera.lookAt(playerRef.current.position);

        prevPosition.current.copy(playerRef.current.position);
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);

      if (
        playerRef.current &&
        !prevPosition.current.equals(playerRef.current.position)
      ) {
        follow();
      }
    };

    animate();
  }, [camera, playerRef]);
};

export default useCameraControls;
