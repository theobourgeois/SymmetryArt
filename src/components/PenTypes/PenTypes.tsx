import { useContext } from "react";
import { PenTypeContext } from "../../Context";
import { PEN_TYPE } from "../../Enums";
import Tool from "../Tool/Tool";

const PenType = () => {
    const { penType, setPenType } = useContext(PenTypeContext);
    return (
        <div className="w-full flex flex-col mb-1 border-b-gray-300">
            <div className="flex justify-between my-2">
                <p className="select-none text-md font-semibold">Pen Type</p>
            </div>
            <div className="flex">
                <Tool
                    target={penType}
                    value={PEN_TYPE.PEN}
                    onChange={() => setPenType(PEN_TYPE.PEN)}
                    icon={
                        <svg
                            fill="white"
                            className="scale-75"
                            xmlns="http://www.w3.org/2000/svg"
                            width="36"
                            height="36"
                            viewBox="0 0 36.001 36"
                        >
                            <path
                                id="Icon_awesome-paint-brush"
                                data-name="Icon awesome-paint-brush"
                                d="M11.744,21.75A7.116,7.116,0,0,0,4.91,26.834a1.073,1.073,0,0,1-1.026.7C3.1,27.536.688,25.59,0,25.121,0,30.911,2.667,36,9,36c5.334,0,9-3.078,9-8.451a6.092,6.092,0,0,0-.068-.642L11.744,21.75ZM32.2,0a4.294,4.294,0,0,0-2.827,1.157C15,14,13.5,14.3,13.5,18.077a6.509,6.509,0,0,0,.614,2.721L18.6,24.537a6.47,6.47,0,0,0,1.574.213c4.367,0,6.9-3.2,14.847-18.032A7.235,7.235,0,0,0,36,3.484,3.661,3.661,0,0,0,32.2,0Z"
                                transform="translate(0.001)"
                            />
                        </svg>
                    }
                ></Tool>
                {/* <Tool 
                    target={penType}
                    value={PEN_TYPE.CIRCLE} 
                    onChange={()=>setPenType(PEN_TYPE.CIRCLE)}
                    icon={
                        <div className="w-3/4 h-3/4 outline outline-white rounded-full scale-75"></div>
                    }
                ></Tool>

                <Tool 
                    target={penType}
                    value={PEN_TYPE.LINE} 
                    onChange={()=>setPenType(PEN_TYPE.LINE)}
                    icon={
                        <div className="w-1 h-3/4 bg-white -rotate-45 rounded-sm"></div>
                    }
                ></Tool>
                
                <Tool 
                    target={penType}
                    value={PEN_TYPE.ERASER} 
                    onChange={()=>setPenType(PEN_TYPE.ERASER)}
                    icon={
                        <svg fill="white" className="scale-[0.7]" xmlns="http://www.w3.org/2000/svg" width="36" height="31.5" viewBox="0 0 36 31.5">
                            <path id="Icon_awesome-eraser" data-name="Icon awesome-eraser" d="M35.011,19.261a3.375,3.375,0,0,0,0-4.773L23.761,3.239a3.375,3.375,0,0,0-4.773,0l-18,18a3.375,3.375,0,0,0,0,4.773l6.75,6.75a3.375,3.375,0,0,0,2.387.989H35.156A.844.844,0,0,0,36,32.906V30.094a.844.844,0,0,0-.844-.844H25.023l9.988-9.989Zm-21.278-4.4,9.659,9.659L18.659,29.25H10.591L4.966,23.625l8.767-8.767Z" transform="translate(0 -2.25)"/>
                        </svg>
                    }
                ></Tool> */}

                <Tool
                    target={penType}
                    value={PEN_TYPE.EYEDROP}
                    onChange={() => setPenType(PEN_TYPE.EYEDROP)}
                    icon={
                        <svg
                            className="scale-[0.7]"
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="30.849"
                            height="30.849"
                            viewBox="0 0 30.849 30.849"
                        >
                            <path
                                id="Icon_metro-eyedropper"
                                data-name="Icon metro-eyedropper"
                                d="M32.29,3.057a3.856,3.856,0,0,0-5.453,0L21.651,8.243,17.995,4.586l-4.09,4.09,3.206,3.206L2.888,26.105a1.082,1.082,0,0,0-.31.887H2.571v4.82a.964.964,0,0,0,.964.964H8.475a1.081,1.081,0,0,0,.767-.318L23.465,18.236l3.206,3.206,4.09-4.09L27.1,13.7,32.29,8.511a3.856,3.856,0,0,0,0-5.453ZM7.785,30.849H4.5V27.562L18.645,13.416,21.931,16.7Z"
                                transform="translate(-2.571 -1.928)"
                            />
                        </svg>
                    }
                ></Tool>

                <Tool
                    target={penType}
                    value={PEN_TYPE.FILL}
                    onChange={() => setPenType(PEN_TYPE.FILL)}
                    icon={
                        <svg
                            className="scale-[0.7]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="31.5"
                            height="29.25"
                            viewBox="0 0 31.5 29.25"
                        >
                            <g
                                fill="white"
                                id="Icon_ionic-md-color-fill"
                                data-name="Icon ionic-md-color-fill"
                                transform="translate(-2.25 -3.375)"
                            >
                                <path
                                    id="Path_8"
                                    data-name="Path 8"
                                    d="M9.6,5.463l2.6,4.711L2.25,20.088,15.216,32.625,25.931,22.177l3.825-.8L11.7,3.375ZM22.535,20.088H8.079L15.307,12.9Z"
                                />
                                <path
                                    id="Path_9"
                                    data-name="Path 9"
                                    d="M29.763,21.375s-3.987,4.324-3.987,6.476a3.988,3.988,0,0,0,7.973,0C33.75,25.7,29.763,21.375,29.763,21.375Z"
                                />
                            </g>
                        </svg>
                    }
                ></Tool>
            </div>
        </div>
    );
};

export default PenType;
