import React, { useEffect } from 'react'
import './TeamsColumn.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import { getTeam, getTeams } from '../../../redux/actions/teamActions'
import { getCases } from '../../../redux/actions/caseAction'

function TeamsColumn() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTeams())
        dispatch(getCases())
    }, [])

    const teams = useAppSelector(state => state.teams)
    const cases = useAppSelector(state => state.cases)

    const chosseTeamHandler = (teamid: number) => {
        dispatch(getTeam({ teamid }))
    }

    return (
        <div className="tc">
            <div className="tc__teams">
            <ul className="tc__list">
                {teams.teams && cases.cases ? (
                    <>
                        {teams.teams.map((item: any) => (
                            <li className="tc__ateam" onClick={() => chosseTeamHandler(item.id)}>
                                <tr>
                                    <th>id</th>
                                    <th>{item.id}</th>
                                </tr>
                                <tr>
                                    <th>Команда</th>
                                    <th>{item.name}</th>
                                </tr>
                                <tr>
                                    <th>Кейс</th>
                                    <th>{cases.cases[item.caseid].name}</th>
                                </tr>
                            </li>
                        ))}
                    </>
                ) : (<h1>Пока что команд нет</h1>)}
            </ul>
            </div>
            <div className="tc__team">
                {teams.adminFiled ? (
                    <>
                        <h1>Команда: {teams.adminFiled.team.name}</h1>
                        <p>Id: {teams.adminFiled.team.id}</p>
                        <p>Описание: {teams.adminFiled.team.description}</p>
                        <p>Создана: {teams.adminFiled.team.createdAt}</p>

                        <h1>Участники</h1>
                        <thead className="tc__ateam">
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Surname</th>
                                <th>Patronymic</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Telegram</th>
                                <th>CreatedAt</th>
                            </tr>
                        </thead>
                        <tbody className="tc__ateam">
                            {teams.adminFiled.team.members.map((item: any, index: number) => {
                                console.log(item.userObject.id, teams.adminFiled.team.leaderid)
                                if (item.userObject.id == teams.adminFiled.team.leaderid) {
                                    return (
                                        <tr className="leader-row">
                                            <th>{item.userObject.id}</th>
                                            <th>{item.userObject.name}</th>
                                            <th>{item.userObject.surname}</th>
                                            <th>{item.userObject.patronymic}</th>
                                            <th>{item.userObject.email}</th>
                                            <th>{item.userObject.phone}</th>
                                            <th>{item.userObject.tglink}</th>
                                            <th>{item.userObject.createdAt}</th>
                                        </tr>
                                    )
                                }

                                return (
                                    <tr>
                                        <th>{item.userObject.id}</th>
                                        <th>{item.userObject.name}</th>
                                        <th>{item.userObject.surname}</th>
                                        <th>{item.userObject.patronymic}</th>
                                        <th>{item.userObject.email}</th>
                                        <th>{item.userObject.phone}</th>
                                        <th>{item.userObject.createdAt}</th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </>
                ) : (<h1>Выбирите команду для рассмотрения</h1>)}
            </div>
        </div>
    )
}

export default TeamsColumn