import Modal from "../../../helpers/Modal";
import {useState} from "react";
import Spinner from "../../../helpers/Spinner";
import Message from "../../../helpers/Message";
import {useNavigate} from "react-router-dom";
import {editSchool} from "../../../services/school";
import InputAutocomplete from "../../../helpers/InputAutocomplete";
import {KZCities} from "./CreateSchoolModal";
import LicenseExpirationPlans from "./LicenseExpirationPlans";

interface EditSchoolModalProps {
    open: boolean,
    setOpen: Function,
    schoolData: {
        id: number,
        name: string,
        location: string,
        license_expiration_date: string,
    }
}

export default function EditSchoolModal({open, setOpen, schoolData}: EditSchoolModalProps) {
    const {id, name, location, license_expiration_date} = schoolData
    const expDateMonth = (new Date(license_expiration_date).getMonth())-(new Date().getMonth()) + 12
    const [selectedLicensePlan, setSelectedLicensePlan] = useState(expDateMonth)
    const [schoolName, setSchoolName] = useState(name)
    const [schoolLocation, setSchoolLocation] = useState(location)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const update = () => {
        setLoading(true)
        if (schoolName === '' || schoolLocation === '') {
            // @ts-ignore
            setMessage(<Message messageText={'Введите все поля!'} messageType={'Warning'}/>)
            setLoading(false)
        } else {
            const expDate = new Date((new Date()).setMonth(new Date().getMonth()+selectedLicensePlan))
            let data = {
                id,
                name: schoolName,
                location: schoolLocation,
                license_expiration_date: expDate
            }
            editSchool(data).then(res=>{
                console.log(res)
                setLoading(false)
                // @ts-ignore
                setMessage(<Message messageText={'Данные школы успешно изменены!'} messageType={'Success'}/>)
                setTimeout(()=>{
                    navigate(0)
                    setMessage(null)
                }, 1000)
            })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                    // @ts-ignore
                    setMessage(<Message messageText={'Произошла ошибка, попробуйте позже.'} messageType={'Error'}/>)
                    setTimeout(()=>{
                        setMessage(null)
                        setOpen(false)
                    }, 2000)
                })
        }
    }

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className="create-school-modal">
                <div className="title">Изменение данных школы</div>
                {message !== null && message}
                <div className="school-name">
                    <p className="name-title">
                        Название
                    </p>

                    <input type="text" value={schoolName}
                           onChange={(event) => {setSchoolName(event.target.value)}}
                           placeholder={"Введите название школы"} className={"default-input"}/>
                </div>
                <div className="school-location">
                    <p className="name-title">
                        Город или село
                    </p>

                    <InputAutocomplete array={KZCities} selected={schoolLocation} setSelected={setSchoolLocation}/>
                </div>
                <div className="license-plan">
                    <p className="plan-title">
                        Срок лицензий
                    </p>

                    <LicenseExpirationPlans selected={selectedLicensePlan} setSelected={setSelectedLicensePlan}/>
                </div>
                <div className="buttons">
                    <button className="not-active-button" onClick={()=>setOpen(false)}>
                        Отменить
                    </button>
                    <button className="active-button" disabled={loading} onClick={update}>
                        {loading ? <Spinner color={"white"} size={1}/> : 'Изменить'}
                    </button>
                </div>
            </div>
        </Modal>
    )
}