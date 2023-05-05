import React from 'react'
import { motion } from 'framer-motion'
import './Program.scss'

function Program() {

    const animation = (delay: number, move: number = 0) => {
        return {
            initial: { opacity: 0, y: move },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: {
                ease: "easeInOut",
                duration: 0.5,
                delay: 0.1 + delay / 10,
            }
        }
    }

    return (
        <div className="container">
            <div className="program">
                <h1 className="program__title">Программа</h1>
                <ul className="program__list">
                    <motion.li {...animation(3, 30)} className="program__item">
                        <h2 className="program__item-title">12 мая</h2>
                        <div className="program__item-content">
                            <p className="program__item-text">14:45 - 15:00 - сбор гостей и участников Хакатона около входа УрГЭУ</p>
                            <p className="program__item-text">15:00 - открытие площадки Хакатона, выставка стендов компаний-партнёров</p>
                            <p className="program__item-text">15:30 - торжественное открытие Хакатона со сцены ДК УрГЭУ</p>
                            <p className="program__item-text">17:00 - закрытие площадки Хакатона</p>
                            <p className="program__item-text">21:00 - открытие доступа к подробному описанию кейсов   </p>
                        </div>
                    </motion.li>
                    <motion.li {...animation(4, 30)} className="program__item">
                        <h2 className="program__item-title">13-14 мая</h2>
                        <div className="program__item-content">
                            <p className="program__item-text">13 мая, 12:00 - первый чекпоинт</p>
                            <p className="program__item-text">13 мая, 21:00 - второй чекпоинт</p>
                            <p className="program__item-text">14 мая, 12:00 - третий чекпоинт</p>
                            <p className="program__item-text">14 мая, 19:00 - стопкодинг, участники сбрасывают готовые решения</p>
                            <p className="program__item-text">14 мая, 21:00 - окончание работы, участники сбрасывают готовые презентации</p>
                        </div>
                    </motion.li>
                    <motion.li {...animation(5, 30)} className="program__item">
                        <h2 className="program__item-title">15 мая</h2>
                        <div className="program__item-content">
                            <p className="program__item-text">16:45 - 17:00 - сбор гостей и участников Хакатона около входа УрГЭУ</p>
                            <p className="program__item-text">17:00 - 19:00 - защита работ со сцены ДК УрГЭУ</p>
                            <p className="program__item-text">19:45 - объявление победителей Хакатона</p>
                            <p className="program__item-text">20:00 - закрытие Хакатона</p>
                        </div>
                    </motion.li>
                </ul>
            </div>
        </div>
    )
}

export default Program