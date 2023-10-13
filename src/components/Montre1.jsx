import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { DEG2RAD } from "three/src/math/MathUtils";
import { useRef, useEffect, useState } from "react";
import { proxy, useSnapshot } from "valtio";
import { useAtom } from "jotai";
import { showColorPicker } from "./Experience";

export const state = proxy({
  current: null,
  items: {
    bracelet: "#e1833b",
    ecran: "#3c3d38",
    bouton: "#3c3d38",
  },
});

const Montre1 = (props) => {
  const { nodes } = useGLTF("./montre_01/montre_01.glb");
  const snap = useSnapshot(state);
  const [isColorPicker, setIsColorPicker] = useAtom(showColorPicker);
  const [hovered, setHoverd] = useState(false);

  const meshRef1 = useRef();
  const meshRef2 = useRef();
  const meshRef3 = useRef();

  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));

  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="#fff-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    if (hovered) {
      console.log("hoverd");
      document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
        cursor
      )}'), auto`;
    } else {
      console.log("not hoverd");
      document.body.style.cursor = "auto";
    }
  }, [hovered]);

  return (
    <>
      <color attach="background" args={["#99ccff"]} />
      <ambientLight intensity={0.1} color="pink" />
      <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
      <OrbitControls
        autoRotate={!isColorPicker}
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
        scale={ratioScale * 40}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoverd(e.object.material.name);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHoverd(null);
          //state.current = null;
          //setIsColorPicker(true);
        }}
        onPointerDown={(e) => {
          e.stopPropagation();
          state.current = e.object.material.name;
          setIsColorPicker(true);
          setHoverd(null);
        }}
        onPointerMissed={(e) => {
          e.stopPropagation();
          state.current = null;
          setIsColorPicker(false);
          setHoverd(null);
        }}
      >
        <mesh
          geometry={nodes.ecran.geometry}
          material={nodes.ecran.material}
          position={[0.001, 0.04, 0]}
        >
          <meshStandardMaterial
            name="ecran"
            ref={meshRef1}
            color={snap.items.ecran}
            roughness={0.1}
          />
        </mesh>
        <mesh
          geometry={nodes.bouton.geometry}
          material={nodes.bouton.material}
          position={[0.001, 0.04, 0]}
        >
          <meshPhysicalMaterial
            name="bouton"
            ref={meshRef2}
            color={snap.items.bouton}
            roughness={0.3}
          />
        </mesh>
        <mesh
          geometry={nodes.bracelet.geometry}
          material={nodes.bracelet.material}
          position={[0.018, 0.06, 0.001]}
        >
          <meshPhysicalMaterial
            name="bracelet"
            ref={meshRef3}
            color={snap.items.bracelet}
            roughness={0.3}
          />
        </mesh>
      </group>
    </>
  );
};

export default Montre1;
