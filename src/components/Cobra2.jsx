import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import configTexture from "../utils/configtexture";
import { DEG2RAD } from "three/src/math/MathUtils";

const Cobra2 = (props) => {
  const { nodes } = useGLTF("./cobra_02/cobra_02.glb");
  const texture1 = useTexture({
    map: "./cobra_02/textures/diffuse1.jpg",
    normalMap: "./cobra_02/textures/normal1.jpg",
    roughnessMap: "./cobra_02/textures/roughness1.jpg",
    metalnessMap: "./cobra_02/textures/metalness1.jpg",
  });

  const meshRef1 = useRef();

  useEffect(() => {
    configTexture(meshRef1);
  }, []);
  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));

  return (
    <>
      <color attach="background" args={["#c0ffe1"]} />
      <ambientLight intensity={0.1} color="pink" />
      <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
      <OrbitControls
        enablePan={false}
        maxPolarAngle={DEG2RAD * 75}
        target={[0, 1, 0]}
        minDistance={6}
        maxDistance={10}
        autoRotateSpeed={0.5}
      />
      <group
        {...props}
        dispose={null}
        scale={ratioScale * 0.05}
        position={[0, 2, 0]}
      >
        <mesh
          castShadow
          geometry={nodes.New_object.geometry}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <meshStandardMaterial ref={meshRef1} {...texture1} />
        </mesh>
      </group>
    </>
  );
};

export default Cobra2;
