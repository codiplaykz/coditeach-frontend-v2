import {useState} from "react";
import {ChevronUpIcon, TrashIcon} from "@heroicons/react/24/outline";

interface BlockButtonProps {
    numbering: number
    title: string,
    duration: number
    deleteFunction?: Function
}

export default function BlockButton({numbering, title, duration, deleteFunction}: BlockButtonProps) {
    const [show, hide] = useState(false)

    const handleClick = () => {
        hide(!show)
    }

    return (
        <div className="block" onClick={handleClick}>
            <div className="num">{numbering}</div>
            <div className="info">
                <p className="title">Блок: {title}</p>
                <p className="duration">{duration} мин</p>
            </div>
            {deleteFunction ? (
                <div className="button-delete" onClick={()=>{deleteFunction()}}>
                    <TrashIcon/>
                </div>
            ) : null}
            <div className="button" onClick={()=>{hide(!show)}}>
                <ChevronUpIcon className={`${show ? 'rotate-180' : 'rotate-0'}`}/>
            </div>
        </div>
    )
}