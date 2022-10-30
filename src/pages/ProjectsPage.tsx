import Icon from "../helpers/Icon";
import {useEffect, useState} from "react";
import {Outlet, useParams} from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import GoBackButton from "../components/GoBackButton";
import ProjectsList from "../components/ProjectsList";
import {getAllProjects} from "../services/project";

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState(0)
    const [createProjectModalShow, setCreateProjectModalShow] = useState(false)
    const [projects, setProjects] = useState()
    const categories = ['Все', 'Lifestyle', 'SmartCity',  'Game', 'Robotics']

    useEffect(()=>{
        if (!projects) {
            getAllProjects().then(res=>{
                console.log(res)
                setProjects(res)
            })
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

            <Outlet/>
        </div>
    )
}