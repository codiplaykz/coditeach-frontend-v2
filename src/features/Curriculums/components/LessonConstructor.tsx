import TextEditor from "../../../components/TextEditor";
import {ReactElement, useState} from "react";
import Message from "../../../helpers/Message";
import {useDispatch} from "react-redux";
import {
    addLesson,
    setSelectedBlockId,
    setSelectedModuleId,
    setShowLessonConstructor
} from "../../../store/slices/curriculumSlice";
import {toast} from "react-toastify";

interface LessonConstructorProps {
    close: Function
}

export default function LessonConstructor({close}: LessonConstructorProps) {
    const [lessonContent, setLessonContent] = useState('')
    const [lessonTitle, setLessonTitle] = useState('')
    const [lessonDuration, setLessonDuration] = useState('')
    const [lessonDescription, setLessonDescription] = useState('')
    const [error, setError] = useState<ReactElement>()
    const dispatch = useDispatch()

    const complete = () => {
        if (lessonTitle !== '' && lessonContent !== '') {
            let lesson = {
                title: lessonTitle,
                description: lessonDescription,
                duration: lessonDuration,
                content: lessonContent
            }
            dispatch(addLesson({lesson:lesson}))
            dispatch(setShowLessonConstructor(false))
            dispatch(setSelectedBlockId(-1))
            dispatch(setSelectedModuleId(-1))
            toast("Урок добавлен!",{type: "success"})
            close()
        } else {
            setError(<Message messageText={"Введите все поля!"} messageType={"Warning"}/>)
            setTimeout(()=>{
                setError(<></>)
            }, 3000)
        }
    }

    return (
        <div className="lesson-constructor-container">
            <p className="title">
                Составление урока
            </p>

            <div className="structure">
                {error ? error : null}
                <p className={"lesson-input-label"}>Название урока</p>
                <input type="text" className="default-input"
                       value={lessonTitle}
                       onChange={(e)=>{setLessonTitle(e.target.value)}}
                       placeholder={"Введите название урока"}/>

                <p className={"lesson-input-label"}>Длительность урока</p>
                <input type="number" className="default-input"
                       value={lessonDuration}
                       placeholder={"Введите длительность урока"}
                       onChange={(e)=>{setLessonDuration(e.target.value)}}/>

                <p className={"lesson-input-label"}>Описание урока</p>
                <textarea className="default-input"
                       value={lessonDescription}
                       onChange={(e)=>{setLessonDescription(e.target.value)}}
                       placeholder={"Введите описание урока"}/>

                <TextEditor content={lessonContent} setContent={setLessonContent}/>
            </div>

            <div className="buttons">
                <button className="not-active-button" onClick={()=>{close()}}>Отменить</button>
                <button className="active-button" onClick={complete}>Сохранить и добавить</button>
            </div>
        </div>
    )
}