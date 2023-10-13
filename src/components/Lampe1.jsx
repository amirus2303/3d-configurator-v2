import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";

import { DEG2RAD } from "three/src/math/MathUtils";
import { useRef, useEffect } from "react";
import configTexture from "../utils/configtexture";

const Lampe1 = (props) => {
  const { nodes } = useGLTF("./lampe_01/lampe_01.glb");
  const texture1 = useTexture({
    map: "./lampe_01/textures/diffuse1.jpg",
    normalMap: "./lampe_01/textures/normal1.jpg",
    roughnessMap: "./lampe_01/textures/roughness1.jpg",
    metalnessMap: "./lampe_01/textures/metalness1.jpg",
  });

  const meshRef1 = useRef();
  const meshRef2 = useRef();
  useEffect(() => {
    configTexture(meshRef1);
    configTexture(meshRef2);
  }, []);

  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));

  return (
    <>
      <color attach="background" args={["#f5babe"]} />
      <ambientLight intensity={0.1} color="pink" />
      <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
      <OrbitControls
        autoRotate
        enablePan={false}
        maxPolarAngle={DEG2RAD * 75}
        minDistance={6}
        maxDistance={10}
        target={[0, 1, 0]}
        autoRotateSpeed={0.5}
      />
      <group {...props} dispose={null} scale={ratioScale * 4}>
        <mesh
          castShadow
          geometry={nodes.abat_jour.geometry}
          position={[0, 0.487, -0.007]}
        >
          <meshStandardMaterial ref={meshRef1} {...texture1} />
        </mesh>
        <mesh
          castShadow
          geometry={nodes.Object001.geometry}
          position={[0, 0.487, -0.007]}
        >
          <meshStandardMaterial ref={meshRef2} {...texture1} />
        </mesh>
      </group>
    </>
  );
};

export default Lampe1;
