import Modal from "../helpers/Modal";
import Icon from "../helpers/Icon";

interface ConfirmActionModalProps {
    title: string
    info: string
    open: boolean
    setOpen: Function
    confirmAction: Function
}

export default function ConfirmActionModal(props: ConfirmActionModalProps) {
    const {title, info, confirmAction, open, setOpen} = props

    const confirm = () => {
        confirmAction()
    }

    const cancel = () => {
        setOpen(false)
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="confirm-action-modal">
                <p className="title">
                    {title}
                </p>
                <p className="info">
                    <Icon color={"black"} size={1} name={"Warning"}/>

                    {info}
                </p>
                <div className="confirm-buttons">
                    <button className="not-active-button" onClick={cancel}>
                        Нет, отменить
                    </button>

                    <button className="active-button" onClick={confirm}>
                        Подтвердить
                    </button>
                </div>
            </div>
        </Modal>
    )
}