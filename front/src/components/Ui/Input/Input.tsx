import React, { Dispatch, SetStateAction } from 'react'

import './Input.scss'

interface InputProps {
    type: string,
    placeholder?: string
    lable?: string
    value: string
    setValue?: any;
    onBlur?: any
    name: string
}

function Input({ placeholder, lable, type, value, setValue, onBlur, name }: InputProps) {
    return (
        <div className="input">
            {lable ? (
                <label className="input__lable">{lable}</label>
            ) : null}
            <input
                name={name}
                className="input__interface"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={setValue}
                onBlur={onBlur}
            />
        </div>
    )
}

export default Input