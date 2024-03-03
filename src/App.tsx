import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei";

// Define the component
const IsometricGame: React.FC = () => {
  // State to track main character's position
  const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

  // Function to handle keyboard input
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "w":
        setPosition((prev) => [prev[0], prev[1], prev[2] - 1]);
        break;
      case "a":
        setPosition((prev) => [prev[0] - 1, prev[1], prev[2]]);
        break;
      case "s":
        setPosition((prev) => [prev[0], prev[1], prev[2] + 1]);
        break;
      case "d":
        setPosition((prev) => [prev[0] + 1, prev[1], prev[2]]);
        break;
      default:
        break;
    }
  };

  // Add event listener for keyboard input
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Custom hook to update main character's position
  useFrame(() => {
    // Your code for main character's movement logic goes here
    // Update main character's position based on user input
  });

  return (
    <Canvas camera={{ position: [0, 10, 10], fov: 60 }}>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={true}
        autoRotate={true}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />

      <mesh position={position}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </Canvas>
  );
};

// Export the component
export default IsometricGame;
