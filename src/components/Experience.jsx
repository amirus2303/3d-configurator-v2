import React, { useState } from "react";
import { CameraControls, Grid, RenderTexture } from "@react-three/drei";

import { useThree } from "@react-three/fiber";

import { useEffect, useRef } from "react";

import { useGlobalContext } from "../context";

import Bahut from "./Bahut";
import Cobra2 from "./Cobra2";
const LazyBahut = React.lazy(() => import("./Bahut"));
const LazyCobra2 = React.lazy(() => import("./Cobra2"));

export const scenes = [
  {
    component: Bahut,
    mainColor: "#f9c0ff",
    name: "Cybertruck",
    description:
      "Better utility than a truck with more performance than a sports car",
    price: 72000,
    range: 660,
  },
  {
    component: Cobra2,
    mainColor: "#c0ffe1",
    name: "Model 3",
    description: "The car of the future",
    price: 29740,
    range: 576,
  },
];

const CameraHandler = ({ slideDistance }) => {
  const { viewport } = useThree();
  const cameraControls = useRef();
  const { slide } = useGlobalContext();
  const lastSlide = useRef(0);

  const moveToSlide = async () => {
    console.log("viewpot1", viewport.width);
    await cameraControls.current.setLookAt(
      lastSlide.current * (viewport.width + 1),
      3,
      10,
      lastSlide.current * (viewport.width + 1),
      0,
      0,
      true
    );
    console.log("viewpot2", viewport.width);
    await cameraControls.current.setLookAt(
      (slide + 1) * (viewport.width + 1),
      1,
      10,
      slide * (viewport.width + 1),
      0,
      0,
      true
    );
    console.log("viewpot3", viewport.width);
    await cameraControls.current.setLookAt(
      slide * (viewport.width + 1),
      0,
      5,
      slide * (viewport.width + 1),
      0,
      0,
      true
    );
  };

  useEffect(() => {
    // Used to reset the camera position when the viewport changes
    const resetTimeout = setTimeout(() => {
      console.log("test");
      cameraControls.current.setLookAt(
        slide * (viewport.width + slideDistance),
        0,
        5,
        slide * (viewport.width + slideDistance),
        0,
        0
      );
    }, 200);
    return () => clearTimeout(resetTimeout);
  }, [viewport]);

  useEffect(() => {
    if (lastSlide.current === slide) {
      return;
    }
    moveToSlide();
    lastSlide.current = slide;
  }, [slide]);
  return (
    <CameraControls
      ref={cameraControls}
      touches={{
        one: 0,
        two: 0,
        three: 0,
      }}
      mouseButtons={{
        left: 0,
        middle: 0,
        right: 0,
      }}
    />
  );
};

const Experience = () => {
  const viewport = useThree((state) => state.viewport);
  const [intialViewport, setInitialViewport] = useState(viewport.width);
  console.log("eeee", intialViewport);
  return (
    <>
      <ambientLight intensity={0.2} />
      <CameraHandler slideDistance={1} />
      <Grid
        position-y={-viewport.height / 2}
        sectionSize={1}
        sectionColor={"purple"}
        sectionThickness={1}
        cellSize={0.5}
        cellColor={"#6f6f6f"}
        cellThickness={0.6}
        infiniteGrid
        fadeDistance={50}
        fadeStrength={5}
      />
      {scenes.map((scene, index) => (
        <mesh key={index} position={[index * (viewport.width + 1), 0, 0]}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial toneMapped={false}>
            <RenderTexture attach="map">
              <scene.component />
            </RenderTexture>
          </meshBasicMaterial>
        </mesh>
      ))}
    </>
  );
};

export default Experience;
