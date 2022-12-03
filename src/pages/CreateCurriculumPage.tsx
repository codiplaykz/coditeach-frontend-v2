import CustomDisclosure from "../components/CustomDisclosure";
import ModuleButton from "../features/Curriculums/components/ModuleButton";
import {useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline";
import AddModuleModal from "../features/Curriculums/components/AddModuleModal";
import Divider from "../components/Divider";
import BlockButton from "../features/Curriculums/components/BlockButton";
import AddBlockModal from "../features/Curriculums/components/AddBlockModal";
import LessonConstructor from "../features/Curriculums/components/LessonConstructor";

interface Block {
    title: string,
    description: string,
    lessons: any[]
}

interface Module {
    title: string,
    description: string,
    blocks: Block[]
}

export default function CreateCurriculumPage() {
    const [modules, setModules] = useState<Module[]>([])
    const [moduleTitle, setModuleTitle] = useState('')
    const [moduleDesc, setModuleDesc] = useState('')
    const [blockTitle, setBlockTitle] = useState('')
    const [blockDesc, setBlockDesc] = useState('')
    const [selectedModuleId, setSelectedModuleId] = useState(-1)
    const [showAddModuleModal, setShowAddModuleModal] = useState(false)
    const [showAddBlockModal, setShowAddBlockModal] = useState(false)

    const addModule = () => {
        setShowAddModuleModal(false)
        let temp = modules
        temp.push(
            {
                title: moduleTitle,
                description: moduleDesc,
                blocks: []
            }
        )
        setModuleTitle('')
        setModuleDesc('')
        setModules(temp)
    }

    const deleteModule = (deleteIndex: number) => {
        setModules((current)=>current.filter((module,index)=>index !== deleteIndex))
    }

    const deleteBlock = (moduleIndex: number, deleteIndex: number) => {
        setModules((current) => {
             return current.map((module, index)=>{
                 if (index === moduleIndex) {
                     module.blocks = module.blocks.filter((block, index) => index !== deleteIndex)
                 }
                 return module
            })
        })
    }

    const addBlock = () => {
        setShowAddBlockModal(false)
        let temp = modules
        temp[selectedModuleId].blocks.push(
            {
                title: blockTitle,
                description: blockDesc,
                lessons: []
            }
        )
        setBlockTitle('')
        setBlockDesc('')
        setSelectedModuleId(-1)
        setModules(temp)
    }

    const renderedModules = modules.map((module, moduleIndex) => {
        let content = (
            <div className="blocks">
                {
                    module.blocks.map((block, blockIndex) => {
                        return (
                            <CustomDisclosure button={<BlockButton numbering={blockIndex+1}
                                                                   title={block.title}
                                                                   deleteFunction={()=>{
                                                                       deleteBlock(moduleIndex, blockIndex)
                                                                   }}
                                                                   duration={0}/>} content={""}/>
                        )
                    })
                }
                <button className="create-module-button" onClick={()=>{
                    setSelectedModuleId(moduleIndex)
                    setShowAddBlockModal(true)
                }}>
                    <PlusIcon/>
                    Добавить блок
                </button>
            </div>
        )

        return (
            <div key={`${module+' '+moduleIndex}`}>
                <CustomDisclosure button={<ModuleButton deleteFunction={()=>{deleteModule(moduleIndex)}}
                                                        numbering={moduleIndex+1}
                                                        title={module.title} duration={30}/>}
                                  content={content}/>
                <Divider/>
            </div>
        )
    })

    return (
        <div className="create-curriculum-page">
            <AddModuleModal moduleTitle={moduleTitle}
                            setModuleTitle={setModuleTitle}
                            moduleDesc={moduleDesc}
                            setModuleDesc={setModuleDesc}
                            addModule={addModule}
                            open={showAddModuleModal} setOpen={setShowAddModuleModal} />
            <AddBlockModal blockTitle={blockTitle}
                            setBlockTitle={setBlockTitle}
                            blockDesc={blockDesc}
                            setBlockDesc={setBlockDesc}
                            addBlock={addBlock}
                            open={showAddBlockModal} setOpen={setShowAddBlockModal} />
            <div className="curriculums-sidebar">
                <p className="title">
                    Создание учебного плана
                </p>
                <div className="modules">
                    {renderedModules}
                    <button className="create-module-button" onClick={()=>setShowAddModuleModal(true)}>
                        <PlusIcon/>
                        Добавить модуль
                    </button>
                </div>
            </div>
            <LessonConstructor/>
        </div>
    )
}