import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { showColorPicker } from "./components/Experience";
import Picker from "./components/Picker";
import { useAtom } from "jotai";

const App = () => {
  const [isColorPicker] = useAtom(showColorPicker);
  return (
    <>
      {isColorPicker && <Picker />}
      <Overlay />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </>
  );
};

export default App;
