import { useContext } from "react";
import { SymmetryTypeContext } from "../../Context";
import { SYMMETRY_TYPE } from "../../Enums";
import Tool from "../Tool/Tool";
import mandala from "../Icons/mandala.svg";
import reflection from "../Icons/reflection.svg";
import vertical_reflection from "../Icons/vertical_reflection.svg";

const SymmetryTypes = () => {
    const { symmetryType, setSymmetryType } = useContext(SymmetryTypeContext);

    return (
        <div className="w-full flex flex-col mb-2">
            <div className="flex justify-between my-2">
                <p className="select-none text-md font-semibold">
                    Symmetry Type
                </p>
            </div>
            <div className="flex">
                <Tool
                    target={symmetryType}
                    value={SYMMETRY_TYPE.MANDALA}
                    onChange={() => setSymmetryType(SYMMETRY_TYPE.MANDALA)}
                    src={mandala}
                ></Tool>

                <Tool
                    target={symmetryType}
                    value={SYMMETRY_TYPE.VERTICAL}
                    onChange={() => setSymmetryType(SYMMETRY_TYPE.VERTICAL)}
                    src={reflection}
                ></Tool>

                <Tool
                    target={symmetryType}
                    value={SYMMETRY_TYPE.CROSS}
                    onChange={() => setSymmetryType(SYMMETRY_TYPE.CROSS)}
                    src={vertical_reflection}
                ></Tool>
                <Tool
                    target={symmetryType}
                    value={SYMMETRY_TYPE.WAVES}
                    onChange={() => setSymmetryType(SYMMETRY_TYPE.WAVES)}
                    icon={
                        <svg
                            fill="white"
                            className="scale-[0.8]"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path d="M16,120.28L191.472,256L16,391.72V120.28 M0,87.68v336.648L217.6,256L0,87.68z"></path>{" "}
                                <polygon points="294.376,256 512,424.328 512,87.672 "></polygon>{" "}
                                <path d="M264,395.728h-16v-40h16V395.728z M264,315.728h-16v-40h16V315.728z M264,235.728h-16v-40h16V235.728z M264,155.728h-16v-40 h16V155.728z"></path>{" "}
                            </g>
                        </svg>
                    }
                ></Tool>
            </div>
        </div>
    );
};

export default SymmetryTypes;
