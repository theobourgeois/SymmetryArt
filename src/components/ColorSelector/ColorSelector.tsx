import { FC } from "react";
import { ColorSelectorProps } from "./ColorUtils";
import useColorSelector from "./useColorSelector";

const ColorSelector: FC<ColorSelectorProps> = (props) => {
    const {
        handleColorsMouseMove,
        colorStyle,
        handleColorMouseDown,
        circleRef,
        handleBasicColorsMouseMove,
        basicColorStyle,
        handleBasicColorsMouseDown,
        knobRef,
        color,
        hexRef,
        handleHexChange,
        basicColorContainerRef,
        colorContainerRef,
        darkenColor,
    } = useColorSelector(props);

    return (
        <div className="" style={props.style}>
            <div className="w-full h-full flex flex-col">
                <div className="flex w-full h-full">
                    <div
                        className="w-full h-full "
                        style={colorStyle}
                        onMouseDown={handleColorMouseDown}
                        onClick={handleColorsMouseMove}
                        ref={colorContainerRef}
                    >
                        <div className="w-full h-full relative overflow-hidden">
                            <div
                                ref={circleRef}
                                className="overflow-hidden w-4 h-4 absolute rounded-full outline outline-2 outline-white"
                            ></div>
                        </div>
                    </div>
                    <div
                        className="w-8 mx-2 h-full relative"
                        style={basicColorStyle}
                        onMouseDown={handleBasicColorsMouseDown}
                        onClick={handleBasicColorsMouseMove}
                        ref={basicColorContainerRef}
                    >
                        <div
                            ref={knobRef}
                            className="w-[27px] h-2 drop-shadow-lg translate-x-[0px] rounded-sm bg-white absolute"
                        ></div>
                    </div>
                </div>
                <div className="w-full h-max flex flex-col items-center">
                    <div className="w-full flex items-center mt-2">
                        <div>
                            <div
                                style={{
                                    backgroundColor: color.hex,
                                    border:
                                        "2px solid " +
                                        darkenColor(color.hex, 15),
                                }}
                                className="w-8 h-8 mr-2 rounded-md"
                            ></div>
                        </div>
                        <div className="flex-wrap flex">
                            {/* <div className="flex flex-wrap mb-2">
                                <div className="mx-2 flex justify-center items-center">
                                    <p>R</p>
                                    <input onChange={e=>handleRGBChange(e, "r")} value={color.rgb.r} className="ml-2 w-12 drop-shadow-md rounded-md" type="number"></input>
                                </div>
                                <div className="mx-2 flex justify-center items-center">
                                    <p>G</p>
                                    <input onChange={e=>handleRGBChange(e, "g")} value={color.rgb.g} className="ml-2 w-12 drop-shadow-md rounded-md" type="number"></input>
                                </div>
                                <div className="mx-2 flex justify-center items-center">
                                    <p>B</p>
                                    <input onChange={e=>handleRGBChange(e, "b")} value={color.rgb.b} className="ml-2 w-12 drop-shadow-md rounded-md" type="number"></input>
                                </div>
                            </div>  */}
                            <div className="mx-2 select-none flex justify-center items-center">
                                <p>hex</p>
                                <input
                                    ref={hexRef}
                                    onChange={handleHexChange}
                                    className="pl-1 ml-2 w-20 rounded-sm bg-gray-200"
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorSelector;
