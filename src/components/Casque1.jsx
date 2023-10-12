import {
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { useEffect, useRef } from "react";
import configTexture from "../utils/configtexture";
import { DEG2RAD } from "three/src/math/MathUtils";

const Casque1 = (props) => {
  const { nodes } = useGLTF('./casque_01/casque_01.glb')
  const texture1 = useTexture({
    map: "./casque_01/textures/diffuse1.jpg",
    normalMap: "./casque_01/textures/normal1.jpg",
    roughnessMap: "./casque_01/textures/roughness1.jpg",
    metalnessMap: "./casque_01/textures/metalness1.jpg",
  });

  const meshRef1 = useRef();
  const meshRef2 = useRef();

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
        autoRotate
        enablePan={false}
        maxPolarAngle={DEG2RAD * 75}
        target={[0, 1, 0]}
        minDistance={6}
        maxDistance={10}
        autoRotateSpeed={0.5}
      />
      <group {...props} dispose={null} scale={ratioScale*12}>
        <mesh castShadow receiveShadow geometry={nodes.casque_metal.geometry} material={nodes.casque_metal.material}  position={[0, 0.202, 0]} >
          <meshStandardMaterial ref={meshRef1} {...texture1} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.casque_other.geometry} material={nodes.casque_other.material}  position={[0, 0.202, 0]} >
          <meshStandardMaterial ref={meshRef2} normalMap={texture1.normalMap} roughnessMap={texture1.roughnessMap} metalnessMap={texture1.metalnessMap}  color={"#ff0000"} />
        </mesh>
      </group>
    </>

  )
}

export default Casque1