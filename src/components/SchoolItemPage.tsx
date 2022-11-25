import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Spinner from "../helpers/Spinner";
import {SchoolResponse} from "../interfaces/SchoolResponse";
import {deleteSchoolById, getSchoolById} from "../services/school";
import Icon from "../helpers/Icon";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditSchoolModal from "./EditSchoolModal";

export default function SchoolItemPage() {
    const [schoolData, setSchoolData] = useState<SchoolResponse>()
    const [showDeleteSchoolModal, setShowDeleteSchoolModal] = useState(false)
    const [showEditSchoolModal, setShowEditSchoolModal] = useState(false)
    const {schoolId} = useParams()

    useEffect(()=>{
        getSchoolById(schoolId).then(res=>{
            setSchoolData(res)
        }).catch(error => {
            if (error?.response?.status === 404) {
                window.location.href = '/404'
            }
        })
    },[setSchoolData, schoolId])

    if (!schoolData) {
        return (
            <div className={"center"} style={{height: '100vh'}}>
                <div style={{alignItems: "center", display: 'flex', flexDirection: 'column'}}>
                    <Spinner color={"#4CA0FC"} size={2}/>
                    <p>
                        Загрузка школы
                    </p>
                </div>
            </div>
        )
    }

    const {
        id,
        name,
        location,
        license_expiration_date,
    } = schoolData

    const deleteTitle = (
        <p>
            Вы действительно хотите удалить школу: <span style={{color: "#4CA0FC"}}>{name}</span> ?
        </p>
    )

    const editSchool = () => {
        setShowEditSchoolModal(true)
    }

    return (
        <div className="school-item-page-container" key={`${id}-school-item-page`}>
            <EditSchoolModal schoolData={{
                id,
                name,
                location,
                license_expiration_date
            }} open={showEditSchoolModal} setOpen={setShowEditSchoolModal}/>
            <DeleteConfirmationModal open={showDeleteSchoolModal} redirectLink={'/schools'} setOpen={setShowDeleteSchoolModal}
                                     title={deleteTitle} deleteAction={() => deleteSchoolById(id)}/>
            <div className="school-general-information">
                <div className="info">
                    <p className="location">
                        {location}
                    </p>
                    <p className="name">
                        {name}
                    </p>
                    <p className="license-expiration-date">
                        Подписка оформлена до {new Date(license_expiration_date).toLocaleDateString()}
                    </p>
                </div>
                <div className="control-buttons">
                    {/*@ts-ignore*/}
                    <Icon color={"black"} size={1} name={'Edit'} onClick={()=>(editSchool())}/>
                    {/*@ts-ignore*/}
                    <Icon color={"red"} size={1} name={'Delete'} onClick={()=>{setShowDeleteSchoolModal(true)}}/>
                </div>
            </div>
            <div className="school-admins-accounts">
                <p className="title">
                    Корпоративные аккаунты
                </p>

                <button>
                    <Icon color={"black"} size={1} name={"AddStudents"}/>
                    Добавить аккаунт
                </button>
            </div>
            <div className="school-classes">
                <p className="title">
                    Классы
                </p>
                <Link to={"/"}>
                    Перейти к классам школы
                    <Icon color={"#4CA0FC"} size={1} name={"Back"}/>
                </Link>
            </div>
        </div>
    )
}