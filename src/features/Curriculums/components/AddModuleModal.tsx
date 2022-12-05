import Modal from "../../../helpers/Modal";
import Icon from "../../../helpers/Icon";
import {ReactElement, useState} from "react";
import Message from "../../../helpers/Message";
import {useDispatch} from "react-redux";
import {addModule} from "../../../store/slices/curriculumSlice";

interface AddModuleModalProps {
    open: boolean
    setOpen: Function
}

export default function AddModuleModal(props: AddModuleModalProps) {
    const { open, setOpen } = props
    const [moduleTitle, setModuleTitle] = useState('')
    const [moduleDesc, setModuleDesc] = useState('')
    const [error, setError] = useState<ReactElement>()
    const dispatch = useDispatch()

    const complete = () => {
        if (moduleTitle === '' || moduleDesc === '') {
            setError(<Message messageText={"Введите все поля."} messageType={"Warning"}/>)
            setTimeout(()=>{
                setError(<></>)
            }, 5000)
        } else {
            let module = {
                title: moduleTitle,
                description: moduleDesc,
                blocks: []
            }
            setModuleDesc('')
            setModuleTitle('')
            dispatch(addModule({module: module}))
            setOpen(false)
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