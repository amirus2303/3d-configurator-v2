import React, { Suspense } from "react";
import {
  CameraControls,
  Grid,
  RenderTexture,
  AccumulativeShadows,
  RandomizedLight,
  Html,
  Environment,
  Lightformer,
} from "@react-three/drei";

import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import { Perf } from "r3f-perf";

const LazyBahut = React.lazy(() => import("./Bahut"));
const LazyCobra2 = React.lazy(() => import("./Cobra2"));
const LazyCeinture1 = React.lazy(() => import("./Ceinture1"));
const LazyCasque1 = React.lazy(() => import("./Casque1"));
const LazyLampe1 = React.lazy(() => import("./Lampe1"));
const LazyTricot1 = React.lazy(() => import("./Tricot1"));
const LazyMontre1 = React.lazy(() => import("./Montre1"));

export const slideContext = atom(0);

export const scenes = [
  {
    component: LazyBahut,
    mainColor: "#f9c0ff",
    name: "Bahut",
    description: "Bahut home 4 portes 2",
    price: 72000,
    range: 100,
  },
  {
    component: LazyCobra2,
    mainColor: "#c0ffe1",
    name: "Turbo Ventilo",
    description: "Ventilateur éléctrique 500 watt",
    price: 8000,
    range: 150,
  },
  {
    component: LazyCeinture1,
    mainColor: "#c0ffe1",
    name: "Ceinture Valentino",
    description: "Ceinture cuir 80cm",
    price: 8000,
    range: 150,
  },
  {
    component: LazyCasque1,
    mainColor: "#c0ffe1",
    name: "Casque Vortex",
    description: "4D sound power",
    price: 14000,
    range: 100,
  },
  {
    component: LazyLampe1,
    mainColor: "#f5babe",
    name: "Lampe Paris",
    description: "Design, post modern",
    price: 14000,
    range: 100,
  },
  {
    component: LazyTricot1,
    mainColor: "#99d299",
    name: "Maillot EN",
    description: "Zellidj Algérie",
    price: 14000,
    range: 100,
  },
  {
    component: LazyMontre1,
    mainColor: "#99ccff",
    name: "Montre Gladius",
    description: "Smart display",
    price: 14000,
    range: 100,
  },
];

// export const scenes = [
//     {
//         component: LazyBahut,
//         mainColor: '#f9c0ff',
//         name: 'Bahut',
//         description: 'Bahut home 4 portes 2',
//         price: 72000,
//         range: 100,
//     },
//     {
//         component: LazyCeinture1,
//         mainColor: '#c0ffe1',
//         name: 'Ceinture Valentino',
//         description: 'Ceinture cuir 80cm',
//         price: 8000,
//         range: 150,
//     }
// ];

const CameraHandler = ({ slideDistance }) => {
  const { viewport } = useThree();
  const cameraControls = useRef();
  const [slide] = useAtom(slideContext);
  const lastSlide = useRef(0);

  const moveToSlide = async () => {
    await cameraControls.current.setLookAt(
      lastSlide.current * (viewport.width + 1),
      3,
      10,
      lastSlide.current * (viewport.width + 1),
      0,
      0,
      true
    );
    await cameraControls.current.setLookAt(
      (slide + 1) * (viewport.width + 1),
      1,
      10,
      slide * (viewport.width + 1),
      0,
      0,
      true
    );
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

  return (
    <>
      {/* <Perf /> */}
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
      <Suspense
        fallback={
          <Html>
            <h3>Chargement...</h3>
          </Html>
        }
      >
        {scenes.map((scene, index) => (
          <mesh key={index} position={[index * (viewport.width + 1), 0, 0]}>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <meshBasicMaterial toneMapped={false}>
              <RenderTexture attach="map">
                <scene.component />
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
                {/* <AccumulativeShadows
                  alphaTest={0.75}
                  opacity={0.8}
                  scale={12}
                  temporal
                  frames={100}
                  color="black"
                >
                  <RandomizedLight
                    intensity={Math.PI}
                    amount={8}
                    radius={7}
                    ambient={0.5}
                    position={[5, 5, -10]}
                    bias={0.001}
                  />
                </AccumulativeShadows> */}
              </RenderTexture>
            </meshBasicMaterial>
          </mesh>
        ))}
      </Suspense>
      {/* <Suspense fallback={<Html><h3>Chargement...</h3></Html>} >
                <mesh position={[0 * (viewport.width + 1), 0, 0]}>
                    <planeGeometry args={[viewport.width, viewport.height]} />
                    <meshBasicMaterial toneMapped={false}>
                        <RenderTexture attach='map'>
                            {slide === 0 && <LazyBahut />}
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
                            <AccumulativeShadows alphaTest={0.75} opacity={0.8} scale={12} temporal frames={100} color='black'  >
                                <RandomizedLight intensity={Math.PI} amount={8} radius={7} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
                            </AccumulativeShadows>
                        </RenderTexture>
                    </meshBasicMaterial>
                </mesh>

                <mesh position={[1 * (viewport.width + 1), 0, 0]}>
                    <planeGeometry args={[viewport.width, viewport.height]} />
                    <meshBasicMaterial toneMapped={false}>
                        <RenderTexture attach='map'>
                            {slide === 1 && <LazyCobra2 />}
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
                            <AccumulativeShadows alphaTest={0.75} opacity={0.8} scale={12} temporal frames={100} color='black'  >
                                <RandomizedLight intensity={Math.PI} amount={8} radius={7} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
                            </AccumulativeShadows>
                        </RenderTexture>
                    </meshBasicMaterial>
                </mesh>

                <mesh position={[2 * (viewport.width + 1), 0, 0]}>
                    <planeGeometry args={[viewport.width, viewport.height]} />
                    <meshBasicMaterial toneMapped={false}>
                        <RenderTexture attach='map'>
                            {slide === 2 && <LazyCeinture1 />}
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
                            <AccumulativeShadows alphaTest={0.75} opacity={0.8} scale={12} temporal frames={100} color='black'  >
                                <RandomizedLight intensity={Math.PI} amount={8} radius={7} ambient={0.5} position={[5, 5, -10]} bias={0.001} />
                            </AccumulativeShadows>
                        </RenderTexture>
                    </meshBasicMaterial>
                </mesh>
                <Environment preset='city' />
            </Suspense> */}
    </>
  );
};

export default Experience;
