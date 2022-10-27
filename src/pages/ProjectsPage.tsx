import Icon from "../helpers/Icon";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import GoBackButton from "../components/GoBackButton";
import ProjectsList from "../components/ProjectsList";
import {getAllProjects} from "../services/project";
import ProjectContainer from "../components/ProjectContainer";
// @ts-ignore
import cube from '../assets/images/3dcube.svg'

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState(0)
    const [createProjectModalShow, setCreateProjectModalShow] = useState(false)
    const [selectedProject, setSelectedProject] = useState()
    const [projects, setProjects] = useState()
    const categories = ['Все', 'Lifestyle', 'SmartCity',  'Game', 'Robotics']
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(()=>{
        if (!projects) {
            getAllProjects().then(res=>{
                console.log(res)
                setProjects(res)
            })
        }
        if (id && projects && !selectedProject) {
            // @ts-ignore
            let project = projects.find(project => project.id === +id)
            if (project) {
                setSelectedProject(project)
            }
        }
    }, [projects])

    const renderedTabs = categories.map((item, index) => {
        return (
            <>
                <button key={`project-type-${index}`}
                        className={`type-tab ${activeTab === index && 'active'}`}
                        onClick={()=>{setActiveTab(index)}}>
                    {item}
                </button>
            </>
        )
    })

    const redirect = (path: string) => {
        navigate(path)
    }


    return (
        <div className="projects-page">
            <CreateProjectModal open={createProjectModalShow} setOpen={setCreateProjectModalShow}/>
            <div className="projects-list">
                <GoBackButton path={'/'} title={"На главную"} />

                <p className="title">
                    Общие проекты
                </p>

                <div className="types-tabs">
                    {renderedTabs}
                </div>

                <button className="create-project-button" onClick={()=>setCreateProjectModalShow(true)}>
                    <Icon color={"white"} size={1} name={"Add"}/>
                    Создать проект
                </button>

                <div className="list">
                    <ProjectsList projects={projects ?? []}/>
                </div>
            </div>

            {
                selectedProject ? <ProjectContainer project={selectedProject}/> : (
                    <div className="create-project-cover">
                        <img src={cube} alt="3dcube"/>
                        <p>
                            Выберите проект для просмотра.
                        </p>

                        <button className="active-button" onClick={()=>setCreateProjectModalShow(true)}>
                            <Icon color={"white"} size={1} name={"Add"}/>
                            Создать проект
                        </button>
                    </div>
                )
            }

        </div>
    )
}