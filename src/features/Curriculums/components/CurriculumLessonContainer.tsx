import LessonResponse from "../../../interfaces/LessonResponse";
import Divider from "../../../components/Divider";
import parse from 'html-react-parser'

interface CurriculumLessonContainerProps {
    lesson: LessonResponse
}

export default function CurriculumLessonContainer({lesson}: CurriculumLessonContainerProps) {

    return (
        <div className="curriculum-lesson-container">
            <div className="info">
                <div className="title">{lesson.title}</div>
                <div className="duration">{lesson.duration} минут</div>
                <div className="description">{lesson.description}</div>
            </div>
            <Divider/>

            <div className="ck-content">
                {parse(lesson.content)}
            </div>
        </div>
    )
}