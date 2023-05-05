import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import './Timer.scss'

interface TimerProps {
    props: {
        deadline: string
        isActiveFunc: Dispatch<SetStateAction<boolean>>
        className?: string
    }
}


function Timer({ props }: TimerProps) {

    const [isEnd, setIsEnd] = useState<boolean>(false)
    const [days, setDays] = useState<number>();
    const [hours, setHours] = useState<number>();
    const [minutes, setMinutes] = useState<number>();
    const [seconds, setSeconds] = useState<number>();

    useEffect(() => {

        const countDownDate = new Date(props.deadline).getTime();

        const interval = setInterval(() => {
            let now = new Date().getTime();

            let distance = countDownDate - now;

            setDays(Math.floor(distance / (1000 * 60 * 60 * 24)))
            setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
            setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)))
            setSeconds(Math.floor((distance % (1000 * 60)) / 1000))

            if (distance < 0) {
                clearInterval(interval)
                setIsEnd(true)
                props.isActiveFunc(false)
            }
        }, 1000)
    })

    return (
        <div className="timer">
            {days}:{hours}:{minutes}:{seconds}
        </div>
    )
}

export default Timer