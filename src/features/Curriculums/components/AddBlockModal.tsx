import Modal from "../../../helpers/Modal";
import Icon from "../../../helpers/Icon";
import {ReactElement, useState} from "react";
import Message from "../../../helpers/Message";

interface AddBlockModalProps {
    addBlock: Function
    open: boolean
    setOpen: Function
    blockTitle: string
    setBlockTitle: Function
    blockDesc: string
    setBlockDesc: Function
}

export default function AddBlockModal(props: AddBlockModalProps) {
    const {addBlock, open, setOpen, blockTitle, setBlockTitle, blockDesc, setBlockDesc} = props
    const [error, setError] = useState<ReactElement>()
    const complete = () => {
        if (blockTitle === '' || blockDesc === '') {
            setError(<Message messageText={"Введите все поля."} messageType={"Warning"}/>)
            setTimeout(()=>{
                setError(<></>)
            }, 5000)
        } else {
            addBlock()
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