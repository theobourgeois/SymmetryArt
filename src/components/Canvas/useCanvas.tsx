import React, {
    ChangeEvent,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    ColorContext,
    LineSizeContext,
    PenTypeContext,
    SegmentsContext,
    SymmetryTypeContext,
} from "../../Context";
import { PEN_TYPE, SYMMETRY_TYPE } from "../../Enums";
import { HexToRGB, RGB, RGBToHex } from "../ColorSelector/ColorUtils";

const useCanvas = () => {
    const { segments } = useContext(SegmentsContext);
    const { lineSize } = useContext(LineSizeContext);
    const { symmetryType } = useContext(SymmetryTypeContext);
    const { color, setColor } = useContext(ColorContext);
    const { penType } = useContext(PenTypeContext);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
    const [historyIndex, setHistoryIndex] = useState(0);

    let mouseDown = false;

    const x1 = useRef(0);
    const y1 = useRef(0);

    function setCanvasBackgroundWhite() {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = "black"; // Reset fillStyle to your drawing color
        const imgData = ctx.getImageData(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );
        const newHistory = [...drawingHistory];
        newHistory.push(imgData);
        setDrawingHistory([...newHistory]);
        setHistoryIndex(0);
    }

    useEffect(() => {
        setCanvasBackgroundWhite();
        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);
        return () => {
            window.removeEventListener("resize", updateCanvasSize);
        };
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        if (historyIndex >= 0) {
            if (drawingHistory[historyIndex])
                ctx.putImageData(drawingHistory[historyIndex], 0, 0);
        }
    }, [historyIndex]);

    function handleMouseDown(e: React.MouseEvent) {
        if (!(e.target instanceof HTMLCanvasElement)) return;
        if (!canvasRef.current) return;

        const targetRect = canvasRef.current.getBoundingClientRect();
        x1.current = e.clientX - targetRect.left;
        y1.current = e.clientY - targetRect.top;
        if (penType === PEN_TYPE.FILL) {
            floodFill(x1.current, y1.current, color);
            return;
        }

        mouseDown = true;
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    }

    function handleMouseUp() {
        if (!canvasRef.current) return;
        mouseDown = false;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        const imgData = ctx.getImageData(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );
        setDrawingHistory((prevState) => {
            const newHistory = prevState.slice(0, historyIndex + 1);
            newHistory.push(imgData);
            return newHistory;
        });
        setHistoryIndex((prevIndex) => prevIndex + 1);

        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
    }

    function handleClick(e: any) {
        if (!canvasRef.current) return;
        if (penType === PEN_TYPE.EYEDROP) handleEyeDrop(e);
    }

    function handleMouseMove(e: MouseEvent) {
        if (!canvasRef.current) return;
        if (!mouseDown) return;
        const targetRect = canvasRef.current.getBoundingClientRect();
        const x2 = e.clientX - targetRect.left;
        const y2 = e.clientY - targetRect.top;

        if (penType === PEN_TYPE.EYEDROP) {
            handleEyeDrop(e);
            return;
        } else
            switch (symmetryType) {
                case SYMMETRY_TYPE.MANDALA:
                    drawSegments(x1.current, y1.current, x2, y2, segments);
                    break;
                case SYMMETRY_TYPE.VERTICAL:
                    drawReflection(x1.current, y1.current, x2, y2);
                    break;
                case SYMMETRY_TYPE.CROSS:
                    drawCrossSymmetry(x1.current, y1.current, x2, y2);
                    break;
                case SYMMETRY_TYPE.WAVES:
                    drawRadialSegments(
                        x1.current,
                        y1.current,
                        x2,
                        y2,
                        segments
                    );
                    break;
            }
        x1.current = x2;
        y1.current = y2;
    }

    function drawReflection(x1: number, y1: number, x2: number, y2: number) {
        if (!canvasRef.current) return;
        drawCanvasLine(x1, y1, x2, y2);
        const width = canvasRef.current.getBoundingClientRect().width;
        x1 = width - x1;
        x2 = width - x2;
        drawCanvasLine(x1, y1, x2, y2);
    }

    function drawRadialSegments(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        segments: number
    ) {
        if (!canvasRef.current) return;
        const width = canvasRef.current.getBoundingClientRect().width;
        const height = canvasRef.current.getBoundingClientRect().height;
        const centerX = width / 2;
        const centerY = height / 2;

        const angleStep = (2 * Math.PI) / segments;
        for (let i = 0; i < segments; i++) {
            const angle = i * angleStep;

            // Translate the points to the center
            const translatedX1 = x1 - centerX;
            const translatedY1 = y1 - centerY;
            const translatedX2 = x2 - centerX;
            const translatedY2 = y2 - centerY;

            // Rotate the translated points
            const newX1 =
                translatedX1 * Math.cos(angle) - translatedY1 * Math.sin(angle);
            const newY1 =
                translatedX1 * Math.sin(angle) + translatedY1 * Math.cos(angle);
            const newX2 =
                translatedX2 * Math.cos(angle) - translatedY2 * Math.sin(angle);
            const newY2 =
                translatedX2 * Math.sin(angle) + translatedY2 * Math.cos(angle);

            // Modify the starting and ending points
            const modX1 = centerX + ((newX1 - centerX) * (i + 1)) / segments;
            const modY1 = centerY + ((newY1 - centerY) * (i + 1)) / segments;
            const modX2 = centerX + ((newX2 - centerX) * (i + 1)) / segments;
            const modY2 = centerY + ((newY2 - centerY) * (i + 1)) / segments;

            // Translate the points back to their original position
            const finalX1 = modX1 + centerX;
            const finalY1 = modY1 + centerY;
            const finalX2 = modX2 + centerX;
            const finalY2 = modY2 + centerY;

            drawCanvasLine(finalX1, finalY1, finalX2, finalY2);
        }
    }

    function drawSegments(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        segments: number
    ) {
        if (!canvasRef.current) return;
        const width = canvasRef.current.getBoundingClientRect().width;
        const height = canvasRef.current.getBoundingClientRect().height;
        const centerX = width / 2;
        const centerY = height / 2;

        const angleStep = (2 * Math.PI) / segments;
        for (let i = 0; i < segments; i++) {
            const angle = i * angleStep;

            // Translate the points to the center
            const translatedX1 = x1 - centerX;
            const translatedY1 = y1 - centerY;
            const translatedX2 = x2 - centerX;
            const translatedY2 = y2 - centerY;

            // Rotate the translated points
            const newX1 =
                translatedX1 * Math.cos(angle) - translatedY1 * Math.sin(angle);
            const newY1 =
                translatedX1 * Math.sin(angle) + translatedY1 * Math.cos(angle);
            const newX2 =
                translatedX2 * Math.cos(angle) - translatedY2 * Math.sin(angle);
            const newY2 =
                translatedX2 * Math.sin(angle) + translatedY2 * Math.cos(angle);

            // Translate the points back to their original position
            const finalX1 = newX1 + centerX;
            const finalY1 = newY1 + centerY;
            const finalX2 = newX2 + centerX;
            const finalY2 = newY2 + centerY;

            drawCanvasLine(finalX1, finalY1, finalX2, finalY2);
        }
    }

    function drawCrossSymmetry(x1: number, y1: number, x2: number, y2: number) {
        if (!canvasRef.current) return;
        const width = canvasRef.current.getBoundingClientRect().width;
        const height = canvasRef.current.getBoundingClientRect().height;
        const centerX = width / 2;
        const centerY = height / 2;

        const drawReflectedLine = (
            x1: number,
            y1: number,
            x2: number,
            y2: number
        ) => {
            drawCanvasLine(x1, y1, x2, y2);
            drawCanvasLine(2 * centerX - x1, y1, 2 * centerX - x2, y2);
        };

        // Draw the original and vertical reflection
        drawReflectedLine(x1, y1, x2, y2);

        // Draw the horizontal reflection and its vertical reflection
        drawReflectedLine(x1, 2 * centerY - y1, x2, 2 * centerY - y2);
    }

    function drawCanvasLine(x1: number, y1: number, x2: number, y2: number) {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
    }

    function updateCanvasSize() {
        if (!canvasRef.current) return;
        const container = canvasRef.current.parentElement;
        if (!container) return;

        // Save the current drawing content
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        const currentImageData = ctx.getImageData(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );

        // Resize the canvas
        canvasRef.current.width = container.clientWidth;
        canvasRef.current.height = container.clientHeight;

        // Restore the drawing content
        ctx.putImageData(currentImageData, 0, 0);
    }

    function undo() {
        if (historyIndex >= 0) setHistoryIndex((prevIndex) => prevIndex - 1);
    }

    function redo() {
        if (historyIndex < drawingHistory.length - 1) {
            setHistoryIndex((prevIndex) => prevIndex + 1);
        }
    }

    function clear(undo = false) {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        // Clear the canvas
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ctx.fillStyle = "black"; // Reset fillStyle to your drawing color
        // Update the history and historyIndex
        setDrawingHistory((prevHistory: any) => {
            if (!canvasRef.current) return;
            const newHistory = prevHistory.slice(0, historyIndex + 1);
            newHistory.push(
                ctx.getImageData(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                )
            );
            return newHistory;
        });
        setHistoryIndex((prevIndex) => prevIndex + 1);
    }

    const handleEditCanvas = useCallback(
        (e: KeyboardEvent) => {
            const cmdCtrl = e.metaKey || e.ctrlKey;
            const z = e.code === "KeyZ";
            const shift = e.shiftKey;

            if (cmdCtrl && z && !shift) undo();
            if (cmdCtrl && z && shift) redo();
        },
        [historyIndex]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleEditCanvas);
        return () => {
            window.removeEventListener("keydown", handleEditCanvas);
        };
    }, [handleEditCanvas]);

    function saveAsPNG() {
        if (!canvasRef.current) return;

        // Get the data URL of the canvas image in PNG format
        const dataURL = canvasRef.current.toDataURL("image/png");

        // Create a temporary anchor element to initiate the download
        const downloadLink = document.createElement("a");
        downloadLink.href = dataURL;
        downloadLink.download = "canvas-image.png";

        // Append the anchor element to the DOM, click it, and remove it
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    function uploadFile(e: any) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImage(reader.result);
        };
    }

    function setImage(url: any) {
        if (!canvasRef.current) return;
        const img = new Image();
        img.src = url; // Replace with the URL of your image
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        img.onload = function () {
            if (!canvasRef.current) return;
            ctx.drawImage(
                img,
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
            handleMouseUp();
        };
    }

    function getPixelInfo(x: number, y: number) {
        if (!canvasRef.current) return { r: 0, g: 0, b: 0 };
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return { r: 0, g: 0, b: 0 };
        const imageData = ctx.getImageData(x, y, 1, 1);
        const [r, g, b] = imageData.data;
        return { r, g, b };
    }

    function handleEyeDrop(e: MouseEvent) {
        if (penType !== PEN_TYPE.EYEDROP) return;
        if (!canvasRef.current) return;
        const targetRect = canvasRef.current.getBoundingClientRect();
        const x2 = e.clientX - targetRect.left;
        const y2 = e.clientY - targetRect.top;
        const { r, g, b } = getPixelInfo(x2, y2);
        const hex = RGBToHex({ r, g, b });
        setColor(hex);
    }

    function floodFill(x: number, y: number, fillColor: string) {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;
        const targetColor = getPixelInfo(x, y);
        const targetColorHex = RGBToHex({
            r: targetColor.r,
            g: targetColor.g,
            b: targetColor.b,
        });
        if (targetColorHex === fillColor) return;
        const queue = [{ x, y }];
        const visited = new Set();
        const pixelsToFill = [];

        while (queue.length > 0) {
            const { x, y } = queue.shift() as { x: number; y: number };
            const key = `${x}-${y}`;

            if (visited.has(key)) continue;
            visited.add(key);
            const currentColor = getPixelInfo(x, y);
            const currentColorHex = RGBToHex({
                r: currentColor.r,
                g: currentColor.g,
                b: currentColor.b,
            });
            pixelsToFill.push({ x: x - 1, y });

            if (currentColorHex === targetColorHex) {
                if (x > 0) queue.push({ x: x - 1, y });
                if (y > 0) queue.push({ x, y: y - 1 });
                if (x < canvasWidth - 1) queue.push({ x: x + 1, y });
                if (y < canvasHeight - 1) queue.push({ x, y: y + 1 });
            }
        }

        // Draw the filled pixels
        ctx.fillStyle = fillColor;
        for (const key of pixelsToFill) {
            const { x, y } = key;
            ctx.fillRect(x, y, 1, 1);
        }

        handleMouseUp();
    }

    return {
        handleMouseDown,
        undo,
        redo,
        clear,
        saveAsPNG,
        canvasRef,
        uploadFile,
        handleClick,
    };
};

export default useCanvas;
