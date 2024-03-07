import { useLoader } from "@react-three/fiber";
import { TextureLoader, NearestFilter, LinearMipMapLinearFilter } from "three";

export const useTexture = (src: string) => {
  const texture = useLoader(TextureLoader, src);
  texture.magFilter = NearestFilter;
  texture.minFilter = LinearMipMapLinearFilter;
  return texture;
};
