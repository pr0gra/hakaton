import React, {useEffect, useState, Dispatch, SetStateAction} from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import { getCases } from '../../../redux/actions/caseAction'

import './ChoseCase.scss'

interface ChoseCaseProps {
    setValue: Dispatch<SetStateAction<number | null>>
}

function ChoseCase({setValue}:ChoseCaseProps) {

    const dispatch = useAppDispatch()
    const cases = useAppSelector(state => state.cases)
    const [choseCase, setChoseCase] = useState<number | null>(null);

    useEffect(() => {
        dispatch(getCases())
    }, [])

    useEffect(() => {
        if (cases.cases) {
            setChoseCase(0)
            setValue(0)
        }
    }, [cases.loading, cases.cases])

    const choseCaseHandler = (index: number) => {
        setChoseCase(index)
        setValue(index)
    }

    if (!cases.cases) {
        return (
            <h1>Кейс не загружены</h1>
        )
    }

    return (
        <>
            {cases.loading ? (
                <h1>Loading</h1>
            ) : (
                <div className="cc">
                    <h1 className="cc__title">Выбрать кейс</h1>
                    <div className="cc__cases">
                        {cases.cases.map((item: any, index: number) => (
                            <React.Fragment key={index}>
                                <div
                                    className={choseCase == index ? "cc__case-title cc__case-title_active" : "cc__case-title"}
                                    onClick={() => choseCaseHandler(index)}>
                                    {item.name}
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="profile__case-descript">
                        <h2 className="profile__desc-title">Описание кейса</h2>
                        <div className="profile__case-text cc__case-text">
                            {choseCase != null ? cases.cases[choseCase].description : (<h1>Loading</h1>)}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChoseCase