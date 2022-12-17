import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CurriculumResponse from "../interfaces/CurriculumResponse";
import {getCurriculumById} from "../services/curriculums";
import Spinner from "../helpers/Spinner";
import ModuleButton from "../features/Curriculums/components/ModuleButton";
import LessonButton from "../features/Curriculums/components/LessonButton";
import BlockButton from "../features/Curriculums/components/BlockButton";
import CustomDisclosure from "../components/CustomDisclosure";
import Divider from "../components/Divider";
import GoBackButton from "../components/GoBackButton";
import {QueueListIcon, RectangleGroupIcon, VideoCameraIcon} from "@heroicons/react/24/outline";
import LessonResponse from "../interfaces/LessonResponse";
import CurriculumLessonContainer from "../features/Curriculums/components/CurriculumLessonContainer";

export default function CurriculumPage() {
    const { curriculumId } = useParams()
    const [curriculum, setCurriculum] = useState<CurriculumResponse>()
    const [selectedLesson, setSelectedLesson] = useState<LessonResponse>()

    useEffect(()=>{
        getCurriculumById(curriculumId).then(res=>{
            setCurriculum(res)
        })
    }, [setCurriculum])

    if (!curriculum) {
        return (
            <div className={"center"} style={{height: '80vh'}}>
                <div style={{alignItems: "center", display: 'flex', flexDirection: 'column'}}>
                    <Spinner color={"#4CA0FC"} size={2}/>
                    <p>
                        Загрузка учебного плана
                    </p>
                </div>
            </div>
        )
    }

    let blocksCount = 0
    let lessonsCount = 0

    curriculum.modules.forEach(module => {
        blocksCount += module.blocks.length
        module.blocks.forEach(block => {
            lessonsCount += block.lessons.length
        })
    })

    const curriculumStructure = curriculum.modules.map((module, moduleIndex) => {
        let totalModuleDurationCount = 0
        let renderedBlocks = module.blocks.map((block, blockIndex) => {
            let lessonsDurationCount = 0
            let renderedLessons = block.lessons?.map((lesson, lessonIndex) => {
                lessonsDurationCount += +lesson.duration
                return (
                    <LessonButton isActive={selectedLesson === lesson}
                                  numbering={(moduleIndex+1) + '.' + (blockIndex+1) + '.' +(lessonIndex+1)}
                                  title={lesson.title} duration={+lesson.duration}
                                  onClickFunction={()=>{setSelectedLesson(lesson)}}/>
                )
            })
            totalModuleDurationCount += lessonsDurationCount
            let blockButton = <BlockButton numbering={`${moduleIndex+1}.${blockIndex+1}`}
                                           title={block.title}
                                           duration={lessonsDurationCount}/>

            let blockContent = (
                <div className="lessons">
                    {renderedLessons}
                </div>
            )

            return (
                <div key={`${moduleIndex}-module-${blockIndex}-block`}>
                    <CustomDisclosure button={blockButton} content={blockContent}/>
                    <Divider/>
                </div>
            )
        })
        let moduleContent = (
            <div className="blocks">
                {renderedBlocks}
            </div>
        )
        let moduleButton = <ModuleButton numbering={moduleIndex+1}
                                         title={module.title}
                                         duration={totalModuleDurationCount}/>

        return (
            <div key={`${moduleIndex}-module`}>
                {/*@ts-ignore*/}
                <CustomDisclosure button={moduleButton} content={moduleContent}/>
                <Divider/>
            </div>
        )
    })

    return (
        <div className="curriculum-page">
            <div className="curriculums-sidebar">
                <GoBackButton title={"К учебным планам"} path={'/curriculums'}/>
                <div className="header">
                    <div className="main-title">
                        {curriculum.title}
                    </div>
                    <div className="counts">
                        <QueueListIcon/>
                        {curriculum.modules.length}
                        <RectangleGroupIcon/>
                        {blocksCount}
                        <VideoCameraIcon/>
                        {lessonsCount}
                    </div>
                </div>

                <div className="modules">
                    {curriculumStructure}
                </div>
            </div>

            <div className="curriculum-lesson-container">
                {
                    selectedLesson && <CurriculumLessonContainer lesson={selectedLesson}/>
                }
            </div>
        </div>
    )
}