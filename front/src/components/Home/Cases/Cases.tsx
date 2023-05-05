import React from 'react'
import { motion } from 'framer-motion'

import './Cases.scss'

import Safe from '../../../assets/Cases/safe.png'
import Safes from '../../../assets/Cases/safes.png'

import { cases } from './config'

function Cases() {

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
            <div className="cases">
                <h1 className="cases__title">Кейсы</h1>
                <img src={Safes} className="cases__mobile-icon" />
                <ul className="cases__list">
                    {cases.map((item, index) => (
                        <motion.li {...animation(index, 30)} className="cases__item" key={index}>
                            <img className="cases__icon" src={item.img} alt="safe" />
                            <div className="cases__info">
                                <h2 className="cases__name">{item.name}</h2>
                                <p className="cases__descript">{item.text}</p>
                            </div>
                            <div className="cases__info">
                                <h2 className="cases__name">Призы</h2>
                                <p className="cases__descript">{item.first_place}</p>
                                <p className="cases__descript">{item.second_place}</p>
                                <p className="cases__descript">{item.third_place}</p>
                                <p className="cases__descript">{item.default_present && item.default_present}</p>
                            </div>
                        </motion.li>
                    ))}
                </ul>
                <div className="cases__warn">
                    <div className="cases__warn-sign">
                        i
                    </div>

                    <p className="cases__text">Полная Информация о содержании каждого из кейсов появится 12 мая</p>
                </div>
            </div>
        </div>
    )
}

export default Cases