import React from 'react'
import './Footer.scss'

import {ReactComponent as VkIcon} from '../../../assets/vk.svg';

function Footer() {
  return (
    <footer className="footer">
        <h1 className="footer__title">Контакты</h1>
        <a className="footer__link" href="https://vk.com/unit.usue" target='blank'>
            <VkIcon className="footer__icon" />
        </a>
        <a className="footer__link" href = "mailto: strijov.a.s@gmail.com">Почта</a>
        <a className="footer__link" href="/Положение.pdf">Положение конкурса</a>
    </footer>
  )
}

export default Footer