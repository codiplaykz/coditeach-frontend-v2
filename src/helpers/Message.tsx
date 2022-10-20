import '../styles/helpers/message.scss'
import Icon from "./Icon";

interface MessageProps {
    messageText: string
    messageType: 'Warning' | 'Error' | 'Info' | 'Success'
}

export default function Message({messageText, messageType}:MessageProps) {
    const colors = {
        Warning: '#fbbf24',
        Error: '#f33800',
        Info: '#267ce9',
        Success: '#1bc44b'
    }
    const icon = (
        <Icon color={colors[messageType]} size={1} name={messageType}/>
    )

    return (
        <div className={`message-container ${messageType}`}>
            {icon}
            {messageText}
        </div>
    )
}