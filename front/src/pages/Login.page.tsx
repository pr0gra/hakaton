
// libs
import React, {useEffect, useState} from 'react'
import { useNavigate, Link, redirect, useLocation } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

// styles
import '../styles/login.page.scss';
import 'react-toastify/dist/ReactToastify.css';

// icons
import { ReactComponent as ArrawLeft } from '../assets/Modals/Arrow.svg'

// components
import Input from '../components/Ui/Input/Input';

// redux 
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { login } from '../redux/actions/authActions';

function Login() {

    let navigate = useNavigate();
    const goBack = () => { navigate(-1) };
    const notify = (error: string) => toast(error);

    const dispatch = useAppDispatch();
    const {
        loading,
        userInfo, 
        error,
        success,
        isAuth
    } = useAppSelector(state => state.auth);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Не корректный email').required('Поле обязательно'),
            password: Yup.string().min(5, 'Пароль должен быть больше 5 символов').required('Поле обязательно'),
        }),
        onSubmit: values => {
            dispatch(login(values))
        }
    })

    useEffect(() => {
        if (success) window.location.href = `/profile/${userInfo.id}`;
        if (error) {
            notify(error)
        }
    }, [success, userInfo, error])

    return (
        <div className="auth signin">
            <header className="auth__header">
                <button
                    onClick={goBack}
                    className="auth__hidden-btn"
                >
                    <ArrawLeft className="auth__arrow" />
                </button>
                <h1 className="auth__title">ВХОД</h1>
            </header>
            <div className="auth__body">
                <Input
                    name="email"
                    lable='Почта'
                    placeholder='example@examle.com'
                    type='email'
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    setValue={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email ? (<p className='auth__inp-error'>{formik.errors.email}</p>) : null}

                <Input
                    name="password"
                    lable='Пароль'
                    placeholder='Введите пароль'
                    type='password'
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    setValue={formik.handleChange}
                />
                 {formik.errors.password && formik.touched.password ? (<p className='auth__inp-error'>{formik.errors.password}</p>) : null}

                {/* <a className="auth__link">Забли пароль?</a> */}
                <button
                    className="auth__btn"
                    style={{marginTop: '20px'}}
                    onClick={e => formik.handleSubmit()}
                >
                    Войти
                </button>
                <div className="signin__signup-container">
                    <p className="auth__text">Нет аккаунта?</p>
                    <Link
                        to="/signup"
                        className="auth__link"
                    >
                        Зарегистрируйся
                    </Link>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login