import {useState} from "react";
// @ts-ignore
import cube from "../../../assets/images/3dcube.svg";
import Icon from "../../../helpers/Icon";
import CreateProjectModal from "./CreateProjectModal";

export default function CreateProjectCover() {
    const [createProjectModalShow, setCreateProjectModalShow] = useState(false)

    return (
        <div className="create-cover">
            <CreateProjectModal open={createProjectModalShow} setOpen={setCreateProjectModalShow}/>
            <img src={cube} alt="3dcube"/>
            <p>
                Выберите проект для просмотра.
            </p>

            <button className="active-button" onClick={()=>setCreateProjectModalShow(true)}>
                <Icon color={"white"} size={1} name={"Add"}/>
                Создать проект
            </button>
        </div>
    )
}