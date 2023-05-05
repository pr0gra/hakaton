import React, { useEffect } from 'react'
import './ShortStatistic.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import { getStatistic } from '../../../redux/actions/adminActions'

function ShortStatistic() {

    const dispatch = useAppDispatch()
    const admin = useAppSelector(state => state.admin)

    useEffect(() => {
        dispatch(getStatistic())
    }, [])

    return (
        <div className="shortStatistic">
            {admin.stat ? (
                <>
                    <p className="shortStatistic__text">Всего пользователей: {admin.stat.statistic.qUsers}</p>
                    <p className="shortStatistic__text">Всего команд: {admin.stat.statistic.qTeams}</p>
                </>
            ) : null}

        </div>
    )
}

export default ShortStatistic