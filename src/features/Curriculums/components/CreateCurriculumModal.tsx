import Modal from "../../../helpers/Modal";
import {ReactElement, useState} from "react";
import {useDispatch} from "react-redux";
import Icon from "../../../helpers/Icon";
import Message from "../../../helpers/Message";
import {setCurriculumInfo} from "../../../store/slices/curriculumSlice";
import {useNavigate} from "react-router-dom";

interface CreateCurriculumModalProps {
    open: boolean
    setOpen: Function
}

export default function CreateCurriculumModal({open, setOpen}: CreateCurriculumModalProps) {
    const [curriculumTitle, setCurriculumTitle] = useState('')
    const [curriculumDesc, setCurriculumDesc] = useState('')
    const [error, setError] = useState<ReactElement>()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const complete = () => {
        if (curriculumTitle === '' || curriculumDesc === '') {
            setError(<Message messageText={"Введите все поля."} messageType={"Warning"}/>)
            setTimeout(()=>{
                setError(<></>)
            }, 5000)
        } else {
            let curriculumInfo = {
                title: curriculumTitle,
                description: curriculumDesc
            }
            setCurriculumTitle('')
            setCurriculumDesc('')
            dispatch(setCurriculumInfo(curriculumInfo))
            navigate('/create-curriculum')
        }
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="create-curriculum-modal">
                <p className="title">
                    Создание учебного плана
                </p>
                {error}
                <div>
                    <div className="subtitle">
                        Название учебного плана
                    </div>
                    <input className={"default-input"} value={curriculumTitle}
                           onChange={(e)=>{setCurriculumTitle(e.target.value)}}
                           placeholder={"Введите название учебного плана"}/>
                </div>

                <div>
                    <div className="subtitle">
                        Описание учебного плана
                    </div>
                    <textarea className={"default-input"} value={curriculumDesc}
                              onChange={(e)=>{setCurriculumDesc(e.target.value)}}
                              placeholder={"Введите описание учебного плана"}/>
                </div>

                <button className={"active-button"} onClick={complete}>
                    <Icon color={"white"} size={1} name={"Add"}/>
                    Создать учебный план
                </button>
            </div>
        </Modal>
    )
}