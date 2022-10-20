import Modal from "../helpers/Modal";
import Dropdown from "../helpers/Listbox";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {setProject} from "../store/slices/projectSlice";
import Spinner from "../helpers/Spinner";
import Message from "../helpers/Message";
import {useNavigate} from "react-router-dom";

interface EditProjectModalProps {
    open: boolean,
    setOpen: Function,
    projectData: {
        projectName: string,
        projectType: string,
        projectLevel: string
    }
}

export default function EditProjectModal({open, setOpen, projectData}: EditProjectModalProps) {
    const projectTypes = ['Lifestyle', 'SmartCity', 'Game', 'Robotics']
    const projectLevels = ['Очень легкий', 'Легкий', 'Средний', 'Сложный', 'Очень сложный']
    const [projectType, setProjectType] = useState(projectData.projectType)
    const [projectName, setProjectName] = useState(projectData.projectName)
    const [projectLevel, setProjectLevel] = useState(projectData.projectLevel)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const complete = () => {
        setLoading(true)
        if (projectType === '' || projectName === '' || projectLevel === '') {
            // @ts-ignore
            setMessage(<Message messageText={'Введите все поля!'} messageType={'Warning'}/>)
            setLoading(false)
        } else {
            setTimeout(()=>{
                setLoading(false)
                // @ts-ignore
                setMessage(<Message messageText={'Данные были изменены!'} messageType={'Success'}/>)
                dispatch(setProject({projectType, projectName, projectLevel}))
                setTimeout(()=>{
                    setProjectType('')
                    setProjectName('')
                    setProjectLevel('')
                    setMessage(null)
                    setOpen(false)
                }, 1000)
            }, 1000)
        }
    }

    const renderedLevels = projectLevels.map((item, index) => {
        return (
            <span key={`levels-${index}`} className={`level-tab ${projectLevel === item ? 'level-tab-active' : ''}`}
                  onClick={()=>{setProjectLevel(item)}}>
                {item}
            </span>
        )
    })

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="create-project-modal">
                <div className="title">Редактирование проекта</div>
                {message !== null && message}
                <div className="project-type">
                    <p className="type-title">
                        Тип
                    </p>

                    <Dropdown list={projectTypes} onChange={setProjectType}/>
                </div>

                <div className="project-name">
                    <p className="name-title">
                        Название
                    </p>

                    <input type="text" value={projectName} onChange={(event) => {setProjectName(event.target.value)}} placeholder={"Введите название проекта"} className={"default-input"}/>
                </div>

                <div className="project-level">
                    <p className="level-title">
                        Уровень сложности
                    </p>

                    <div className="levels">
                        {renderedLevels}
                    </div>
                </div>

                <div className="buttons">
                    <button className="not-active-button" onClick={()=>setOpen(false)}>
                        Отменить
                    </button>
                    <button className="active-button" onClick={complete}>
                        {loading ? <Spinner color={"white"} size={1}/> : 'Внести изменения'}
                    </button>
                </div>
            </div>
        </Modal>
    )
}