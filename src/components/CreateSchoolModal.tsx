import Modal from "../helpers/Modal";
import {useState} from "react";
import Spinner from "../helpers/Spinner";
import Message from "../helpers/Message";
import {useNavigate} from "react-router-dom";
import {createSchool} from "../services/school";
import InputAutocomplete from "../helpers/InputAutocomplete";
import LicenseExpirationPlans from "./LicenseExpirationPlans";

interface CreateSchoolModalProps {
    open: boolean,
    setOpen: Function
}

export const KZCities = [
    'Алматы',
    'Астана',
    'Шымкент',
    'Абай',
    'Айтеке Би',
    'Акколь',
    'Аксу',
    'Аксу Павл.',
    'Аксуат',
    'Актау',
    'Актобе',
    'Аральск',
    'Аркалык',
    'Аршалы',
    'Арыс',
    'Астраханка',
    'Атбасар',
    'Атырау',
    'Аулиеколь',
    'Аягоз',
    'Б.Момышулы (Бурное)',
    'Баканас',
    'Балпык Би',
    'Балхаш',
    'Глубокое',
    'Ерейментау',
    'Есик',
    'Есиль',
    'Жалагаш',
    'Жанаарка',
    'Жанаозен',
    'Жанатас',
    'Жаркент',
    'Жезказган',
    'Жетысай',
    'Житикара',
    'Жосалы',
    'Зайсан',
    'Индербор',
    'Казыгурт',
    'Калбатау',
    'Кандыагаш',
    'Караганда',
    'Караганда Абай',
    'Каратау',
    'Каскелен',
    'Кентау',
    'Кокпекты',
    'Кокшетау',
    'Конаев',
    'Кордай',
    'Костанай',
    'Кулан',
    'Кульсары',
    'Курчатов',
    'Курчум',
    'Кызылорда',
    'Ленгер',
    'Лисаковск',
    'Макинск',
    'Мартук',
    'Мерке',
    'Мырзакент',
    'Новоишимское',
    'Осакаровка',
    'Павлодар',
    'Перемётное',
    'Петропавловск',
    'Рудный',
    'Сайрам',
    'Сарань',
    'Сарканд',
    'Сарыагаш',
    'Сарыозек',
    'Сатпаев',
    'Саумалколь',
    'Семей',
    'Степногорск',
    'Тайынша',
    'Талгар',
    'Талдыкорган',
    'Тараз',
    'Текели',
    'Темирлан',
    'Темиртау',
    'Теренозек',
    'Торетам',
    'Турар Рыскулов',
    'Турк. обл. Карабулак',
    'Туркестан',
    'Узынагаш',
    'Улкен-Нарын',
    'Уральск',
    'Урджар',
    'Усть-Каменогорск',
    'Ушарал',
    'Уштобе',
    'Хромтау',
    'Чунджа',
    'Шалкар',
    'Шахтинск',
    'Шаян',
    'Шелек',
    'Шемонаиха',
    'Шетпе',
    'Шиели',
    'Шу',
    'Шубаркудук',
    'Щучинск',
    'Экибастуз',
]

export default function CreateSchoolModal({open, setOpen}: CreateSchoolModalProps) {
    const licenseMonthPlans = [1, 3, 6, 12, 24]
    const [selectedLicensePlan, setSelectedLicensePlan] = useState(licenseMonthPlans[0])
    const [schoolName, setSchoolName] = useState('')
    const [schoolLocation, setSchoolLocation] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()

    const complete = () => {
        setLoading(true)
        if (schoolName === '' || schoolLocation === '') {
            // @ts-ignore
            setMessage(<Message messageText={'Введите все поля!'} messageType={'Warning'}/>)
            setLoading(false)
        } else {
            const expDate = new Date((new Date()).setMonth(new Date().getMonth()+selectedLicensePlan))
            let data = {
                name: schoolName,
                location: schoolLocation,
                license_expiration_date: expDate
            }
            createSchool(data).then(res=>{
                console.log(res)
                setLoading(false)
                // @ts-ignore
                setMessage(<Message messageText={'Проект был создан'} messageType={'Success'}/>)
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
                <div className="title">Добавление школы</div>
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
                        Город или населенный пункт
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
                    <button className="active-button" disabled={loading} onClick={complete}>
                        {loading ? <Spinner color={"white"} size={1}/> : 'Добавить'}
                    </button>
                </div>
            </div>
        </Modal>
    )
}