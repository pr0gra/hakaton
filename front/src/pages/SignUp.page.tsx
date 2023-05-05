
// libs
import React, { useEffect, useState } from 'react'
import { useNavigate, Link, redirect, useLocation } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';

// styles
import '../styles/login.page.scss';
import '../styles/signup.scss'
import 'react-toastify/dist/ReactToastify.css';

// icons
import { ReactComponent as ArrawLeft } from '../assets/Modals/Arrow.svg'

// components
import Input from '../components/Ui/Input/Input';

// redux
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { register } from '../redux/actions/authActions';

function SignUp() {
    let navigate = useNavigate();
    const goBack = () => { navigate(-1) };

    const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/

    const linkRegExp = /^((https):\/\/)[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            surname: '',
            patronymic: '',
            phone: '',
            dateOfBorn: '',
            password: '',
            rpassword: '',
            tglink: '',
            agreeWith: false,
        },
        validationSchema: Yup.object({
            name: Yup.string().max(20, 'Имя должно быить меньше 20 символов').required('Поле обязательно'),
            surname: Yup.string().max(20, 'Фамилия должно быить меньше 20 символов').required('Поле обязательно'),
            patronymic: Yup.string().max(20, 'Отчество должно быить меньше 20 символов').required('Поле обязательно'),
            phone: Yup.string().matches(phoneRegExp, 'Телефонный номер не валидный'),
            dateOfBorn: Yup.date().max(new Date(Date.now() - 567648000000), "Вам нет 18 лет"),
            email: Yup.string().email('Не корректный email').required('Поле обязательно'),
            password: Yup.string().min(5, 'Пароль должен быть больше 5 символов').required('Поле обязательно'),
            rpassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли не совпадают').required('Поле обязательно'),
            tglink: Yup.string().matches(linkRegExp, "Введите ссылку"),
            agreeWith: Yup.boolean()
                .oneOf([true], "Для регистрации вы должны дать согласие на обработку персональных данных")
        }),
        onSubmit: value => {

            dispatch(register({
                name: value.name,
                surname: value.surname,
                patronymic: value.patronymic,
                phone: value.phone,
                dateOfBorn: value.dateOfBorn,
                email: value.email,
                password: value.password,
                tglink: value.tglink,
            }))
        }
    })

    const {
        loading,
        userInfo,
        error,
        success
    } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const notify = (error: string) => toast(error);

    useEffect(() => {
        if (success) window.location.href = `/profile/${userInfo.id}`;
        if (error) {
            notify(error)
        }
    }, [success, userInfo, error])

    return (
        <div className="auth signup">
            <header className="auth__header">
                <button
                    onClick={goBack}
                    className="auth__hidden-btn"
                >
                    <ArrawLeft className="auth__arrow" />
                </button>
                <h1 className="auth__title">Регистрация</h1>
            </header>
            <div className="auth__body signup__body">
                <div className="signup__container">
                    <div className="signup__block">
                        <Input
                            name="name"
                            lable='Имя'
                            placeholder='Введите имя'
                            type='text'
                            value={formik.values.name}
                            onBlur={formik.handleBlur}
                            setValue={formik.handleChange}
                        />
                        {formik.errors.name && formik.touched.name ? (<p className='auth__inp-error'>{formik.errors.name}</p>) : null}

                        <Input
                            name="surname"
                            lable='Фамилия'
                            placeholder='Иванов'
                            type='text'
                            value={formik.values.surname}
                            onBlur={formik.handleBlur}
                            setValue={formik.handleChange}
                        />
                        {formik.errors.surname && formik.touched.surname ? (<p className='auth__inp-error'>{formik.errors.surname}</p>) : null}

                        <Input
                            name="patronymic"
                            lable='Отчество'
                            placeholder='Введите отчество'
                            type='text'
                            value={formik.values.patronymic}
                            onBlur={formik.handleBlur}
                            setValue={formik.handleChange}
                        />
                        {formik.errors.patronymic && formik.touched.patronymic ? (<p className='auth__inp-error'>{formik.errors.patronymic}</p>) : null}

                        <Input
                            name="dateOfBorn"
                            lable='Дата рождения'
                            placeholder='dd.mm.yyyy'
                            type='date'
                            value={formik.values.dateOfBorn}
                            onBlur={formik.handleBlur}
                            setValue={formik.handleChange}
                        />
                        {formik.errors.dateOfBorn && formik.touched.dateOfBorn ? (<p className='auth__inp-error'>{formik.errors.dateOfBorn}</p>) : null}

                    </div>

                    <div className="signup__block">
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
                            name="phone"
                            lable='Телефон'
                            placeholder='+7(000)000-00-00'
                            type='phone'
                            value={formik.values.phone}
                            onBlur={formik.handleBlur}
                            setValue={formik.handleChange}
                        />
                        {formik.errors.phone && formik.touched.phone ? (<p className='auth__inp-error'>{formik.errors.phone}</p>) : null}

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

                        <Input
                            name="rpassword"
                            lable='Повторите пароль'
                            placeholder='Повторите пароль'
                            type='password'
                            value={formik.values.rpassword}
                            onBlur={formik.handleBlur}
                            setValue={formik.handleChange}
                        />
                        {formik.errors.rpassword && formik.touched.rpassword ? (<p className='auth__inp-error'>{formik.errors.rpassword}</p>) : null}

                    </div>
                </div>
                <Input
                    name="tglink"
                    lable='Telegram аккаунт'
                    placeholder='https://t.me/....'
                    type='text'
                    value={formik.values.tglink}
                    onBlur={formik.handleBlur}
                    setValue={formik.handleChange}
                />
                {formik.errors.tglink && formik.touched.tglink ? (<p className='auth__inp-error'>{formik.errors.tglink}</p>) : null}

                <div className="signup__checkbox">
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} name="agreeWith" id="agreement" type="checkbox" />
                    <label htmlFor='agreement' className="signup__checkbox-lable">Соглашаюсь с положением и правилами о хакатоне, положением Хакатона, политикой в отношении обработки персональных данных и даю согласие на обработку <a className="signup__link" href="/Politika_konf_UnitHack.pdf">персональных данных</a></label>
                </div>
                {formik.errors.agreeWith && formik.touched.agreeWith ? (<p className='auth__inp-error'>{formik.errors.agreeWith}</p>) : null}

                <button
                    type="button"
                    onClick={e => formik.handleSubmit()}
                    style={{ marginTop: '20px' }}
                    className="auth__btn signup__btn"
                >
                    Зарегестрироваться
                </button>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp   