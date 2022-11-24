import GoBackButton from "../components/GoBackButton";
import Icon from "../helpers/Icon";
import Search from "../components/Search";
import {useEffect, useState} from "react";
import CreateButton from "../components/CreateButton";
import {SchoolResponse} from "../interfaces/SchoolResponse";
import {getAllSchools} from "../services/school";
import CreateSchoolModal from "../components/CreateSchoolModal";
import Spinner from "../helpers/Spinner";

export default function SchoolsPage() {
    const [schools, setSchools] = useState<SchoolResponse[]>()
    const [createSchoolModalShow, setCreateSchoolModalShow] = useState(false)

    useEffect(()=>{
        getAllSchools().then(res=>{
            setSchools(res)
        })
    },[setSchools])

    const renderedSchoolsList = schools?.map((school, index)=>{
        return (
            <div className="school-item">
                {school.name}
            </div>
        )
    })

    return (
        <div className="schools-page">
            <CreateSchoolModal open={createSchoolModalShow} setOpen={setCreateSchoolModalShow}/>
            <div className="schools-sidebar">
                <GoBackButton title={"На главную"} path={"/"}/>
                <div className="title">
                    <p>Школы <span className="schools-num">300</span></p>
                    <Icon color={"#C2C2C2"} size={1} name={"More"}/>
                </div>
                <div className="schools-search">
                    <Search array={[]} setArray={setSchools}/>
                </div>
                <CreateButton title={"Добавить школу"} onClick={()=>{setCreateSchoolModalShow(true)}}/>

                <div className="schools-list">
                    {
                        schools ? renderedSchoolsList : (
                            <div className='centered-div'>
                                <Spinner color={"#4CA0FC"} size={1}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}