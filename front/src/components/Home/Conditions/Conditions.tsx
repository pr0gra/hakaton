import React from 'react'
import { motion } from 'framer-motion'

import './Conditions.scss'

import { ReactComponent as ExclamationMark } from '../../../assets/exclamationMark.svg'
import Circle1 from '../../../assets/Conditions/Group 1.png';
import Circle2 from '../../../assets/Conditions/Group2.png';
import Circle3 from '../../../assets/Conditions/Group3.png';

function Conditions() {

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
    <div className='container'>
      <div className="conditions">
        <motion.div {...animation(2, 0)} className="conditions__whoami">

          <img src={Circle1} className="conditions__quest conditions__quest_first" />
          <img src={Circle2} className="conditions__quest conditions__quest_second" />
          <img src={Circle3} className="conditions__quest conditions__quest_third" />

          <div className="conditions__block">
            <p className="conditions__text">
              UNIT.Hack - это хакатон, в котором могут принять участие все студенты вузов Екатеринбурга
            </p>
          </div>

        </motion.div>
        <div className="conditions__rules">
          <motion.div {...animation(1, 20)} className="conditions__item">
            <div className="conditions__circle">
              <ExclamationMark className="conditions__circle-icon" />
            </div>
            <p className="conditions__text">Команды от 1 до 5 участников</p>
          </motion.div>

          <motion.div {...animation(2, 20)} className="conditions__item">
            <div className="conditions__circle">
              <ExclamationMark className="conditions__circle-icon" />
            </div>
            <p className="conditions__text">Студенты ВУЗов и СУЗов</p>
          </motion.div>

          <motion.div {...animation(3, 20)} className="conditions__item">
            <div className="conditions__circle">
              <ExclamationMark className="conditions__circle-icon" />
            </div>
            <p className="conditions__text">Возраст от 18 до 35 лет</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Conditions