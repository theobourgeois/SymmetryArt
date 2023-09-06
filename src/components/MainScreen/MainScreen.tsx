import { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { LineSizeContext, PenTypeContext } from "../../Context";
import { PenType, PEN_TYPE } from "../../Enums";
import Canvas from "../Canvas/Canvas";
import "./cursor.css"


const strokeWidth = 2
const MainScreen = () => {
    const { lineSize } = useContext(LineSizeContext);
    const { penType } = useContext(PenTypeContext);
    const cursorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [cursor, setCursor] = useState<PenType>(PEN_TYPE.EYEDROP);

    useEffect(()=> {
        setCursor(penType);
    }, [penType])

    function dynamicCursorStyle() {
       
        if(lineSize > 7) 
            return `.dynamicCursor {
                cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${lineSize}" height="${lineSize}" viewBox="0 0 ${lineSize} ${lineSize}"><circle cx="${lineSize / 2}" cy="${lineSize / 2}" r="${((lineSize - strokeWidth) / 2) - 1}" fill="none" stroke="white" stroke-width="${strokeWidth + 1}" /><circle cx="${lineSize / 2}" cy="${lineSize / 2}" r="${(lineSize - strokeWidth) / 2}" fill="none" stroke="black" stroke-width="${strokeWidth}" /></svg>') ${lineSize / 2} ${lineSize / 2}, auto;
              }`
        else 
        return `.dynamicCursor {
            cursor: url('data:image/svg+xml;utf8,${encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 36 36">
                <g>
                  <path d="M33,18H27" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
                  <path d="M33,18H27" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
          
                  <path d="M9,18H3" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
                  <path d="M9,18H3" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
          
                  <path d="M18,9V3" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
                  <path d="M18,9V3" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
          
                  <path d="M18,33V27" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="5"/>
                  <path d="M18,33V27" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
                
                </g>
              </svg>
            `)}') 8 8, auto;
          }`;
          
              
    } 

    return (
        <>
        <style dangerouslySetInnerHTML={{ __html: dynamicCursorStyle() }} />
        <div ref={containerRef} className={`${cursor === PEN_TYPE.PEN ? "dynamicCursor" : cursor} bg-gray-100 w-full h-full flex justify-center items-center`}>
            <Canvas ></Canvas>
        </div>
        </>
    )
}


export default MainScreen;