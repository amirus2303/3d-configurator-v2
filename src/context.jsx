import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useGlobalContext = () => useContext(AppContext);
const AppProvider = ({ children }) => {
  const [slide, setSlide] = useState(0);
  const [counter, setCounter] = useState(0);
  const [legs, setLegs] = useState(0);
  const [legsColor, setLegsColor] = useState("#777777");
  const [table2Texture, setTable2Texture] = useState("texture1");
  const [cobra1Texture, setCobra1Texture] = useState("texture1");
  return (
    <AppContext.Provider
      value={{
        counter,
        setCounter,
        legs,
        setLegs,
        legsColor,
        setLegsColor,
        table2Texture,
        setTable2Texture,
        cobra1Texture,
        setCobra1Texture,
        slide,
        setSlide,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
