import Icon from "../helpers/Icon";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Code from "../components/SourceCodeSection";
import SourceCodeSection from "../components/SourceCodeSection";
import CreateProjectModal from "../components/CreateProjectModal";
import GoBackButton from "../components/GoBackButton";
import ProjectsList from "../components/ProjectsList";
import {getAllProjects} from "../services/project";

export default function ProjectsPage() {
    const [activeTab, setActiveTab] = useState(0)
    const [createProjectModalShow, setCreateProjectModalShow] = useState(false)
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

    const codeString = `using System;           
    namespace HelloWorld
    {
      class Program
      {
        static void Main(string[] args)
        {
          Console.WriteLine("Hello World!");    
        }
      }
    }`

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
            <div className="project-container">
                <div className="project-info">
                    <div className="project-header">
                        <div>
                            <p className="project-type">
                                SmartCity
                            </p>
                            <p className="project-name">
                                Светофор
                            </p>
                            <p className="project-level">
                                Очень легкий
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
                            <img src="https://www.makerspaces.com/wp-content/uploads/2017/05/14-Motor_LARGE.jpg" alt=""/>
                        </div>

                        <p>
                            Станьте специалистом в сфере интернета вещей - Internet of things (IoT) - с нуля и создайте сеть умных гаджетов. Изучите язык C, механизмы отладки и программирования микроконтроллеров (STM32, Arduino). Вы получите опыт работы с технологиями Wi-Fi, Bluetooth и LoRa для построения современных встраиваемых систем.
                        </p>
                    </div>
                </div>

                <div className="project-duration">
                    <p className="title">
                        <Icon color={"#4CA0FC"} size={1} name={"Time"}/>
                        Время на выполнение
                    </p>
                    <p>30 минут</p>
                </div>

                <div className="project-details">
                    <p className="title">
                        <Icon color={"#4CA0FC"} size={1} name={"TechComponents"}/>
                        Необходимые компоненты
                    </p>
                    <ol className="list">
                        <li>Arduino UNO</li>
                        <li>Arduino Cable</li>
                        <li>LCD</li>
                    </ol>
                </div>

                <div className="project-box-link">
                    <p className="title">
                        <Icon color={"#4CA0FC"} size={1} name={"Links"}/>
                        Ссылка для покупки набора
                    </p>

                    <p className="link">
                        <a href="/">buy.codiplay.kz</a>
                        - общая информация, документация
                    </p>
                </div>

                <div className="project-code">
                    <p className="title">
                        <Icon color={"#4CA0FC"} size={1} name={"Code"}/>
                        Исходный код проекта
                    </p>
                    <SourceCodeSection sourceCode={codeString}/>

                </div>
            </div>
        </div>
    )
}