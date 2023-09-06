import useCanvas from "./useCanvas";

const Canvas = () => {
    const {
        handleMouseDown,
        undo,
        redo,
        clear,
        saveAsPNG,
        canvasRef,
        uploadFile,
        handleClick,
    } = useCanvas();

    return (
        <div
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            className="w-[80%] h-[80%] drop-shadow-md bg-white relative"
        >
            <div className="absolute select-none bg-gray-200 rounded-t-md w-full left-0 top-[-3em] p-2 flex justify-between items-center">
                <div className="flex">
                    <button
                        onClick={undo}
                        className="w-8 mr-2 h-8 bg-slate-400 rounded-md flex justify-center items-center hover:bg-gray-500 active:scale-[0.99] cursor-pointer "
                    >
                        <svg
                            fill="white"
                            className="scale-[0.6]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="35.461"
                            height="35.438"
                            viewBox="0 0 35.461 35.438"
                        >
                            <path
                                id="Icon_awesome-undo"
                                data-name="Icon awesome-undo"
                                d="M14.93,15.773H.844A.844.844,0,0,1,0,14.93V.844A.844.844,0,0,1,.844,0H4.219a.844.844,0,0,1,.844.844V6.336A17.437,17.437,0,1,1,6.316,30.922.845.845,0,0,1,6.283,29.7l2.388-2.388a.842.842,0,0,1,1.153-.037,12.375,12.375,0,1,0-1.8-16.561h6.91a.844.844,0,0,1,.844.844V14.93a.844.844,0,0,1-.844.844Z"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={redo}
                        className="w-8 h-8 mr-2 bg-slate-400 rounded-md flex justify-center items-center hover:bg-gray-500 active:scale-[0.99] cursor-pointer"
                    >
                        <svg
                            className="scale-[0.6]"
                            fill="white"
                            xmlns="http://www.w3.org/2000/svg"
                            width="35.461"
                            height="35.438"
                            viewBox="0 0 35.461 35.438"
                        >
                            <path
                                id="Icon_awesome-redo"
                                data-name="Icon awesome-redo"
                                d="M35.179,0H31.846A.844.844,0,0,0,31,.884L31.283,6.7a17.438,17.438,0,1,0-1.6,24.241.844.844,0,0,0,.034-1.226l-2.391-2.391a.844.844,0,0,0-1.152-.039,12.375,12.375,0,1,1,2.1-16.194l-7.139-.342a.844.844,0,0,0-.884.844V14.93a.844.844,0,0,0,.844.844H35.179a.844.844,0,0,0,.844-.844V.844A.844.844,0,0,0,35.179,0Z"
                                transform="translate(-0.563 0)"
                            />
                        </svg>
                    </button>
                    <button
                        onClick={clear}
                        className="w-12 h-8 mr-2 bg-blue-500 rounded-md flex justify-center items-center hover:bg-blue-600 active:scale-[0.99] cursor-pointer"
                    >
                        <p className="font-medium  text-white">Clear</p>
                    </button>
                </div>
                <div className="flex">
                    <button
                        onClick={saveAsPNG}
                        className="w-max px-2 h-8 mr-2 bg-blue-500 rounded-md flex justify-center items-center hover:bg-blue-600 active:scale-[0.99] cursor-pointer"
                    >
                        <p className="text-white font-medium">Download</p>
                        <svg
                            className="scale-[0.6]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                        >
                            <g
                                id="Icon_feather-download"
                                data-name="Icon feather-download"
                                transform="translate(-3 -3)"
                            >
                                <path
                                    id="Path_2"
                                    data-name="Path 2"
                                    d="M31.5,22.5v6a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3v-6"
                                    fill="none"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="3"
                                />
                                <path
                                    id="Path_3"
                                    data-name="Path 3"
                                    d="M10.5,15,18,22.5,25.5,15"
                                    fill="none"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="3"
                                />
                                <path
                                    id="Path_4"
                                    data-name="Path 4"
                                    d="M18,22.5V4.5"
                                    fill="none"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="3"
                                />
                            </g>
                        </svg>
                    </button>

                    <button className="relative w-max px-2 h-8 mr-2 bg-blue-500 rounded-md flex justify-center items-center hover:bg-blue-600 active:scale-[0.99] cursor-pointer">
                        <input
                            onChange={uploadFile}
                            className="w-full absolute opacity-0"
                            type="file"
                        ></input>
                        <p className="text-white font-medium">Upload Image</p>
                        <svg
                            className="scale-[0.6]"
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                        >
                            <g
                                id="Icon_feather-upload"
                                data-name="Icon feather-upload"
                                transform="translate(-3 -3)"
                            >
                                <path
                                    id="Path_5"
                                    data-name="Path 5"
                                    d="M31.5,22.5v6a3,3,0,0,1-3,3H7.5a3,3,0,0,1-3-3v-6"
                                    fill="none"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="3"
                                />
                                <path
                                    id="Path_6"
                                    data-name="Path 6"
                                    d="M25.5,12,18,4.5,10.5,12"
                                    fill="none"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="3"
                                />
                                <path
                                    id="Path_7"
                                    data-name="Path 7"
                                    d="M18,4.5v18"
                                    fill="none"
                                    stroke="white"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="3"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
            <canvas ref={canvasRef} className="w-full h-full "></canvas>
        </div>
    );
};

export default Canvas;
