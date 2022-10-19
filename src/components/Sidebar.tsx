// @ts-ignore
import logo from '../assets/codiplay_logo.svg';
// @ts-ignore
import avatar from '../assets/images/avatar.svg';
import React, {useEffect, useState} from 'react';
import Icon from '../helpers/Icon';
import {useAuth} from '../hooks/use-auth';
import {useDispatch} from "react-redux";
import {removeUser} from "../store/slices/userSlice";
import {useLocation, useNavigate} from "react-router-dom";

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
            link: '/projects'
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
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(removeUser())
    }

    useEffect(()=>{
        if (pathname === '/') {
            setActiveItem(-1)
        } else if (pathname === '/projects') {
            setActiveItem(2)
        }
    },[pathname])

    const redirect = (path: string) => {
        navigate(path)
    }

    const renderedSidebarItems = () => {
        // TODO CHECK FOR USER ROLE
        return (
            adminItems.map((item, index)=> {
                return (
                    <div key={`${index}-link`} onClick={() => {redirect(item.link)}} className={`${index === activeItem ? 'sidebar-item-active' : ''} sidebar-item`}>
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
            <div className='sidebar-header' onClick={()=>{redirect('/')}}>
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