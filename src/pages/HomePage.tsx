import Icon from "../helpers/icon";
// @ts-ignore
import defaultAvatar from '../assets/images/avatar.svg';
import {useEffect, useState} from "react";
import {getAllStudents} from "../services/statistics";

interface StudentsResponse {
    students: [
        {
            name: string,
        }
    ]
}

export default function HomePage() {
    const [students, setStudents] = useState<StudentsResponse>()
    const cities = [
        {
            name: "Все города",
        },
        {
            name: "Усть-Каменогорск",
        },
        {
            name: "Алматы",
        },
        {
            name: "Астана",
        },
        {
            name: "Павлодар",
        },
        {
            name: "Костанай",
        },
        {
            name: "Петропавловск",
        }
    ]
    const classes = [
        {
            name: "Все классы",
        },
        {
            name: "10А",
        },
        {
            name: "10А",
        },
        {
            name: "10А",
        },
        {
            name: "10А",
        },
        {
            name: "10А",
        },
        {
            name: "10А",
        }
    ]

    useEffect(() => {
        getAllStudents().then(res => {
            console.log(res)
        })
    }, [students])

    const renderedCitiesItem = () => {
        return (
            cities.map((item, index)=>{
                return (
                    <div className="cities-item" key={`${index}-city`}>
                        {item.name}
                        <p>100</p>
                        <div>
                            <Icon color={"black"} size={1} name={'Back'}/>
                        </div>
                    </div>
                )
            })
        )
    }

    const renderedClassesItem = () => {
        return (
            classes.map((item, index)=>{
                return (
                    <div className="class-item" key={`${index}-class`}>
                        {item.name}
                    </div>
                )
            })
        )
    }

    {/*const renderedStudentsItem = () => {*/}
    {/*    return (*/}
    //         // @ts-ignore
    //         students.map((item, index)=>{
    //             return (
    //                 <div className="student-item" key={`${index}-student`}>
    //                     <div className="student-profile-image">
    //                         <img src={defaultAvatar} alt="profile-image"/>
    //                     </div>
    {/*                    <div className="student-info">*/}
    //                         <p className="student-name">{item?.name}</p>
    //                         <p className="student-class">ученик из {item?.class}</p>
    //                     </div>
    //                     <div className="action-button">
    //                         <Icon color={'#C2C2C2'} size={1} name={'More'}/>
    //                     </div>
    //                 </div>
    //             )
    //         })
    //     )
    // }

    return (
        <div className={'home-page'}>
            <p className="page-title">
                Главная
            </p>
            <div className="home-container">
                <div className="home-leftside">
                    <div className="home-statistics">
                        <div className="home-statistics-item">
                            <div className="statistics-info">
                                <p className="statistics-num">421 333</p>
                                <p className="statistics-text">учеников</p>
                            </div>
                            <div className="statistics-icon">
                                <Icon color={"white"} size={1} name={'Student'}/>
                            </div>
                        </div>
                        <div className="home-statistics-item">
                            <div className="statistics-info">
                                <p className="statistics-num">421 333</p>
                                <p className="statistics-text">учеников</p>
                            </div>
                            <div className="statistics-icon">
                                <Icon color={"white"} size={1} name={'Student'}/>
                            </div>
                        </div>
                        <div className="home-statistics-item">
                            <div className="statistics-info">
                                <p className="statistics-num">421 333</p>
                                <p className="statistics-text">учеников</p>
                            </div>
                            <div className="statistics-icon">
                                <Icon color={"white"} size={1} name={'Student'}/>
                            </div>
                        </div>
                    </div>

                    <div className="home-schools">
                        <p className="schools-title">
                            Школы
                        </p>
                        <div className="schools-cities">
                            {renderedCitiesItem()}
                        </div>
                    </div>
                </div>
                <div className="home-rightside">
                    <div className="students-container">
                        <p className="students-title">
                            Ученики
                        </p>
                        <div className="class-tabs">
                            {renderedClassesItem()}
                        </div>
                        <div className="class-search">
                            <Icon color={"#C2C2C2"} size={1} name={'Search'}/>
                            <input placeholder={"Поиск"}/>
                        </div>
                        <div className="students-list">
                            {/*{renderedStudentsItem()}*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}