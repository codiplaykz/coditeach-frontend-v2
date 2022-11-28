import {useState} from "react";
// @ts-ignore
import rock from "../../../assets/images/Rock.svg";
import Icon from "../../../helpers/Icon";
import CreateSchoolModal from "./CreateSchoolModal";

export default function CreateSchoolCover() {
    const [createSchoolModalShow, setCreateSchoolModalShow] = useState(false)

    return (
        <div className="add-school-cover">
            <CreateSchoolModal open={createSchoolModalShow} setOpen={setCreateSchoolModalShow}/>
            <img src={rock} alt="rock"/>
            <p>
                Выберите школу для просмотра.
            </p>

            <button className="active-button" onClick={()=>setCreateSchoolModalShow(true)}>
                <Icon color={"white"} size={1} name={"Add"}/>
                Добавить школу
            </button>
        </div>
    )
}