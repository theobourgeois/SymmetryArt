import { useContext } from "react";
import { SegmentsContext } from "../../Context";
import NumInput from "../NumInput/NumInput";
import RangeSlider from "../RangeSlider/RangeSlider";

const SegmentSlider = () => {
    const { segments, setSegments } = useContext(SegmentsContext);
    return (
        <div className="w-full h-12 flex flex-col mb-8">
            <div className="flex justify-between my-2">
                <p className="select-none text-md font-semibold">Segments</p>
                <NumInput min={1} max={300} step={1} value={segments} onChange={setSegments}></NumInput>
            </div>
            <div className="mt-1">
                <RangeSlider min={1} max={300} step={1} value={segments} onChange={setSegments}></RangeSlider>
            </div>
        </div>
    )
}
export default SegmentSlider;