import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";

import { DEG2RAD } from "three/src/math/MathUtils";
import { useRef, useEffect } from "react";
import configTexture from "../utils/configtexture";
import { DoubleSide } from "three";

const Tricot1 = (props) => {
  const { nodes } = useGLTF("./tricot_01/tricot_01.glb");

  const texture1 = useTexture({
    map: "./tricot_01/textures/diffuse1.jpg",
    normalMap: "./tricot_01/textures/normal1.jpg",
    roughnessMap: "./tricot_01/textures/roughness1.jpg",
    metalnessMap: "./tricot_01/textures/metalness1.jpg",
  });

  const meshRef1 = useRef();
  useEffect(() => {
    configTexture(meshRef1);
  }, []);

  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));

  return (
    <>
      <color attach="background" args={["#66bc66"]} />
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
      <group {...props} dispose={null} scale={ratioScale * 5}>
        <mesh
          castShadow
          geometry={nodes.Pattern2D_21356.geometry}
          position={[0, 0.333, -0.045]}
        >
          <meshStandardMaterial
            ref={meshRef1}
            {...texture1}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
};

export default Tricot1;
