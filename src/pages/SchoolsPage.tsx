import GoBackButton from "../components/GoBackButton";
import Icon from "../helpers/Icon";
import Search from "../components/Search";
import {useEffect, useState} from "react";
import CreateButton from "../components/CreateButton";
import {SchoolResponse} from "../interfaces/SchoolResponse";
import {getAllSchools} from "../services/school";
import CreateSchoolModal from "../components/CreateSchoolModal";
import Spinner from "../helpers/Spinner";
import {Outlet, useNavigate} from "react-router-dom";

export default function SchoolsPage() {
    const [result, setResults] = useState()
    const [schools, setSchools] = useState<SchoolResponse[]>()
    const [createSchoolModalShow, setCreateSchoolModalShow] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        getAllSchools().then(res=>{
            setSchools(res)
        })
    },[setSchools])

    const renderedSchoolsList = schools?.map((school, index)=>{
        return (
            <div className="school-item" onClick={()=>{navigate(`/schools/${school.id}`)}}>
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
                    {/*@ts-ignore*/}
                    <Search array={schools} result={result} setResult={setResults}/>
                </div>
                <CreateButton title={"Добавить школу"} onClick={()=>{setCreateSchoolModalShow(true)}}/>

                <div className="schools-list">
                    {
                        schools ? renderedSchoolsList : (
                            <div className={"center"} style={{height: '30vh'}}>
                                <div style={{alignItems: "center", display: 'flex', flexDirection: 'column'}}>
                                    <Spinner color={"#4CA0FC"} size={2}/>
                                    <p>
                                        Загрузка школ
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <Outlet/>
        </div>
    )
}