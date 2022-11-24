import Icon from "../helpers/Icon";
import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import CreateProjectModal from "../components/CreateProjectModal";
import GoBackButton from "../components/GoBackButton";
import ProjectsList from "../components/ProjectsList";
import {getAllProjects} from "../services/project";
import {ProjectResponse} from "../interfaces/ProjectResponse";
import CreateButton from "../components/CreateButton";

// @ts-ignore
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState(0)
    const [createProjectModalShow, setCreateProjectModalShow] = useState(false)
    const [projects, setProjects] = useState<ProjectResponse[]>()
    const [categories, setCategories] = useState(['Все'])

    useEffect(()=>{
        getAllProjects().then(res=>{
            setProjects(res)
            let tempCategories = categories;
            res.forEach((project: ProjectResponse)=>{
                tempCategories.push(project.type)
            })
            setCategories(tempCategories.filter(onlyUnique))
        })
    }, [setProjects, setCategories])

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

                <CreateButton title={"Создать проект"} onClick={()=>{setCreateProjectModalShow(true)}}/>

                <div className="list">
                    <ProjectsList selectedCategory={activeTab} categories={categories} projects={projects ?? null}/>
                </div>
            </div>

            <Outlet/>
        </div>
    )
}