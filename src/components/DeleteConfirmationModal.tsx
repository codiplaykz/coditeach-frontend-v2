import Modal from "../helpers/Modal";
import Message from "../helpers/Message";
import {ReactElement, useState} from "react";
import Spinner from "../helpers/Spinner";

interface DeleteConfirmationModal {
    open: boolean,
    setOpen: Function,
    redirectLink: string,
    title: any,
    deleteAction: Function
}

export default function DeleteConfirmationModal({open, setOpen, title, deleteAction, redirectLink}: DeleteConfirmationModal) {
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<ReactElement>()

    const del = () => {
        setLoading(true)
        deleteAction().then((res: any)=>{
            setResult(<Message messageText={"Успешно уделано!"} messageType={"Success"}/>)
            setLoading(false)
            setTimeout(()=>{
                setOpen(false)
                window.location.href = redirectLink
            },2000)
        }).catch((error: any) => {
            setResult(<Message messageText={"Что-то пошло не так, попробуйте чуть позже"} messageType={"Error"}/>)
            setLoading(false)
            setTimeout(()=>{setOpen(false)},2000)
        })
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            {
                result ? result : loading ? (
                    <div className={"center"} style={{margin: "25px 0"}}>
                        <Spinner color={"#4CA0FC"} size={2}/>
                    </div>
                ) : (
                    <div className="delete-modal-container">
                        <p className="delete-modal-title">
                            {title}
                        </p>
                        <Message messageText={"Восстановить будет невозможно"} messageType={"Warning"}/>
                        <div className="delete-modal-buttons">
                            <button className="not-active-button" onClick={()=>setOpen(false)}>
                                Нет, отменить
                            </button>

                            {/*@ts-ignore*/}
                            <button className="active-button" onClick={del}>
                                Да, удалить
                            </button>
                        </div>
                    </div>
                )
            }
        </Modal>
    )
}