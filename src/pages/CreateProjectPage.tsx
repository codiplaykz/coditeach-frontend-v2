import GoBackButton from "../components/GoBackButton";
import Icon from "../helpers/Icon";
import {useProject} from "../hooks/use-project";
import {useState} from "react";
import EditProjectModal from "../components/EditProjectModal";
import ImageUploadPlaceholder from "../helpers/ImageUploadPlaceholder";

export default function CreateProjectPage() {
    const projectData = useProject()
    const [editProjectModalShow, setProjectModalShow] = useState(false)
    const [techComponents, setTechComponents] = useState([])
    const [techComponentValue, setTechComponentValue] = useState('')

    // @ts-ignore
    const handleTechComponentValueChange = (e) => {
        setTechComponentValue(e.target.value)
    }

    const addComponent = () => {
        if (techComponentValue.length !== 0) {
            let temp = techComponents
            // @ts-ignore
            temp.push(techComponentValue)
            setTechComponents(temp)
        }
    }

    const removeComponent = (index: number) => {
        let temp = techComponents
        temp.splice(index, 1)
        setTechComponents(temp)

    }

    const openEditProjectModal = () => {
        setProjectModalShow(true)
    }

    const renderedTechComponents = techComponents.map((item, index) => {
        return (
            <div className={"component"} key={`component-${index}`}>
                <p>{item}</p>
                {/*@ts-ignore*/}
                <Icon color={"red"} size={1} name={"Remove"} onClick={()=>removeComponent(index)}/>
            </div>
        )
    })

    return (
        <div className="create-project-page">
            <EditProjectModal open={editProjectModalShow} setOpen={setProjectModalShow} projectData={projectData}/>
            <GoBackButton title={'К списку проектов'} path={'/projects'}/>

            <div className="page-header">
                <p className="header-title">Создание проекта</p>

                <div className="buttons">
                    <button className="not-active-button">Отменить</button>
                    <button className="active-button">Опубликовать для всех</button>
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
                                <ImageUploadPlaceholder/>
                            </div>

                            <div className="project-scheme-image">
                                <div className="title">
                                    Cхема
                                </div>
                                <ImageUploadPlaceholder/>
                            </div>

                            <div className="project-description">
                                <div className="title">
                                    Описание
                                </div>

                                <textarea rows={8} className="default-input"/>
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
                            <button className="active-button" onClick={addComponent}>
                                <Icon color={"white"} size={1} name={"Add"}/>
                                Добавить компонент
                            </button>
                            {renderedTechComponents}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}