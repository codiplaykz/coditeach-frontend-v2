import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Spinner from "../helpers/Spinner";
import {SchoolResponse} from "../interfaces/SchoolResponse";
import {deleteSchoolAdminAccount, deleteSchoolById, getSchoolAdminsById, getSchoolById} from "../services/school";
import Icon from "../helpers/Icon";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EditSchoolModal from "./EditSchoolModal";
import CreateSchoolAdminAccount from "./CreateSchoolAdminAccount";
import {SchoolAdminResponse} from "../interfaces/SchoolAdminResponse";
import CustomPopover from "../helpers/CustomPopover";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SchoolItemPage() {
    const [schoolData, setSchoolData] = useState<SchoolResponse>()
    const [schoolAdmins, setSchoolAdmins] = useState<SchoolAdminResponse[]>([])
    const [showCreateSchoolAdminAccModal, setShowCreateSchoolAdminAccModal] = useState(false)
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
        getSchoolAdminsById(schoolId).then(res=>{
            setSchoolAdmins(res)
        })
    },[setSchoolData, setSchoolAdmins, schoolId])

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

    const deleteSchoolAdmin = (school_admin_id: number, user_id: number) => {
        deleteSchoolAdminAccount(school_admin_id, user_id).then(res=>{
            console.log(res)
            toast("Аккаунт удален!",{type: "success"})

            setTimeout(()=>{
                window.location.reload()
            }, 3000)
        }).catch((err) => {
            console.log(err)
            toast("Что-то пошло не так, попробуйте позже.",{type: "error"})

            setTimeout(()=>{
                window.location.reload()
            }, 3000)
        })
    }

    // @ts-ignore
    const renderedSchoolAdminAccounts = schoolAdmins.map((schoolAdmin, index) => {
        return (
            <div className="school-admin-account" key={`school-admin-acc ${index}`}>
                <p className={"name"}>{schoolAdmin.name + ' ' + schoolAdmin.surname}</p>
                <p className={"email"}>{schoolAdmin.email}</p>
                <CustomPopover button={<Icon color={"grey"} size={1} name={"More"}/>}>
                    <div className="delete-button" onClick={()=>{deleteSchoolAdmin(schoolAdmin.id, schoolAdmin.user_id)}}>
                        <Icon color={"#F20000"} size={1} name={"Delete"}/>
                        Удалить аккаунт
                    </div>
                </CustomPopover>
            </div>
        )
    })

    return (
        <div className="school-item-page-container" key={`${id}-school-item-page`}>
            <ToastContainer position="top-center"
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"/>
            <CreateSchoolAdminAccount open={showCreateSchoolAdminAccModal}
                                      setOpen={setShowCreateSchoolAdminAccModal}
                                      schoolId={id}/>
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

                { renderedSchoolAdminAccounts.length !== 0  ? renderedSchoolAdminAccounts : 'Нету добавленных аккаунтов'}

                <button onClick={()=>{setShowCreateSchoolAdminAccModal(true)}}>
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