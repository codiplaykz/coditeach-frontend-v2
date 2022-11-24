import useNetwork from "../hooks/use-network";
import Icon from "../helpers/Icon";
import {useEffect, useState} from "react";

export default function NetworkStatusBar() {
    const status = useNetwork()
    const [show, setShow] = useState(!status)
    const offlineStr = 'Соединение потеряно'
    const onlineStr = 'Соединение восстановлено'

    useEffect(()=>{
        if (!status) {
            setShow(true)
        }
        if (status) {
            setTimeout(()=>{
                setShow(false)
            },2000)
        }
    },[status, setShow])


    return (
        <div style={{display: show ? 'flex' : 'none'}} className={`network-status-bar ${status ? 'online' : 'offline'}`}>
            <Icon color={"white"} size={1} name={status ? 'Online' : 'Offline'}/>
            {
                status ? onlineStr : offlineStr
            }
        </div>
    )
}