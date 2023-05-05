import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'

// styles
import './TeamBar.scss'

// components
import ChoseCase from '../ChoseCase/ChoseCase'
import ChoseTeam from '../ChoseTeam/ChoseTeam'
import CreateTeam from '../CreateTeam/CreateTeam'

function TeamBar() {

    const cases = useAppSelector(state => state.cases)
    const [myCase, setMyCase] = useState<number | null>(null)

    const [pageNum, setPageNum] = useState<number>(0)
    const changePage = () => {
        setPageNum(pageNum + 1)
    }
    const previosPage = () => {
        setPageNum(pageNum - 1)
    }

    return (
        <>
            <div className="tb__content">
                {pageNum == 0 ? (<ChoseCase setValue={setMyCase} />) : null}
                {pageNum == 1 ? (<ChoseTeam previosPage={previosPage} changePage={changePage} caseId={myCase} />) : null}
                {pageNum == 2 ? (<CreateTeam previosPage={previosPage} caseid={myCase} />) : null}
            </div>
            {pageNum >= 1 ? null : (
                <button
                    onClick={changePage}
                    className="profile__btn"
                >
                    Продолжить
                </button>
            )}
        </>
    )
}

export default TeamBar