import Modal from "../helpers/Modal";
import Icon from "../helpers/Icon";
import {useNavigate} from "react-router-dom";

interface MessageModalProps {
    type: 'ok' | 'error'
    title: string,
    open: boolean,
    setOpen: Function,
    secondaryButtonText: string,
    secondaryButtonLink: string,
    primaryButtonText: string,
    primaryButtonLink: string,
}

export default function MessageModal(props: MessageModalProps) {
    const {type,title,open,setOpen,secondaryButtonText,secondaryButtonLink,primaryButtonText,primaryButtonLink} = props
    const navigate = useNavigate()

    const icon = type === 'ok' ? (<Icon color={"#25CD36"} size={3} name={'Success'}/>) :
        (<Icon color={"#F20000"} size={3} name={'Fail'}/>)

    const redirect = (path: string) => {
        navigate(path)
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="message-modal">
                <div className="message-title">
                    {icon}
                    <p>
                        {title}
                    </p>
                </div>
                <div className="message-buttons">
                    <button className="not-active-button" onClick={()=>redirect(secondaryButtonLink)}>
                        {secondaryButtonText}
                    </button>

                    <button className="active-button" onClick={()=>redirect(primaryButtonLink)}>
                        {primaryButtonText}
                    </button>
                </div>
            </div>
        </Modal>
    )
}