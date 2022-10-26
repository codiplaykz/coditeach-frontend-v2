import '../styles/helpers/alertMessage.scss'
import Modal from "./Modal";
// @ts-ignore
import done from '../assets/gifs/done.gif'
// @ts-ignore
import info from '../assets/gifs/info.gif'
// @ts-ignore
import warning from '../assets/gifs/warning.gif'
// @ts-ignore
import error from '../assets/gifs/error.gif'

interface MessageProps {
    open: boolean
    setOpen: Function
    messageText: string
    messageType: 'Warning' | 'Error' | 'Info' | 'Success'
}

export default function AlertMessage({messageText, messageType, open, setOpen}:MessageProps) {

    const icon = (
        messageType === 'Success' ? <img src={done} width={64} alt="done"/> :
            messageType === 'Warning' ? <img src={warning} width={64} alt="warning"/> :
                messageType === 'Error' ? <img src={error} width={64} alt="warning"/> :
                    messageType === 'Info' ? <img src={info} width={64} alt="warning"/> : null
    )

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="alert-message">
                <div className="title">
                    {icon}
                    {messageText}
                </div>
                <div className="button">
                    <button className="active-button" onClick={()=>setOpen(false)}>
                        Понятно
                    </button>
                </div>
            </div>
        </Modal>
    )
}