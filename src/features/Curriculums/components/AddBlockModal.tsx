import Modal from "../../../helpers/Modal";
import Icon from "../../../helpers/Icon";
import {ReactElement, useState} from "react";
import Message from "../../../helpers/Message";
import {useDispatch} from "react-redux";
import {addBlock} from "../../../store/slices/curriculumSlice";

interface AddBlockModalProps {
    open: boolean
    setOpen: Function
}

export default function AddBlockModal(props: AddBlockModalProps) {
    const { open, setOpen } = props
    const [blockTitle, setBlockTitle] = useState('')
    const [blockDesc, setBlockDesc] = useState('')
    const [error, setError] = useState<ReactElement>()
    const dispatch = useDispatch()

    const complete = () => {
        if (blockTitle === '' || blockDesc === '') {
            setError(<Message messageText={"Введите все поля."} messageType={"Warning"}/>)
            setTimeout(()=>{
                setError(<></>)
            }, 5000)
        } else {
            let block = {
                title: blockTitle,
                description: blockDesc,
                lessons: []
            }
            setBlockTitle('')
            setBlockDesc('')
            dispatch(addBlock({block: block}))
            setOpen(false)
        }
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="add-block-modal">
                <p className="title">
                    Создание блока
                </p>
                {error}
                <div>
                    <div className="subtitle">
                        Название блока
                    </div>
                    <input className={"default-input"} value={blockTitle}
                           onChange={(e)=>{setBlockTitle(e.target.value)}}
                           placeholder={"Введите название блока"}/>
                </div>

                <div>
                    <div className="subtitle">
                        Описание блока
                    </div>
                    <textarea className={"default-input"} value={blockDesc}
                              onChange={(e)=>{setBlockDesc(e.target.value)}}
                              placeholder={"Введите описание блока"}/>
                </div>

                <button className={"active-button"} onClick={complete}>
                    <Icon color={"white"} size={1} name={"Add"}/>
                    Добавить блок
                </button>
            </div>
        </Modal>
    )
}