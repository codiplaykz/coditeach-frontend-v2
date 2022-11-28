import Modal from "../../../helpers/Modal";
import {useState} from "react";
import {createSchoolAdminAccount} from "../../../services/school";
import Message from "../../../helpers/Message";
import Spinner from "../../../helpers/Spinner";

interface CreateSchoolAdminAccountProps{
    open: boolean,
    setOpen: Function,
    schoolId: number
}

const validate = (email: string) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
}

export default function CreateSchoolAdminAccount({open, setOpen, schoolId}: CreateSchoolAdminAccountProps) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    const [resultMessage, setResultMessage] = useState()

    const complete = () => {
        if (email === '' || name === '' || surname == '') {
            // @ts-ignore
            setMessage(<Message messageText={"Введите все поля!"} messageType={"Warning"}/>)
            setTimeout(()=>{
                // @ts-ignore
                setMessage('')
            }, 5000)
        } else if (!validate(email)) {
            // @ts-ignore
            setMessage(<Message messageText={"Введите корректный email"} messageType={"Error"}/>)
            setTimeout(()=>{
                // @ts-ignore
                setMessage('')
            }, 5000)
        } else {
            let data = {
                email, name, surname,
                school_id: schoolId
            }
            setLoading(true)

            createSchoolAdminAccount(data).then(res=>{
                console.log(res)
                // @ts-ignore
                setResultMessage(<Message messageText={"Аккаунт успешно создан!"} messageType={"Success"}/>)
                setTimeout(()=>{
                    setOpen(false)
                    window.location.reload()
                },2000)
            }).catch(err => {
                console.log(err)
                // @ts-ignore
                setResultMessage(<Message messageText={"Что-то пошло не так, попробуйте позже!"} messageType={"Error"}/>)
                setTimeout(()=>{
                    setOpen(false)
                    window.location.reload()
                },2000)
            })
        }
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            {
                resultMessage ? resultMessage : loading ? (
                    <div className="center">
                        <Spinner color={"#4CA0FC"} size={2}/>
                    </div>
                ) : (
                    <div className="create-school-admin-account-modal">
                        <p className="title">
                            Добавления аккаунта
                        </p>

                        {message}

                        <Message messageText={"На указанную почту придет данные для входа на платформу"} messageType={"Info"}/>

                        <div className="email">
                            <input type="email"
                                   required
                                   value={email}
                                   onChange={(e)=>{setEmail(e.target.value)}}
                                   className={"default-input"} placeholder={"Введите почту"}/>
                        </div>

                        <div className="name">
                            <input type="text"
                                   value={name}
                                   onChange={(e)=>{setName(e.target.value)}}
                                   className={"default-input"} placeholder={"Введите имя"}/>
                        </div>

                        <div className="surname">
                            <input type="text"
                                   value={surname}
                                   onChange={(e)=>{setSurname(e.target.value)}}
                                   className={"default-input"} placeholder={"Введите фамилию"}/>
                        </div>

                        <button className="active-button" onClick={complete}>Добавить аккаунт</button>
                    </div>
                )
            }
        </Modal>
    )
}