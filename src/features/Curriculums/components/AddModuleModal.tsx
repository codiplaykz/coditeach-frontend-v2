import Modal from "../../../helpers/Modal";
import Icon from "../../../helpers/Icon";
import {ReactElement, useState} from "react";
import Message from "../../../helpers/Message";

interface AddModuleModalProps {
    addModule: Function
    open: boolean
    setOpen: Function
    moduleTitle: string
    setModuleTitle: Function
    moduleDesc: string
    setModuleDesc: Function
}

export default function AddModuleModal(props: AddModuleModalProps) {
    const {addModule, open, setOpen, moduleTitle, setModuleTitle, moduleDesc, setModuleDesc} = props
    const [error, setError] = useState<ReactElement>()
    const complete = () => {
        if (moduleTitle === '' || moduleDesc === '') {
            setError(<Message messageText={"Введите все поля."} messageType={"Warning"}/>)
            setTimeout(()=>{
                setError(<></>)
            }, 5000)
        } else {
            addModule()
        }
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="add-module-modal">
                <p className="title">
                    Создание модуля
                </p>
                {error}
                <div>
                    <div className="subtitle">
                        Название модуля
                    </div>
                    <input className={"default-input"} value={moduleTitle}
                           onChange={(e)=>{setModuleTitle(e.target.value)}}
                           placeholder={"Введите название модуля"}/>
                </div>

                <div>
                    <div className="subtitle">
                        Описание модуля
                    </div>
                    <textarea className={"default-input"} value={moduleDesc}
                              onChange={(e)=>{setModuleDesc(e.target.value)}}
                              placeholder={"Введите описание модуля"}/>
                </div>

                <button className={"active-button"} onClick={complete}>
                    <Icon color={"white"} size={1} name={"Add"}/>
                    Добавить модуль
                </button>
            </div>
        </Modal>
    )
}