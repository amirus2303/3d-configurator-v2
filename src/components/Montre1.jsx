import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";

import { DEG2RAD } from "three/src/math/MathUtils";
import { useRef } from "react";

const Montre1 = (props) => {
  const { nodes } = useGLTF("./montre_01/montre_01.glb");

  const meshRef1 = useRef();
  const meshRef2 = useRef();
  const meshRef3 = useRef();

  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));
  return (
    <>
      <color attach="background" args={["#99ccff"]} />
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
      <group {...props} dispose={null} scale={ratioScale * 40}>
        <mesh
          geometry={nodes.ecran.geometry}
          material={nodes.ecran.material}
          position={[0.001, 0.04, 0]}
        >
          <meshStandardMaterial
            ref={meshRef1}
            color={"#3c3d38"}
            roughness={0.1}
          />
        </mesh>
        <mesh
          geometry={nodes.bouton.geometry}
          material={nodes.bouton.material}
          position={[0.001, 0.04, 0]}
        >
          <meshPhysicalMaterial
            ref={meshRef2}
            color={"#3c3d38"}
            roughness={0.3}
          />
        </mesh>
        <mesh
          geometry={nodes.bracelet.geometry}
          material={nodes.bracelet.material}
          position={[0.018, 0.06, 0.001]}
        >
          <meshPhysicalMaterial
            ref={meshRef3}
            color={"#e1833b"}
            roughness={0.3}
          />
        </mesh>
      </group>
    </>
  );
};

export default Montre1;
