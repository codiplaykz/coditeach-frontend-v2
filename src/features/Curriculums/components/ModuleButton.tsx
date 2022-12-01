import {useState} from "react";
import {ChevronUpIcon, TrashIcon} from "@heroicons/react/24/outline";

interface ModuleButtonProps {
    numbering: number
    title: string,
    duration: number
    deleteFunction?: Function
}

export default function ModuleButton({numbering, title, duration, deleteFunction}: ModuleButtonProps) {
    const [show, hide] = useState(false)

    return (
        <div className="module">
            <div className="num">{numbering}</div>
            <div className="info">
                <p className="title">Модуль: {title}</p>
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