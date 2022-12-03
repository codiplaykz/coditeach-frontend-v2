import TextEditor from "../../../components/TextEditor";
import {useState} from "react";
import parse from 'html-react-parser'

export default function LessonConstructor() {
    const [lessonContent, setLessonContent] = useState('')
    console.log(lessonContent)

    return (
        <div className="lesson-constructor-container">
            <p className="title">
                Составление урока
            </p>

            <div className="structure">
                <TextEditor content={lessonContent} setContent={setLessonContent}/>
            </div>

            <div className="buttons">
                <button className="not-active-button">Отменить</button>
                <button className="active-button">Сохранить и добавить</button>
            </div>
            <div className="ck-content">
                {parse(lessonContent)}
            </div>
        </div>
    )
}