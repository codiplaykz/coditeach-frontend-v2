import GoBackButton from "../components/GoBackButton";
import Icon from "../helpers/Icon";
import {useEffect, useState} from "react";
import CreateCurriculumModal from "../features/Curriculums/components/CreateCurriculumModal";
import CurriculumResponse from "../interfaces/CurriculumResponse";
import {getAllCurriculums} from "../services/curriculums";
import CurriculumsList from "../features/Curriculums/components/CurriculumsList";
// @ts-ignore
import cone from "../assets/images/3dcone.png";

export default function CurriculumsPage() {
    const [showCreateCurriculumModal, setShowCreateCurriculumModal] = useState(false)
    const [curriculums, setCurriculums] = useState<CurriculumResponse[]>()

    useEffect(()=>{
        getAllCurriculums().then(res=>{
            setCurriculums(res)
        })
    }, [setCurriculums])

    return (
        <div className="curriculums-page">
            <CreateCurriculumModal open={showCreateCurriculumModal} setOpen={setShowCreateCurriculumModal}/>
            <div className="curriculums-sidebar">
                <GoBackButton title={"На главную"} path={"/"}/>
                <div className="title">
                    <p>Учебные планы <span className="schools-num">300</span></p>
                    <Icon color={"#C2C2C2"} size={1} name={"More"}/>
                </div>
                <button className={"create-button"} onClick={()=>{setShowCreateCurriculumModal(true)}}>
                    <Icon color={"white"} size={1} name={"Add"}/>
                    Создать учебный план
                </button>

                <CurriculumsList curriculumList={curriculums ?? null}/>
            </div>

            <div className="create-cover">
                <img src={cone} alt="3dcone"/>
                <p>
                    Выберите учебный план для просмотра.
                </p>

                <button className="active-button" onClick={()=>setShowCreateCurriculumModal(true)}>
                    <Icon color={"white"} size={1} name={"Add"}/>
                    Создать учебный план
                </button>
            </div>
        </div>
    )
}