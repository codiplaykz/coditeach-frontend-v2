import CurriculumStructure from "../features/Curriculums/components/CurriculumStructure";
import LessonConstructor from "../features/Curriculums/components/LessonConstructor";
import {useCurriculum} from "../hooks/use-curriculum";
import {useDispatch} from "react-redux";
import {setSelectedBlockId, setSelectedModuleId, setShowLessonConstructor} from "../store/slices/curriculumSlice";
import LessonContainer from "../features/Curriculums/components/LessonContainer";

export default function CreateCurriculumPage() {
    const {
        modules,
        selectedModuleId,
        selectedBlockId,
        selectedLessonId,
        showLessonConstructor,
        showLessonContainer,
    } = useCurriculum()

    const dispatch = useDispatch()

    const closeConstructor = () => {
        dispatch(setSelectedModuleId({moduleId: -1}))
        dispatch(setSelectedBlockId({blockId: -1}))
        dispatch(setShowLessonConstructor({show: false}))
    }

    return (
        <div className="create-curriculum-page">
            <div className="curriculums-sidebar">
                <p className="title">
                    Создание учебного плана
                </p>
                <CurriculumStructure/>
            </div>
            {
                showLessonConstructor && <LessonConstructor close={()=>{closeConstructor()}}/>
            }
            {
                showLessonContainer && <LessonContainer/>
            }
        </div>
    )
}