type ObjectValues<T> = T[keyof T];

export const SYMMETRY_TYPE = {
    MANDALA: 'MANDALA',
    VERTICAL: 'VERTICAL',
    CROSS: 'CROSS',
    WAVES: 'WAVES'
} as const;
export type SymmetryType = ObjectValues<typeof SYMMETRY_TYPE>;

export type Color = string;

export const PEN_TYPE = {
    PEN: 'PEN',
    CIRCLE: 'CIRCLE',
    LINE: 'LINE',
    ERASER: 'ERASER',
    EYEDROP: 'EYEDROP',
    FILL: 'FILL'
} as const;
export type PenType = ObjectValues<typeof PEN_TYPE>;



