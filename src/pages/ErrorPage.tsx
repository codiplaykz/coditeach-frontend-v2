// @ts-ignore
import error500 from '../assets/images/500error.jpg'
// @ts-ignore
import error404 from '../assets/images/404error.jpg'
import {useNavigate} from "react-router-dom";
import Icon from "../helpers/Icon";

interface ErrorPageProps {
    errorCode: number
}

export default function ErrorPage({errorCode}: ErrorPageProps) {
    const navigate = useNavigate()

    let errorImg = ''
    let errorMsg = ''
    let errorDesc = ''

    if (errorCode === 500) {
        errorImg = error500
        errorMsg = "Ошибка обращения к сервису"
        errorDesc = 'Мы уже устраняем неисправность, попробуйте снова через некоторое время. Приносим извенения за временные неудобства.'
    } else if (errorCode === 404) {
        errorImg = error404
        errorMsg = "Страница не найдена"
        errorDesc = 'Не можем найти страницу которую вы ищете.'
    }

    return (
        <div className="serverside-error-page">
            <div className="inner-container">
                <div className="img">
                    <img src={errorImg} alt=""/>
                </div>
                <div className="text">
                    <div className="inner-text">
                        <div className="title">
                            {errorMsg}
                        </div>
                        <div className="desc">
                            {errorDesc}
                        </div>
                        <div className="buttons">
                            <button onClick={()=>{navigate(-1)}}>
                                <Icon color={"gray"} size={1} name={"Back"}/>
                                Вернуться назад
                            </button>
                            <button onClick={()=>{navigate('/')}}>На главную</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}