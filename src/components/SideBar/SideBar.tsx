import { useContext, useRef, useState } from "react";
import { ColorContext } from "../../Context";
import ColorSelector from "../ColorSelector/ColorSelector";
import PenSizeSlider from "../PenSizeSlider/PenSizeSlider";
import PenType from "../PenTypes/PenTypes";
import SegmentSlider from "../SegmentSlider/SegmentSlider";
import SymmetryTypes from "../SymmetryTypes/SymmetryTypes";

export const SideBar = () => {
    const { color, setColor } = useContext(ColorContext);
    const [showing, setShowing] = useState(true);
    const sideBarArrowRef = useRef<SVGSVGElement>(null)
     
    function onToggleOpenSideBar() {
        if(!sideBarArrowRef.current)
            return;
        if(showing)
            sideBarArrowRef.current.style.transform = "rotate(180deg)";
        else 
        sideBarArrowRef.current.style.transform = "rotate(0)";
        sideBarArrowRef.current.style.transition = "100ms";
        setShowing(!showing)
    }

    
    if(!showing) {
        return (
            <div className="w-12 px-4 transition-[50ms]">
                <div className="w-full h-full flex flex-col items-center"> 
                    <div onClick={onToggleOpenSideBar} className="m-4 w-full -scale-100 cursor-pointer" >
                        <svg ref={sideBarArrowRef} xmlns="http://www.w3.org/2000/svg" width="13.503" height="23.619" viewBox="0 0 13.503 23.619">
                            <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M15.321,18l8.937-8.93a1.688,1.688,0,0,0-2.391-2.384L11.742,16.8a1.685,1.685,0,0,0-.049,2.327L21.86,29.32a1.688,1.688,0,0,0,2.391-2.384Z" transform="translate(-11.251 -6.194)"/>
                        </svg>
                    </div> 
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="w-max px-5 bg-white transition-[50ms]">
                <div className="w-full h-full flex flex-col items-center"> 
                    <div onClick={onToggleOpenSideBar} className="m-4 w-full -scale-100 cursor-pointer">
                        <svg ref={sideBarArrowRef} xmlns="http://www.w3.org/2000/svg" width="13.503" height="23.619" viewBox="0 0 13.503 23.619">
                            <path id="Icon_ionic-ios-arrow-back" data-name="Icon ionic-ios-arrow-back" d="M15.321,18l8.937-8.93a1.688,1.688,0,0,0-2.391-2.384L11.742,16.8a1.685,1.685,0,0,0-.049,2.327L21.86,29.32a1.688,1.688,0,0,0,2.391-2.384Z" transform="translate(-11.251 -6.194)"/>
                        </svg>
                    </div> 
                    <div className="w-full flex flex-col my-2">
                        <p className="select-none text-md font-semibold">Colour</p>
                    </div>
                    <ColorSelector value={color} style={{width: "100%", height: "20%", margin: "0 1em 1em 1em"}} onChange={setColor}></ColorSelector>
                    
                    <div className="w-full mt-2 h-[1px] bg-gray-100"></div>  
                    <PenSizeSlider></PenSizeSlider>

                    <div className="w-full mt-2 h-[1px] bg-gray-100"></div>
                    <PenType></PenType>

                    <div className="w-full mt-2 h-[1px] bg-gray-100"></div>
                    <SymmetryTypes></SymmetryTypes>

                    <div className="w-full mt-2 h-[1px] bg-gray-100"></div>
                    <SegmentSlider></SegmentSlider>

                    

                </div>
            </div>
        )
    }
   
}
export default SideBar;