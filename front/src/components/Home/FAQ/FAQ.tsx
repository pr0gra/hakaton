import React from 'react'
import './FAQ.scss'
import { fakedata } from './config'

import { ReactComponent as PlusIcon } from '../../../assets/plus.svg'
import Dropdown from '../../Elements/Dropdown/Dropdown'

function FAQ() {
    return (
        <div className="container">
            <div className="faq">
                <h1 className="faq__title">faq</h1>
                <div className="faq__content">
                    {fakedata.map((item, index) => (
                        <React.Fragment key={index}>
                            <Dropdown title={item.title} content={item.content} />
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FAQ