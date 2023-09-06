import { FC, useEffect, useRef, useState } from "react";
import { HSBToRGB, RGBToHex, RGBToHSB, HexToRGB, ColorSelectorProps } from "./ColorUtils"
import { Color, HSB, RGB } from "./ColorUtils";

const initialColor: Color = {
    rgb: {r: 255, g: 0, b: 0},
    hsb: {h: 0, s: 1, b: 1},
    hex: "#ff0000",
};

let colorMouseDown = false;
let basicColorMouseDown = false;
export const useColorSelector = (props : ColorSelectorProps) => {
    const [basicColor, setBasicColor] = useState<Color>(initialColor);
    const [color, setColor] = useState<Color>(initialColor);
    const circleRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const hexRef = useRef<HTMLInputElement>(null);
    const basicColorContainerRef = useRef<HTMLInputElement>(null);
    const colorContainerRef = useRef<HTMLInputElement>(null);

    const basicColorStyle = {
        backgroundImage: `linear-gradient(to bottom, #ff0000, #ff00ff, #0000ff, #00ffff, #00ff00, #ffff00, #ff0000)`,
    };

    const colorStyle = {
        backgroundImage: `linear-gradient(to top, black, transparent 100%),
        linear-gradient(to right, white, ${basicColor.hex})`,
    };

    useEffect(()=>{
        const rgb = HexToRGB(props.value);
        handleColorChange(rgb);

    }, [props.value])

    const handleBasicColorsMouseMove = (e: React.MouseEvent | MouseEvent) => {
        if((!basicColorMouseDown && e.type === "mousemove") || !basicColorContainerRef.current)
            return;
        const knobHeight = 8;
        const targetRect = basicColorContainerRef.current.getBoundingClientRect();  
        const height = targetRect.height - knobHeight;

        let y: number = e.clientY - targetRect.top;
        y = Math.max(0, Math.min(y, height));

        if(!knobRef.current)
            return;
        knobRef.current.style.top = y + "px";
        const heightRatio = y / height;
        let hsb : HSB = {h: (1 - heightRatio) * 360, s: 1, b: 1}
        let rgb: RGB = HSBToRGB(hsb);
        let hex: string = RGBToHex(rgb);

        const newBasicColor: Color = {
            rgb: rgb,
            hsb: hsb,
            hex: hex,
        };
        setBasicColor(newBasicColor);

        hsb = {h: (1 - heightRatio) * 360, s: color.hsb.s, b: color.hsb.b};
        rgb = HSBToRGB(hsb);
        hex = RGBToHex(rgb);
        const newColor: Color = {
            rgb: rgb,
            hsb: hsb,
            hex: hex,
        };
        setColor(newColor);
    };

    const handleColorsMouseMove = (e: React.MouseEvent | MouseEvent) => {
        if((!colorMouseDown && e.type === "mousemove" ) || !colorContainerRef.current)
            return;
        const circleRadius = 16;
        const targetRect = colorContainerRef.current.getBoundingClientRect();
        const height: number = targetRect.height - circleRadius;
        const width: number = targetRect.width - circleRadius;
        let x: number = e.clientX - targetRect.left;
        let y: number = e.clientY - targetRect.top;
        y = Math.max(0, Math.min(y, height));
        x = Math.max(0, Math.min(x, width));

        if(!circleRef.current)
            return;
        circleRef.current.style.left = x + "px";
        circleRef.current.style.top = y + "px";

        const heightRatio: number = y / height;
        const widthRatio: number = x / width;
        const h : number = basicColor.hsb.h;
        const s : number = widthRatio;
        const b : number = parseFloat((1-heightRatio).toPrecision(2))
        const hsb : HSB = {h, s, b}
        const rgb: RGB = HSBToRGB(hsb);
        const hex: string = RGBToHex(rgb);
        const newColor: Color = {
            rgb: rgb,
            hsb: hsb,
            hex: hex,
        };
        setColor(newColor);  
    };

    const handleBasicColorsMouseDown = ()=> {
        basicColorMouseDown = true;
        window.addEventListener("mousemove", handleBasicColorsMouseMove);
        window.addEventListener("mouseup", handleBasicColorsMouseUp);
    }

    const handleBasicColorsMouseUp = ()=> {
        basicColorMouseDown = false;
        window.removeEventListener("mousemove", handleBasicColorsMouseMove);
        window.removeEventListener("mouseup", handleBasicColorsMouseUp);
    }

    const handleColorMouseDown = ()=> {
        colorMouseDown = true;
        window.addEventListener("mousemove", handleColorsMouseMove);
        window.addEventListener("mouseup", handleColorMouseUp);
    }

    const handleColorMouseUp = ()=> {
        colorMouseDown = false;
        window.removeEventListener("mousemove", handleColorsMouseMove);
        window.removeEventListener("mouseup", handleColorMouseUp);
    }

    const handleColorChange = (rgb : RGB) => {
        let hsb : HSB = RGBToHSB(rgb);
        if(!circleRef.current || !knobRef.current || !circleRef.current.parentElement || !knobRef.current.parentElement)
            return;

        const circleRadius = 16;
        const circlePosX = (circleRef.current.parentElement.getBoundingClientRect().width - circleRadius) * hsb.s;
        const circlePosY = (circleRef.current.parentElement.getBoundingClientRect().height - circleRadius) * (1 - hsb.b);
        circleRef.current.style.left = circlePosX + "px";
        circleRef.current.style.top = circlePosY + "px";
        
        setColor({rgb, hsb, hex: RGBToHex(rgb)})
        hsb = {h: hsb.h, s: 1, b: 1}
        rgb = HSBToRGB(hsb);
        const { r, g, b } = color.rgb;
        
    }

    const handleRGBChange = (e : React.ChangeEvent<HTMLInputElement>, type : string) => {
        const value : number = parseInt(e.target.value);
        if(value > 255 || value < 0)  
            return;
        let rgb : RGB = {
            r: type==="r" ? value : color.rgb.r, 
            g: type==="g" ? value : color.rgb.g, 
            b: type==="b" ? value : color.rgb.b, 
        }
        handleColorChange(rgb)
    }
    
    const handleHexChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        const rgb : RGB | null = HexToRGB(value);
        if(value.charAt(0) === "#" && value.length > 7)
            return e.target.value = value.substring(0, value.length-1)
        if(value.charAt(0) !== "#" && value.length > 6)
            return e.target.value = value.substring(0, value.length-1)
        if(rgb == null)
            return;
        
        handleColorChange(rgb);
    }

    useEffect(()=>{
        if(!hexRef.current)
            return;
        hexRef.current.value = color.hex;
        if(!props.onChange)
            return;
        props.onChange(color.hex)
    }, [color])

    

    function darkenColor(color : string, percentage : number) {
        let r, g, b;
      
        const hex = color.slice(1);
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
        
      
        const factor = (100 - percentage) / 100;
        r = Math.floor(r * factor);
        g = Math.floor(g * factor);
        b = Math.floor(b * factor);
      

        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
        
    }

    return  {
        handleColorsMouseMove,
        colorStyle,
        handleColorMouseDown,
        circleRef,
        handleBasicColorsMouseMove,
        basicColorStyle,
        handleBasicColorsMouseDown,
        knobRef,
        handleRGBChange,
        color,
        hexRef,
        handleHexChange,
        basicColor,
        basicColorContainerRef,
        colorContainerRef,
        darkenColor
    }


}

export default useColorSelector;