import {useCurriculum} from "../../../hooks/use-curriculum";
import CustomDisclosure from "../../../components/CustomDisclosure";
import ModuleButton from "./ModuleButton";
import Divider from "../../../components/Divider";
import {useDispatch} from "react-redux";
import {
    deleteBlock,
    deleteLesson,
    deleteModule,
    setSelectedBlockId,
    setSelectedLessonId,
    setSelectedModuleId,
    setShowLessonConstructor,
    setShowLessonContainer
} from "../../../store/slices/curriculumSlice";
import {useState} from "react";
import AddModuleModal from "./AddModuleModal";
import AddBlockModal from "./AddBlockModal";
import {PlusIcon} from "@heroicons/react/24/outline";
import BlockButton from "./BlockButton";
import LessonButton from "./LessonButton";

export interface Lesson {
    title: string
    description: string
    duration: number
    content: string
}

export interface Block {
    title: string,
    description: string,
    lessons: Lesson[]
}

export interface Module {
    title: string,
    description: string,
    blocks: Block[]
}

export interface Curriculum {
    title: string,
    description: string,
    modules: Module[],
    selectedModuleId: number,
    selectedBlockId: number,
    selectedLessonId: number,
}

export default function CurriculumStructure() {
    const [showAddModuleModal, setShowAddModuleModal] = useState(false)
    const [showAddBlockModal, setShowAddBlockModal] = useState(false)
    const curriculum:Curriculum = useCurriculum()
    const dispatch = useDispatch()

    const delModule = (moduleId: number) => {
        dispatch(deleteModule({moduleId: moduleId}))
    }

    const delBlock = (moduleId: number, blockId: number) => {
        dispatch(deleteBlock({moduleId: moduleId, blockId: blockId}))
    }

    const addBlock = (moduleId: number) => {
        dispatch(setSelectedModuleId({moduleId: moduleId}))
        setShowAddBlockModal(true)
    }

    const addLesson = (moduleId: number, blockId: number) => {
        dispatch(setShowLessonConstructor({show: true}))
        dispatch(setShowLessonContainer({show: false}))
        dispatch(setSelectedLessonId({lessonId: -1}))
        dispatch(setSelectedModuleId({moduleId: moduleId}))
        dispatch(setSelectedBlockId({blockId: blockId}))
    }

    const delLesson = (moduleId: number, blockId: number, lessonId: number) => {
        dispatch(deleteLesson({moduleId: moduleId, blockId: blockId, lessonId: lessonId}))
    }

    const selectLesson = (moduleId: number, blockId: number, lessonId: number) => {
        dispatch(setShowLessonConstructor({show: false}))
        dispatch(setShowLessonContainer({show: true}))
        dispatch(setSelectedModuleId({moduleId: moduleId}))
        dispatch(setSelectedBlockId({blockId: blockId}))
        dispatch(setSelectedLessonId({lessonId: lessonId}))
    }

    const renderedModules = curriculum.modules.map((module, moduleIndex) => {
        let totalModuleDurationCount = 0
        let renderedBlocks = module.blocks.map((block, blockIndex) => {
            let lessonsDurationCount = 0
            let renderedLessons = block.lessons?.map((lesson, lessonIndex) => {
                lessonsDurationCount += +lesson.duration
                const isActive = () => {
                    let { selectedModuleId, selectedBlockId, selectedLessonId } = curriculum
                    if (moduleIndex === selectedModuleId && blockIndex === selectedBlockId && lessonIndex === selectedLessonId) {
                        return true
                    }
                    return false
                }
                return (
                    <LessonButton isActive={isActive()}
                                  numbering={(moduleIndex+1) + '.' + (blockIndex+1) + '.' +(lessonIndex+1)}
                                  title={lesson.title} duration={lesson.duration}
                                  deleteFunction={()=>{delLesson(moduleIndex, blockIndex, lessonIndex)}}
                                  onClickFunction={()=>{selectLesson(moduleIndex, blockIndex, lessonIndex)}}/>
                )
            })
            totalModuleDurationCount += lessonsDurationCount
            let blockButton = <BlockButton deleteFunction={()=>{delBlock(moduleIndex, blockIndex)}}
                                           numbering={`${moduleIndex+1}.${blockIndex+1}`}
                                           title={block.title}
                                           duration={lessonsDurationCount}/>

            let blockContent = (
                <div className="lessons">
                    {renderedLessons}

                    <button className="create-module-button" onClick={()=>{addLesson(moduleIndex, blockIndex)}}>
                        <PlusIcon/>
                        Добавить урок
                    </button>
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

                <button className="create-module-button" onClick={()=>{addBlock(moduleIndex)}}>
                    <PlusIcon/>
                    Добавить блок
                </button>
            </div>
        )
        let moduleButton = <ModuleButton deleteFunction={()=>{delModule(moduleIndex)}}
                                         numbering={moduleIndex+1}
                                         title={module.title}
                                         duration={totalModuleDurationCount}/>

        return (
            <div key={`${moduleIndex}-module`}>
                <CustomDisclosure button={moduleButton} content={moduleContent}/>
                <Divider/>
            </div>
        )
    })

    return (
        <>
            <AddModuleModal open={showAddModuleModal} setOpen={setShowAddModuleModal} />
            <AddBlockModal open={showAddBlockModal} setOpen={setShowAddBlockModal} />

            <div className="modules">
                {renderedModules}

                <button className="create-module-button" onClick={()=>setShowAddModuleModal(true)}>
                    <PlusIcon/>
                    Добавить модуль
                </button>
            </div>
        </>
    )
}