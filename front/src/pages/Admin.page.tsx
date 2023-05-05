import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { Navigate } from 'react-router-dom';

import '../styles/admin.scss'
import TeamsColumn from '../components/Admin/TeamsColumn/TeamsColumn';
import { getTeams } from '../redux/actions/teamActions';
import ShortStatistic from '../components/Admin/ShortStatistic/ShortStatistic';

function Admin() {

    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.auth)

    useEffect(() => {
        if (!user.userInfo || !user.isAdmin) {
            window.location.href = "/"
        }
        dispatch(getTeams())
    }, [])

    return (
        <div className="admin">
            <TeamsColumn />
            <ShortStatistic />
        </div>
    )
}

export default Admin