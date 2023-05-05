import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

import './Preview.scss'

import Timer from '../../Elements/Timer/Timer'
import { useAppSelector } from '../../../hooks/redux.hooks'

function Preview() {

  const { isAuth } = useAppSelector(state => state.auth)

  const [timerIsActive, setTimerIsActive] = useState<boolean>(true)
  const deadline = "2023/05/12 00:00:00 GMT+5"

  const animation = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      delay: 0.5,
    }
  }

  return (
    <motion.div {...animation} className="preview">
      <h1 className="preview__title">ХАКАТОН UNIT.Hack</h1>
      {!isAuth ? (
        <Link
          to="/signin"
          className="preview__btn"
        >
          Зарегистрироваться
        </Link>
      ) : null}
      {timerIsActive ? (
        <div className="preview__timer">
          <p className="preview__text">До начала хакатона</p>
          <Timer props={{
            deadline: deadline,
            isActiveFunc: setTimerIsActive,
          }} />
        </div>
      ) : (
        <p className="preview__text preview__text_gray">Регистрация закончилась</p>
      )}
    </motion.div>
  )
}

export default Preview