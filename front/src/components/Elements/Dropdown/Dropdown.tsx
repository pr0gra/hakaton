import React, { useState } from 'react'
import { ReactComponent as PlusIcon } from './plusicon.svg'
import './Dropdown.scss'

interface IDropdown {
    title: string
    content: string
}

function Dropdown({ title, content }: IDropdown) {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <div className="dropdown">
                <div className="dropdown__header">
                    <div className="dropdown__title-container">
                        <h1 onClick={() => setIsOpen(!isOpen)} className="dropdown__title">{title}</h1>
                    </div>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={isOpen ? "dropdown__btn dropdown__btn_active" : "dropdown__btn"} 
                    >
                        <PlusIcon className="dropdown__btn-icon" />
                    </button>
                </div>
                <div
                    className={isOpen ?
                        "dropdown__content dropdown__content_open" :
                        "dropdown__content dropdown__content_close"}
                >
                    <p className="dropdown__text">{content}</p>
                </div>
            </div>
        </>
    )
}

export default Dropdown