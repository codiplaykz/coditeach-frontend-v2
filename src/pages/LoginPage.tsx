import React, {useEffect, useState} from 'react';
// @ts-ignore
import logo from 'assets/codiplay_logo.svg'
import Loader from "../components/Loader";
import {sign_in} from "../services/auth";
import Icon from "../helpers/Icon";
import {useDispatch} from "react-redux";
import {setUser} from 'store/slices/userSlice';
import {useNavigate} from "react-router-dom";
import {useAuth} from '../hooks/use-auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    // @ts-ignore
    const navigate = useNavigate()
    const user = useAuth()

    useEffect(()=>{
        if (user) {
            navigate('/')
        }
    },[navigate, user])

    const onClickLoginButton = () => {
        setLoading(true)
        let data = {
            email,
            password
        }
        sign_in(data).then(res => {
            const userData = res.userData;
            const accessToken = res.tokens.accessToken;
            const refreshToken = res.tokens.refreshToken;

            if (userData && accessToken && refreshToken) {
                dispatch(setUser({ userData,
                                        accessToken,
                                        refreshToken }))
            }
            setLoading(false)
        })
            .catch(error => {
            const errorMessage = error.response?.data?.message
            if (errorMessage === 'User not found' || errorMessage === 'Incorrect password') {
                setError('Введенные данные неверные.')
            } else {
                setError('Произошла ошибка, попробуйте позже.')
            }
            setLoading(false)
        })
    }

    return (
        <div className={'login-page'}>
            <div className='login-container'>
                <div className="login-logo">
                    <img src={logo} alt="logo" width={200}/>
                </div>
                <div className='login-inner-container'>
                    <p className={'login-title'}>Вход в систему</p>
                    <p className={'login-text'}>Добро пожаловать обратно в систему! Введите свои данные пожалуйста.</p>
                    {
                        error && (
                            <p className="login-error">
                                <Icon color={"red"} size={1} name={"Warning"}/>
                                {error}
                            </p>
                        )
                    }
                    <input placeholder={'Почта'} type='email' onChange={event => (setEmail(event.target.value))} required className={'login-input'}/>
                    <input placeholder={'Пароль'} type='password' onChange={event => (setPassword(event.target.value))} required className={'login-input'}/>
                    <p className={'login-forgot-pass-text'}>Забыли пароль?</p>
                    <button className='login-button' disabled={loading} onClick={onClickLoginButton}>
                        {
                            loading ? <Loader size={1} color={"white"}/> : "Войти"
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}