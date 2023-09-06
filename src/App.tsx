import { SymmetryTypeContext, LineSizeContext, ColorContext, SegmentsContext, PenTypeContext } from "./Context"
import { useEffect, useState } from "react"
import { Color, PenType, PEN_TYPE, SymmetryType, SYMMETRY_TYPE } from "./Enums"
import { SideBar } from "./components/SideBar/SideBar";
import MainScreen from "./components/MainScreen/MainScreen";

function App() {
  const [ symmetryType, setSymmetryType ] = useState<SymmetryType>(SYMMETRY_TYPE.MANDALA);
  const [ lineSize, setLineSize ] = useState<number>(2);
  const [ color, setColor ] = useState<Color>("#FF0000");
  const [ segments, setSegments ] = useState<number>(5);
  const [ penType, setPenType ] = useState<PenType>(PEN_TYPE.PEN)

  return (
    <div className="w-screen h-screen flex flex-row-reverse">
        <SymmetryTypeContext.Provider value={{symmetryType, setSymmetryType}}>
          <LineSizeContext.Provider value={{lineSize, setLineSize}}>
            <ColorContext.Provider value={{color, setColor}}>
              <SegmentsContext.Provider value={{segments, setSegments}}>
                <PenTypeContext.Provider value={{penType, setPenType}}>
                  
                  <SideBar></SideBar>
                  <MainScreen></MainScreen>

                </PenTypeContext.Provider>
              </SegmentsContext.Provider>
            </ColorContext.Provider>
          </LineSizeContext.Provider>
        </SymmetryTypeContext.Provider>
    </div>
  )
}

export default App
