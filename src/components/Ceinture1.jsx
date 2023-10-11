
import {
    Environment,
    Lightformer,
    OrbitControls,
    PerspectiveCamera,
    useGLTF,
    useTexture,
} from "@react-three/drei";

import { DEG2RAD } from "three/src/math/MathUtils";
import { useRef, useEffect } from "react";
import configTexture from "../utils/configtexture";

const Ceinture1 = (props) => {
    const { nodes } = useGLTF('./ceinture_01/ceinture_01.glb')
    const texture1 = useTexture({
        map: "./ceinture_01/textures/diffuse1.jpg",
        normalMap: "./ceinture_01/textures/normal1.jpg",
        roughnessMap: "./ceinture_01/textures/roughness1.jpg",
        metalnessMap: "./ceinture_01/textures/metalness1.jpg",
    });
    const meshRef1 = useRef();
    const meshRef2 = useRef();
    const meshRef3 = useRef();
    const meshRef4 = useRef();


    useEffect(() => {
        configTexture(meshRef1);
        configTexture(meshRef2);
        configTexture(meshRef3);
        configTexture(meshRef4);
    }, []);
    const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));
    return (
        <>
            <color attach="background" args={["#ffdec0"]} />
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
            <group {...props} dispose={null} scale={ratioScale * 35}>
                <mesh castShadow receiveShadow geometry={nodes.vert_metalique.geometry} position={[-0.013, 0.001, 0.061]} >
                    <meshStandardMaterial ref={meshRef1} {...texture1} />
                </mesh>
                <mesh castShadow receiveShadow geometry={nodes.ceinture.geometry} position={[-0.006, 0.049, 0.004]} >
                    <meshStandardMaterial ref={meshRef2} {...texture1} />
                </mesh>
                <mesh castShadow receiveShadow geometry={nodes.boucle.geometry} material={nodes.boucle.material} position={[-0.062, 0.031, 0.004]}  >
                    <meshStandardMaterial metalness={0.5} roughness={0} color="#f1f1f1" />
                </mesh>
                <mesh castShadow receiveShadow geometry={nodes.gris_metalique.geometry} position={[-0.013, 0.01, 0.061]} >
                    <meshStandardMaterial ref={meshRef3} {...texture1} />
                </mesh>
                <mesh castShadow receiveShadow geometry={nodes.rouge_metalique.geometry} position={[-0.001, 0.015, 0.075]} >
                    <meshStandardMaterial ref={meshRef4} {...texture1} />
                </mesh>
                <Environment>
                    <Lightformer
                        intensity={10}
                        color={"white"}
                        rotation-y={Math.PI / 2}
                        position={[-5, 1, 1]}
                        scale={[20, 1, 1]}
                    />
                    <Lightformer
                        intensity={20}
                        rotation-y={Math.PI / 2}
                        position={[-5, 4, -1]}
                        scale={[20, 0.9, 1]}
                    />
                    <Lightformer
                        intensity={50}
                        rotation-y={Math.PI / 2}
                        position={[10, 10, 10]}
                        scale={[20, 1, 1]}
                    />
                </Environment>
            </group>
        </>
    )
}

export default Ceinture1;
