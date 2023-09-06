export interface RGB { r: number; g: number; b: number };
export interface HSB { h: number; s: number; b: number };
export interface Color { rgb: RGB; hsb: HSB; hex: string };
export interface ColorSelectorProps {
    value: string;
    onChange?: (color: string) => void;
    style?: any;
}
export function RGBToHex(rbg: RGB) {
    let hex: string = "#";
    let r = rbg.r.toString(16);
    let g = rbg.g.toString(16);
    let b = rbg.b.toString(16);
    if (r.length < 2)
        r = "0" + r;
    if (g.length < 2)
        g = "0" + g;
    if (b.length < 2)
        b = "0" + b;
    
    hex += r;
    hex += g;
    hex += b;
    return hex;
}

export function HexToRGB(hex: string) : RGB  {
    const bias = hex.charAt(0) === "#" ? 1 : 0;

    let r : any = hex.substring(bias, 2 + bias);
    let g : any = hex.substring(2 + bias, 4 + bias);
    let b : any = hex.substring(4 + bias, 7 + bias);
    if(r.length != 2 || b.length != 2 || b.length != 2)
        return {r:0, g:0, b:0};
    
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);

    if(isNaN(r) || isNaN(g) || isNaN(b)) 
        r = 0, g = 0, b = 0;
        
    return {r, g, b};
}


export const HSBToRGB = (hsb: HSB ) : RGB => {
    let { h, s, b } = hsb;
    const k = (n: number) => (n + h / 60) % 6;
    const f = (n: number) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
    return { r: Math.round(255 * f(5)), g: Math.round(255 * f(3)), b: Math.round(255 * f(1)) };
};

export const RGBToHSB = (rgb: RGB) : HSB => {
    let {r, g, b} = rgb;
    r /= 255;
    g /= 255;
    b /= 255;
    const v = Math.max(r, g, b),
      n = v - Math.min(r, g, b);
    const h =
      n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;

    return {
        h: Math.round(60 * (h < 0 ? h + 6 : h)), 
        s: (v && (n / v)), 
        b: v
    };
  };


const utils = {
    RGBToHex, HSBToRGB, RGBToHSB, HexToRGB
}

export default utils