import {useCurriculum} from "../../../hooks/use-curriculum";
import parse from 'html-react-parser'
import Divider from "../../../components/Divider";

export default function LessonContainer() {
    const {
        modules,
        selectedModuleId,
        selectedBlockId,
        selectedLessonId,
    } = useCurriculum()

    let lesson = modules[selectedModuleId]?.blocks[selectedBlockId]?.lessons[selectedLessonId]

    if (!lesson) {
        return (
            <>
            </>
        )
    }

    return (
        <div className="lesson-container">
            <p className="title">
                Урок: <span>{lesson.title}</span>
            </p>
            <p className="duration">
                {lesson.duration} мин
            </p>

            <div className="desc">
                <p>Описание</p>
                <p>
                    {lesson.description}
                </p>
            </div>

            <Divider/>

            <div className="ck-content">
                {
                    parse(lesson.content)
                }
            </div>
        </div>
    )
}