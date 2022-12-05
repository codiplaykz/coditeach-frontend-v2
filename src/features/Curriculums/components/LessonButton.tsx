import {useState} from "react";
import {ChevronRightIcon, ChevronUpIcon, TrashIcon} from "@heroicons/react/24/outline";

interface LessonButtonProps {
    isActive: boolean
    numbering: string
    title: string,
    duration: number
    deleteFunction?: Function
    onClickFunction: Function
}

export default function LessonButton({isActive, numbering, title, duration, deleteFunction, onClickFunction}: LessonButtonProps) {

    return (
        <div key={`lesson-${numbering+title}`} className={`lesson ${isActive && 'active'}`} onClick={()=>{onClickFunction()}}>
            <div className={"inner"}>
                <div className="num">
                    {numbering}
                </div>
                <div className="info">
                    <p className="title">
                        Урок: {title}
                    </p>
                    <p className="duration">
                        {duration} мин
                    </p>
                </div>
            </div>

            <div className="icons">
                {deleteFunction ? (
                    <div className="button-delete" onClick={(event)=>{event.stopPropagation(); deleteFunction()}}>
                        <TrashIcon/>
                    </div>
                ) : null}
                <ChevronRightIcon/>
            </div>
        </div>
    )
}