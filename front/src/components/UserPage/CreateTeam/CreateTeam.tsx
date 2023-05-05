import React, { useEffect, useState } from 'react'
import Input from '../../Ui/Input/Input'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { createTeam } from '../../../redux/actions/teamActions';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './CreateTeam.scss'

interface CreateTeamProps {
  caseid: number | null
  previosPage: () => void
}

function CreateTeam({ previosPage, caseid }: CreateTeamProps) {

  const dispatch = useAppDispatch()

  const re = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm
  const team = useAppSelector(state => state.teams)
  const notify = (error: string) => toast(error);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      linkToChat: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().max(20, 'Название команды не может привышать 20 символов').required('Не заполнено'),
      description: Yup.string().min(20, 'Описание должно включать как минимум 20 символов').required('Не заполнено'),
      linkToChat: Yup.string().matches(re, 'URL is not valid')
    }),
    onSubmit: value => {
      if (caseid == null) caseid = 0;

      dispatch(createTeam({
        name: value.name,
        description: value.description,
        linkToChat: value.linkToChat,
        caseid,
      }))

      window.location.reload();
    }
  })

  return (
    <div className="ct">
      <header className="ct__header">
        <button
          className="ct__goback"
          onClick={() => previosPage()}
        >
          <Arrow className="ct__icon" />
        </button>
        <h1 className="ct__title">Создать команду</h1>
      </header>

      <div className="ct__content">
        <Input
          name="name"
          type="text"
          placeholder='Введите название команды'
          lable='Название команды'
          value={formik.values.name}
          onBlur={formik.handleBlur}
          setValue={formik.handleChange}
        />
        {formik.errors.name && formik.touched.name ? (<p className='auth__inp-error'>{formik.errors.name}</p>) : null}


        <Input
          name="description"
          type="text"
          placeholder='Напишите описание'
          lable='Описание'
          value={formik.values.description}
          onBlur={formik.handleBlur}
          setValue={formik.handleChange}
        />
        {formik.errors.description && formik.touched.description ? (<p className='auth__inp-error'>{formik.errors.description}</p>) : null}


        <Input
          name="linkToChat"
          type="text"
          placeholder='Введите ссылка на чат'
          lable='Ссылка на чат'
          value={formik.values.linkToChat}
          onBlur={formik.handleBlur}
          setValue={formik.handleChange}
        />
        {formik.errors.linkToChat && formik.touched.linkToChat ? (<p className='auth__inp-error'>{formik.errors.linkToChat}</p>) : null}


      </div>
      <button
        type="button"
        className="profile__btn"
        onClick={() => formik.handleSubmit()}
      >
        Создать команду
      </button>
    </div>
  )
}

export default CreateTeam