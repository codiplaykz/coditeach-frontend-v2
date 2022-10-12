// @ts-ignore
import logo from '../assets/codiplay_logo.svg';
// @ts-ignore
import avatar from '../assets/images/avatar.svg';
import React, {useState} from 'react';
import Icon from '../helpers/icon';
import {useAuth} from '../hooks/use-auth';
import {useDispatch} from "react-redux";
import {removeUser} from "../store/slices/userSlice";

export default function Sidebar() {
    const adminItems = [
        {
            iconName: 'Schools',
            title: 'Школы',
            link: ''
        },
        {
            iconName: 'Lessons',
            title: 'Уроки',
            link: ''
        },
        {
            iconName: 'Project',
            title: 'Проекты',
            link: ''
        },
        {
            iconName: 'Test',
            title: 'Тесты',
            link: ''
        },
        {
            iconName: 'Student',
            title: 'Ученики',
            link: ''
        },
        {
            iconName: 'News',
            title: 'Предметы',
            link: ''
        },
        {
            iconName: 'Help',
            title: 'Новости',
            link: ''
        },
        {
            iconName: 'Info',
            title: 'Помощь',
            link: ''
        }
    ]
    const [activeItem, setActiveItem] = useState(0)
    const user = useAuth()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(removeUser())
    }

    const renderedSidebarItems = () => {
        // TODO CHECK FOR USER ROLE
        return (
            adminItems.map((item, index)=> {
                return (
                    <div onClick={() => {setActiveItem(index)}} className={`${index === activeItem ? 'sidebar-item-active' : ''} sidebar-item`}>
                        {/*@ts-ignore*/}
                        <Icon color={'#C2C2C2'} size={1} name={item.iconName}/>
                        {item.title}
                    </div>
                )
            })
        )
    }

    return (
        <div className='sidebar-container'>
            <div className='sidebar-header'>
                <img src={logo} alt='logo'/>
                <Icon color={'#C2C2C2'} size={1} name={'Notification'}/>
            </div>
            <div className='sidebar-body'>
                {renderedSidebarItems()}
            </div>
            <div className='sidebar-footer'>
                <div className="sidebar-profile-image">
                    <img src={avatar} alt='avatar'/>
                </div>
                <p className='sidebar-username'>
                    {`${user?.Name} ${user?.Surname}`}
                </p>
                <p className='sidebar-email'>
                    {`${user?.Email}`}
                </p>
                <div className='sidebar-icons'>
                    <Icon color={'#c2c2c2'} name={'Profile'} size={1} />
                    {/*@ts-ignore*/}
                    <Icon color={'#c2c2c2'} onClick={()=>logout()} name={'SignOut'} size={1} />
                </div>
            </div>
        </div>
    )
}