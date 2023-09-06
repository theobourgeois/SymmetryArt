import { FC, ReactElement } from "react";

interface ToolProps {
    icon?: ReactElement;
    src?: string;
    value: any;
    target: any;
    onChange: (value: any) => void;
}

const Tool: FC<ToolProps> = (props) => {
    return (
        <div>
            <div
                onClick={props.onChange}
                className={`flex mr-2 justify-center ${
                    props.value === props.target ? "bg-blue-700" : "bg-blue-500"
                } items-center w-7 h-7 hover:bg-blue-700 cursor-pointer rounded-md`}
            >
                {props.icon && props.icon}
                {props.src && <img src={props.src}></img>}
            </div>
        </div>
    );
};

export default Tool;
