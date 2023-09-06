import { useContext } from "react";
import { LineSizeContext } from "../../Context";
import NumInput from "../NumInput/NumInput";
import RangeSlider from "../RangeSlider/RangeSlider";

const PenSizeSlider = () => {
    const {lineSize, setLineSize } = useContext(LineSizeContext);
    return (
        <div className="w-full h-12 flex flex-col mb-4">
            <div className="flex justify-between my-2">
                <p className="select-none text-md font-semibold">Pen Size</p>
                <NumInput min={1} max={100} step={1} value={lineSize} onChange={setLineSize}></NumInput>
            </div>
            <div className="mt-1">
                <RangeSlider min={1} max={100} step={1} value={lineSize} onChange={setLineSize}></RangeSlider>
            </div>
        </div>
    )
}

export default PenSizeSlider;