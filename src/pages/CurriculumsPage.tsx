import GoBackButton from "../components/GoBackButton";
import Icon from "../helpers/Icon";
import {Outlet, useNavigate} from "react-router-dom";

export default function CurriculumsPage() {
    const navigate = useNavigate()

    return (
        <div className="curriculums-page">
            <div className="curriculums-sidebar">
                <GoBackButton title={"На главную"} path={"/"}/>
                <div className="title">
                    <p>Учебные планы <span className="schools-num">300</span></p>
                    <Icon color={"#C2C2C2"} size={1} name={"More"}/>
                </div>
                <button className={"create-button"} onClick={()=>{navigate('/create-curriculum')}}>
                    <Icon color={"white"} size={1} name={"Add"}/>
                    Создать учебный план
                </button>
            </div>

            <Outlet/>
        </div>
    )
}