// @ts-ignore
import errorImg from '../assets/images/500error.jpg'
import {useNavigate} from "react-router-dom";
import Icon from "../helpers/Icon";

export default function ServerSideError() {
    const navigate = useNavigate()
    return (
        <div className="serverside-error-page">
            <div className="inner-container">
                <div className="img">
                    <img src={errorImg} alt=""/>
                </div>
                <div className="text">
                    <div className="inner-text">
                        <div className="title">
                            Ошибка обращения к сервису
                        </div>
                        <div className="desc">
                            Мы уже устраняем неисправность, попробуйте снова через некоторое время. Приносим извенения за временные неудобства.
                        </div>
                        <div className="buttons">
                            <button onClick={()=>{navigate(-1)}}>
                                <Icon color={"gray"} size={1} name={"Back"}/>
                                Вернуться назад
                            </button>
                            <button onClick={()=>{navigate(0)}}>На главную</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}