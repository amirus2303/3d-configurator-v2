import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";

import { DEG2RAD } from "three/src/math/MathUtils";
import { useRef, useEffect } from "react";
import configTexture from "../utils/configtexture";

const Bahut = (props) => {
  const { nodes } = useGLTF("./bahut/bahut.glb");
  const texture1 = useTexture({
    map: "./bahut/map.jpg",
    normalMap: "./bahut/normal.jpg",
    roughnessMap: "./bahut/roughness.jpg",
    metalnessMap: "./bahut/metal.jpg",
  });
  const meshRef1 = useRef();
  const meshRef2 = useRef();
  const meshRef3 = useRef();
  const meshRef4 = useRef();
  const meshRef5 = useRef();
  const meshRef6 = useRef();
  const meshRef7 = useRef();
  const meshRef8 = useRef();
  const meshRef9 = useRef();
  const meshRef10 = useRef();
  const meshRef11 = useRef();

  useEffect(() => {
    configTexture(meshRef1);
    configTexture(meshRef2);
    configTexture(meshRef3);
    configTexture(meshRef4);
    configTexture(meshRef5);
    configTexture(meshRef6);
    configTexture(meshRef7);
    configTexture(meshRef8);
    configTexture(meshRef9);
    configTexture(meshRef10);
    configTexture(meshRef11);
  }, []);
  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));
  return (
    <>
      <color attach="background" args={["#f9c0ff"]} />
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
      <group
        {...props}
        dispose={null}
        scale={ratioScale * 0.03}
        position={[0, 2.3, 0]}
        rotation={[0, Math.PI, 0]}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.upper_01.geometry}
          material={nodes.upper_01.material}
        >
          <meshStandardMaterial ref={meshRef1} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Lateral_01.geometry}
          material={nodes.Lateral_01.material}
        >
          <meshStandardMaterial ref={meshRef2} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Lateral_02.geometry}
          material={nodes.Lateral_02.material}
        >
          <meshStandardMaterial ref={meshRef3} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Front_03.geometry}
          material={nodes.Front_03.material}
        >
          <meshStandardMaterial ref={meshRef4} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Front_04.geometry}
          material={nodes.Front_04.material}
        >
          <meshStandardMaterial ref={meshRef5} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Front_05.geometry}
          material={nodes.Front_05.material}
        >
          <meshStandardMaterial ref={meshRef6} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Front_01.geometry}
          material={nodes.Front_01.material}
        >
          <meshStandardMaterial ref={meshRef7} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Front_02.geometry}
          material={nodes.Front_02.material}
        >
          <meshStandardMaterial ref={meshRef8} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Legs.geometry}
          material={nodes.Legs.material}
        >
          <meshStandardMaterial ref={meshRef9} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.down_01.geometry}
          material={nodes.down_01.material}
        >
          <meshStandardMaterial ref={meshRef10} {...texture1} />
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Back_01.geometry}
          material={nodes.Back_01.material}
        >
          <meshStandardMaterial ref={meshRef11} {...texture1} />
        </mesh>
      </group>
    </>
  );
};

export default Bahut;
