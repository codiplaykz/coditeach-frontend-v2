import Icon from "../helpers/Icon";
import {MouseEventHandler} from "react";

interface CreateButtonProps {
    title: string,
    onClick: MouseEventHandler
}

export default function CreateButton({title, onClick}: CreateButtonProps) {
    return (
        <button className="create-button" onClick={onClick}>
            <Icon color={"white"} size={1} name={"Add"}/>
            {title}
        </button>
    )
}