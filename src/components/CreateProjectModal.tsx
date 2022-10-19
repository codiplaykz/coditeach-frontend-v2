import Modal from "../helpers/Modal";
import Dropdown from "../helpers/Listbox";
import {useState} from "react";

interface CreateProjectModalProps {
    open: boolean,
    setOpen: Function
}

export default function CreateProjectModal({open, setOpen}: CreateProjectModalProps) {
    const projectTypes = ['Lifestyle', 'SmartCity', 'Game', 'Robotics']
    const projectLevels = ['Очень легкий', 'Легкий', 'Средний', 'Сложный', 'Очень сложный']
    const [projectType, setProjectType] = useState()
    const [projectName, setProjectName] = useState('')
    const [projectLevel, setProjectLevel] = useState('')

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
                <div className="title">Создание проекта</div>

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
                    <button className="active-button">
                        Составить программу
                    </button>
                </div>
            </div>
        </Modal>
    )
}