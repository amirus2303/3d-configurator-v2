import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";

import { DEG2RAD } from "three/src/math/MathUtils";
import { useRef, useEffect } from "react";
import configTexture from "../utils/configtexture";

const Ceinture1 = (props) => {
  const { nodes } = useGLTF("./ceinture_01/ceinture_01.glb");
  const texture1 = useTexture({
    map: "./ceinture_01/textures/diffuse1.jpg",
    normalMap: "./ceinture_01/textures/normal1.jpg",
    roughnessMap: "./ceinture_01/textures/roughness1.jpg",
    metalnessMap: "./ceinture_01/textures/metalness1.jpg",
  });
  const meshRef1 = useRef();

  useEffect(() => {
    configTexture(meshRef1);
  }, []);
  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));
  return (
    <>
      <color attach="background" args={["#ffdec0"]} />
      <ambientLight intensity={0.1} color="pink" />
      <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
      <OrbitControls
        enablePan={false}
        maxPolarAngle={DEG2RAD * 75}
        minDistance={6}
        maxDistance={10}
        target={[0, 1, 0]}
        autoRotateSpeed={0.5}
      />
      <group {...props} dispose={null} scale={ratioScale * 35}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ceinture.geometry}
          material={nodes.ceinture.material}
          position={[-0.006, 0.049, 0.004]}
        >
          <meshStandardMaterial ref={meshRef1} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.boucle.geometry}
          material={nodes.boucle.material}
          position={[-0.062, 0.031, 0.004]}
        >
          <meshStandardMaterial metalness={0.5} roughness={0} color="#f1f1f1" />
        </mesh>
      </group>
    </>
  );
};

export default Ceinture1;
