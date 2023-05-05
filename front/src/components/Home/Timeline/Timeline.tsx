import React, { useEffect } from 'react'
import './Timeline.scss'

function Timeline() {

    const today = Date.now();

    const isActive = (deadline: string) => {
        const endtime = new Date(deadline).getTime();
        if (endtime < today) {
            return true
        } 
        return false
    }

    return (
        <div className="container">
            <div className="timeline">
                <h1 className="timeline__title">Таймлайн</h1>
                <ul className="timeline__steps">
                    <li className="timeline__item">
                        <div  className={isActive("2023/03/20 23:59:00 GMT+5") ? "timeline__circle timeline__circle_active timeline__circle_first" : "timeline__circle timeline__circle_first"}>1</div>
                        <h1 className="timeline__step-date">До 11 Мая</h1>
                        <p className="timeline__step-descript">Зарегистрируйся на платформе</p>
                    </li>
                    <li className="timeline__item">
                        <div className={isActive("2023/05/11 23:59:00 GMT+5") ? "timeline__circle timeline__circle_active" : "timeline__circle"}>2</div>
                        <h1 className="timeline__step-date">11 Мая</h1>
                        <p className="timeline__step-descript">Получи приглашение и подтверди участие</p>
                    </li>
                    <li className="timeline__item">
                        <div className={isActive("2023/05/12 00:00:00 GMT+5") ? "timeline__circle timeline__circle_active" : "timeline__circle"}>3</div>
                        <h1 className="timeline__step-date">12 Мая</h1>
                        <p className="timeline__step-descript">Приходи на очное открытие Хакатона</p>
                    </li>
                    <li className="timeline__item">
                        <div className={isActive("2023/05/12 23:59:00 GMT+5") ? "timeline__circle timeline__circle_active" : "timeline__circle"}>4</div>
                        <h1 className="timeline__step-date">13-14 Мая</h1>
                        <p className="timeline__step-descript">Участвуй в Хакатоне!</p>
                    </li>
                    <li className="timeline__item timeline__item_last">
                        <div className={isActive("2023/05/15 00:00:00 GMT+5") ? "timeline__circle timeline__circle_active timeline__circle_last" : "timeline__circle timeline__circle_last"}>5</div>
                        <h1 className="timeline__step-date">15 мая</h1>
                        <p className="timeline__step-descript">Приходи на очную защиту Хакатона!</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Timeline