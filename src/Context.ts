import { createContext } from "react";
import { SYMMETRY_TYPE, PEN_TYPE } from "./Enums";

export const SymmetryTypeContext = createContext<any>(SYMMETRY_TYPE.MANDALA);
export const LineSizeContext = createContext<any>(2);
export const ColorContext = createContext<any>("#ff0000");
export const SegmentsContext = createContext<any>(5);
export const PenTypeContext = createContext<any>(PEN_TYPE.PEN);

const contexts = {
    SymmetryTypeContext,
    LineSizeContext,
    ColorContext,
    SegmentsContext
}

export default contexts;