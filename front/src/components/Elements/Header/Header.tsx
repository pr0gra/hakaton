import React, { useState } from 'react'
import './Header.scss'
import { ReactComponent as Logo } from '../../../assets/logo.svg'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/redux.hooks'

function Header() {

  const {
    isAuth,
    userInfo,
    isAdmin
  } = useAppSelector(state => state.auth)

  return (
    <>
      <header className="header">
        <Logo className="haeder__logo" />
        {isAuth ? (
          <>
            {isAdmin ? (
              <Link
                to={`/admin`}
                className="header__btn"
              >
                Админка
              </Link>
            ) : null}
            <Link
              to={`/profile/${userInfo.id}`}
              className="header__btn"
            >
              Профиль
            </Link>
          </>
        ) : (
          <Link
            to="/signin"
            className="header__btn"
          >
            Войти
          </Link>
        )}
      </header>
    </>
  )
}

export default Header