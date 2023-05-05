import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'

import Input from '../../Ui/Input/Input';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';

import './UserData.scss'

function UserData() {

    const dispatch = useAppDispatch()
    const myaccount = useAppSelector(state => state.auth)

    const formik = useFormik({
        initialValues: {
            name: myaccount.userInfo.name,
            surname: myaccount.userInfo.surname,
            patronymic: myaccount.userInfo.patronymic,
            phone: myaccount.userInfo.phone,
            email: myaccount.userInfo.email
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Не корректный email').required('Поле обязательно'),
            password: Yup.string().min(5, 'Пароль должен быть больше 5 символов').required('Поле обязательно'),
        }),
        onSubmit: values => {
           
        }
    })

    return (
        <div className="userdata">
            <h1 className="userdata__title">Личные данные</h1>
            <div className="userdata__content">
                <Input
                    name="name"
                    lable="Имя *"
                    placeholder="Алекс"
                    type="text"
                    value={formik.values.name}
                    onBlur={formik.handleBlur}
                />

                <Input
                    name="surname"
                    lable="Фамилия *"
                    placeholder="Алексеев"
                    type="text"
                    value={formik.values.surname}
                    onBlur={formik.handleBlur}
                />
                <Input
                    name="patronymic"
                    lable="Отчество *"
                    placeholder="Алекс"
                    type="text"
                    value={formik.values.patronymic}
                    onBlur={formik.handleBlur}
                />
                <Input
                    name="phone"
                    lable="Номер телефона *"
                    placeholder="Алекс"
                    type="phone"
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                />
                <Input
                    name="email"
                    lable="Почта *"
                    placeholder="Алекс"
                    type="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                />
            </div>
        </div>
    )
}

export default UserData