import React, { useEffect } from 'react'
import './TeamBoard.scss'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import UserCard from '../../Elements/UserCard/UserCard'
import { AttachRequest, getRequests } from '../../../redux/actions/requestAction'
import { deleteTeam, excludeMember, getMyTeam, leaveFromTeam } from '../../../redux/actions/teamActions'

interface TeamBoardProps {
    data: {
        id: number
        name: string
        description: string
        caseid: number
        linkToChat: string
        maxMembers: number
        leaderid: number
        updatedAt: string
        createdAt: string
        members: any
    }
}

function TeamBoard({ data }: TeamBoardProps) {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getRequests())
    }, [])

    const cases = useAppSelector(state => state.cases)
    const user = useAppSelector(state => state.auth)
    const requests = useAppSelector(state => state.requests)

    const acceptUser = ({ userid, teamid }: any) => {
        dispatch(AttachRequest({
            userid,
            teamid
        }))
        window.location.reload();
    }

    const leaveFromTeamHandler = () => {
        dispatch(leaveFromTeam())
    }

    const deleteTeamHandler = () => {
        dispatch(deleteTeam())
    }

    const excludeMemberHanlder = (userid: number) => {
        dispatch(excludeMember({ userid }))
        window.location.reload();
    }

    if (!cases.cases && !data) {
        return (<h1>Loading</h1>)
    }

    return (
        <div className="tb">
            {cases.cases && data.members ? (
                <table className="tb__table">
                    <tbody>
                        <tr>
                            <th>Ваша команда</th>
                            <th>{data.name}</th>
                        </tr>
                        <tr>
                            <th>Ваш кейс</th>
                            <th>{cases.cases[data.caseid].name}</th>
                        </tr>
                        <tr>
                            <th>Описание</th>
                            <th>{data.description}</th>
                        </tr>
                        <tr>
                            <th>Заполненость</th>
                            <th>{data.members.length + '/' + data.maxMembers}</th>
                        </tr>
                    </tbody>
                </table>
            ) : (<h1>Loading</h1>)}

            <h2 className="tb__text">Члены команд:</h2>
            <div className="tb__table-container">
                <table className="tb__table tb__table_withheader">
                    <tbody>
                        <tr>
                            <th>Участник</th>
                            <th>Номер телефона</th>
                            <th>Telegram</th>
                        </tr>
                        {data.members ? (
                            <>
                                {data.members.map((item: any, index: any) => (
                                    <tr key={index}>
                                        <th>{item.userObject.name + " " + item.userObject.surname}</th>
                                        <th>{item.userObject.phone}</th>
                                        <th>{item.userObject.tglink}</th>
                                        {data.leaderid == user.userInfo.id && item.userObject.id != data.leaderid ? (
                                            <th>
                                                <button
                                                    onClick={() => excludeMemberHanlder(item.userId)}
                                                >
                                                    Исключить
                                                </button>
                                            </th>
                                        ) : null}
                                    </tr>
                                ))}
                            </>

                        ) : null}
                    </tbody>
                </table>
            </div>

            {requests.requests && data.leaderid == user.userInfo.id && requests.requests.length != 0 ? (
                <>
                    <h1 className="tb__text">Запросы</h1>
                    <ul className="tb__list">
                        {requests.requests.map((item: any, index: number) => (
                            <React.Fragment>
                                <li className="tb__item">
                                    {item.userObject.name + " " + item.userObject.surname}
                                    <button
                                        onClick={() => acceptUser({
                                            userid: item.userObject.id,
                                            teamid: item.teamid
                                        })}
                                        className="tb__item-btn"
                                    >
                                        Принять
                                    </button>
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </>
            ) : null}

            <a
                className="tb__link"
                href={data.linkToChat}
                target="_blank"
            >
                Коммандный чат
            </a>

            {data.leaderid == user.userInfo.id ? (
                <button
                    className="tb__red-btn"
                    onClick={deleteTeamHandler}>
                    Удалить команду
                </button>
            ) : (
                <button
                    className="tb__red-btn"
                    onClick={leaveFromTeamHandler}>
                    Выйти из команды
                </button>
            )}

        </div>
    )
}

export default TeamBoard