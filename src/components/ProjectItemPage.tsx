import {useEffect, useState} from "react";
import {getProjectById} from "../services/project";
import {useParams} from "react-router-dom";
import {ProjectResponse} from "../interfaces/ProjectResponse";
import Spinner from "../helpers/Spinner";
import Icon from "../helpers/Icon";
import SourceCodeSection from "./SourceCodeSection";

export default function ProjectItemPage() {
    const [projectData, setProjectData] = useState<ProjectResponse>()
    const {projectId} = useParams()

    useEffect(()=>{
        if (!projectData) {
            getProjectById(projectId).then(res=>{
                setProjectData(res)
            })
        }
    },[projectData])

    if (!projectData) {
        return (
            <div className={"center"} style={{height: '100vh'}}>
                <div style={{alignItems: "center", display: 'flex', flexDirection: 'column'}}>
                    <Spinner color={"#4CA0FC"} size={2}/>
                    <p>
                        Загрузка проекта
                    </p>
                </div>
            </div>
        )
    }

    const {
        id,
        name,
        type,
        level,
        description,
        tech_components,
        duration,
        purchase_box_link,
        creator_id,
        source_code,
        block_code,
        cover_img_url,
        scheme_img_url,
    } = projectData

    return (
        <>
            <div className="project-container">
                <div className="project-info">
                    <div className="project-header">
                        <div>
                            <p className="project-type">
                                {type}
                            </p>
                            <p className="project-name">
                                {name}
                            </p>
                            <p className="project-level">
                                {level}
                            </p>
                            <p className="project-status-closed">
                                Доступ закрыт
                            </p>
                        </div>
                        <div className="project-buttons">
                            <div className="project-button">
                                <Icon color={"black"} size={1} name={"Edit"}/>
                            </div>
                            <div className="project-button">
                                <Icon color={"#F20000"} size={1} name={"Delete"}/>
                            </div>
                        </div>
                    </div>
                    <div className="project-description">
                        <div className="scheme-image">
                            <img src={scheme_img_url} alt=""/>
                        </div>

                        <p>
                            {description}
                        </p>
                    </div>
                </div>

                <div className="project-duration">
                    <p className="title">
                        <Icon color={"#4CA0FC"} size={1} name={"Time"}/>
                        Время на выполнение
                    </p>
                    <p>{duration} минут</p>
                </div>

                <div className="project-details">
                    <p className="title">
                        <Icon color={"#4CA0FC"} size={1} name={"TechComponents"}/>
                        Необходимые компоненты
                    </p>
                    <ol className="list">
                        {
                            JSON.parse(tech_components).map((component: {name: string, quantity: number}, index: number) => {
                                return (
                                    <li key={`tech-comp-${index}`}>{component.name} - {component.quantity} шт.</li>
                                )
                            })
                        }
                    </ol>
                </div>

                <div className="project-box-link">
                    <p className="title">
                        <Icon color={"#4CA0FC"} size={1} name={"Links"}/>
                        Ссылка для покупки набора
                    </p>

                    <p className="link">
                        <a href={purchase_box_link}>{purchase_box_link}</a>
                        - общая информация, документация
                    </p>
                </div>

                <div className="project-code">
                    <p className="title">
                        <Icon color={"#4CA0FC"} size={1} name={"Code"}/>
                        Исходный код проекта
                    </p>
                    <SourceCodeSection sourceCode={source_code}/>

                </div>
            </div>
        </>
    )
}