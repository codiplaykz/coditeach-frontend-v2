import GoBackButton from "../components/GoBackButton";
import Icon from "../helpers/Icon";
import {useProject} from "../hooks/use-project";
import {useState} from "react";
import EditProjectModal from "../components/EditProjectModal";
import ImageUploadPlaceholder from "../helpers/ImageUploadPlaceholder";
import {useNavigate} from "react-router-dom";
import ConfirmActionModal from "../components/ConfirmActionModal";
import {createProject} from "../services/project";

export default function CreateProjectPage() {
    const projectData = useProject()
    const navigate = useNavigate()
    const [editProjectModalShow, setProjectModalShow] = useState(false)
    const [techComponents, setTechComponents] = useState<{name: string, quantity: number}[]>([])
    const [techComponentValue, setTechComponentValue] = useState('')
    const [techComponentQuantityValue, setTechComponentQuantityValue] = useState(1)
    const [onClose, setOnClose] = useState(false)
    const [coverImage, setCoverImage] = useState<File>()
    const [schemaImage, setSchemaImage] = useState<File>()
    const [desc, setDesc] = useState('')

    const submitData = () => {
        let data = new FormData()
        data.append('name', projectData.projectName)
        data.append('desc', desc)
        data.append('p_type', projectData.projectType)
        data.append('level', projectData.projectLevel)
        data.append('tech_components', JSON.stringify(techComponents))
        // @ts-ignore
        data.append('cover_image', coverImage)
        // @ts-ignore
        data.append('schema_image', schemaImage)

        createProject(data).then(res=>{
            console.log(res)
        })
    }

    // @ts-ignore
    const handleTechComponentValueChange = (e) => {
        setTechComponentValue(e.target.value)
    }

    // @ts-ignore
    const handleTechComponentQuantityValueChange = (e) => {
        let {value, min, max} = e.target
        value = Math.max(Number(min), Math.min(Number(max), Number(value)));
        setTechComponentQuantityValue(value)
    }

    const addComponent = () => {
        if (techComponentValue.length !== 0) {
            let item = {
                name: techComponentValue,
                quantity: techComponentQuantityValue
            }
            let array = [...techComponents, item]
            // @ts-ignore
            setTechComponents(array)
            setTechComponentValue('')
            setTechComponentQuantityValue(1)
        }
    }

    const removeComponent = (index: number) => {
        let array = [...techComponents]
        array.splice(index, 1)
        setTechComponents(array)
    }

    const openEditProjectModal = () => {
        setProjectModalShow(true)
    }

    const redirect = (path: string) => {
        navigate(path)
    }

    // @ts-ignore
    const renderedTechComponents = techComponents.map((item, index) => {
        return (
            <div className={"component"} key={`component-${index}`}>
                <p>{item.name}</p>
                <span>{item.quantity} шт. </span>
                {/*@ts-ignore*/}
                <Icon color={"red"} size={1} name={"Remove"} onClick={()=>removeComponent(index)}/>
            </div>
        )
    })

    return (
        <div className="create-project-page">
            <EditProjectModal open={editProjectModalShow} setOpen={setProjectModalShow} projectData={projectData}/>
            <ConfirmActionModal open={onClose} setOpen={setOnClose}
                                title={"Вы действительно хотите покинуть страницу?"}
                                info={"Изменения не сохранятся"} confirmAction={()=>{redirect("/projects")}}/>

            <GoBackButton title={'К списку проектов'} path={'/projects'}/>

            <div className="page-header">
                <p className="header-title">Создание проекта</p>

                <div className="buttons">
                    <button className="not-active-button" onClick={()=>{setOnClose(true)}}>Отменить</button>
                    <button className="active-button" onClick={submitData}>Опубликовать для всех</button>
                </div>
            </div>

            <div className="page-container">
                <div className="inner-container">
                    <div className="project-info">
                        <div className="project-info-header">
                            <div className="info">
                                <p className="project-type">
                                    {projectData.projectType}
                                </p>
                                <p className="project-name">
                                    {projectData.projectName}
                                </p>
                                <p className="project-level">
                                    {projectData.projectLevel}
                                </p>
                            </div>
                            <div className="project-buttons">
                                <div className="project-button" onClick={openEditProjectModal}>
                                    <Icon color={"black"} size={1} name={"Edit"}/>
                                </div>
                            </div>
                        </div>

                        <div className="project-details">
                            <div className="project-cover-image">
                                <div className="title">
                                    Обложка
                                </div>
                                {/*@ts-ignore*/}
                                <ImageUploadPlaceholder uploadedImage={coverImage} setUploadedImage={setCoverImage}/>
                            </div>

                            <div className="project-scheme-image">
                                <div className="title">
                                    Cхема
                                </div>
                                {/*@ts-ignore*/}
                                <ImageUploadPlaceholder uploadedImage={schemaImage} setUploadedImage={setSchemaImage}/>
                            </div>

                            <div className="project-description">
                                <div className="title">
                                    Описание
                                </div>

                                <textarea value={desc} onChange={(e)=>{setDesc(e.target.value)}} rows={8} className="default-input"/>
                            </div>
                        </div>
                    </div>

                    <div className="project-additional-details">
                        <div className="title">
                            <Icon color={"#4CA0FC"} size={1} name={"Time"}/>
                            <p>
                                Время на выполнение
                            </p>
                        </div>
                        
                        <div className="input">
                            <input type="time" className="default-input"/>
                        </div>
                    </div>

                    <div className="project-additional-details">
                        <div className="title">
                            <Icon color={"#4CA0FC"} size={1} name={"TechComponents"}/>
                            <p>
                                Необходимые компоненты
                            </p>
                        </div>

                        <div className="inputs">
                            <input type="text" value={techComponentValue}
                                   onChange={(e) => handleTechComponentValueChange(e)}
                                   placeholder={"Введите название компонента"}
                                   className="default-input"/>

                            <input type="number" min="1" max="1000" required value={techComponentQuantityValue}
                                   onChange={(e) => handleTechComponentQuantityValueChange(e)}
                                   placeholder={"Введите количество"}
                                   className="default-input"/>

                            <button className="active-button" onClick={addComponent}>
                                <Icon color={"white"} size={1} name={"Add"}/>
                            </button>
                        </div>

                        <div className="components">
                            {renderedTechComponents}
                        </div>
                    </div>

                    <div className="project-additional-details">
                        <div className="title">
                            <Icon color={"#4CA0FC"} size={1} name={"Links"}/>
                            <p>
                                Ссылка для покупки набора
                            </p>
                        </div>

                        <div className="input">
                            <input type="url" className="default-input" placeholder={"Введите ссылку для покупки набора"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}