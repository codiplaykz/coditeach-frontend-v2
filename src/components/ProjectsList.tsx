import Spinner from "../helpers/Spinner";
import Icon from "../helpers/Icon";
import {useNavigate} from "react-router-dom";

interface ProjectsListProps {
    projects: {id: number, name: string, cover_img_url: string, type: string, duration: number}[]
}

export default function ProjectsList({projects}: ProjectsListProps) {
    const navigate = useNavigate()

    if (projects.length === 0) {
        return (
            <div className={"center"} style={{height: '30vh'}}>
                <div style={{alignItems: "center", display: 'flex', flexDirection: 'column'}}>
                    <Spinner color={"#4CA0FC"} size={2}/>
                    <p>
                        Загрузка проектов
                    </p>
                </div>
            </div>
        )
    }

    const redirect = (path: string) => {
        navigate(path,{replace: true})
    }

    const renderedProjects = projects.map((project, index) => {
        return (
            <div key={`${index}-project-list-item`} onClick={()=>{redirect(`/projects/${project.id}`)}}>
                <div className="project-item">
                    <div className="inner">
                        <div className="img-container">
                            <img src={`${project.cover_img_url}`} alt=""/>
                        </div>
                        <div>
                            <p className="project-name">
                                {project.name}
                            </p>
                            <p className="project-category">
                                Общие проекты
                            </p>
                            <div className="project-type">
                                <Icon color={"#4CA0FC"} size={1} name={"Project"}/>
                                {project.type}
                            </div>
                            <div className="project-duration">
                                <Icon color={"#4CA0FC"} size={1} name={"Time"}/>
                                {project.duration} мин
                            </div>
                        </div>
                        <Icon color={"#C2C2C2"} size={1} name={"More"}/>
                    </div>
                    <div className="project-status-closed">
                        Доступ закрыт
                    </div>
                </div>
                <hr className="divider"/>
            </div>
        )
    })

    return (
        <>
            {renderedProjects}
        </>
    )
}