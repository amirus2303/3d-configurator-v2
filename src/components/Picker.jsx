import { HexColorPicker } from "react-colorful";
import { useSnapshot } from "valtio";
import { state } from "./Montre1";

const Picker = () => {
  const snap = useSnapshot(state);

  const changeColorHandler = (color) => {
    state.items[snap.current] = color;
  };
  return (
    <div className="picker">
      <HexColorPicker
        color={snap.items[snap.current]}
        onChange={changeColorHandler}
      />
    </div>
  );
};

export default Picker;
