import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks'
import { getTeams, joinToTeam } from '../../../redux/actions/teamActions';
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'

import './ChoseTeam.scss'

interface ChoseTeamProps {
    caseId: number | null
    changePage: () => void
    previosPage: () => void
}

function ChoseTeam({ previosPage, changePage, caseId }: ChoseTeamProps) {

    const teams = useAppSelector(state => state.teams)
    const dispatch = useAppDispatch();

    const [joinError, setJoinError] = useState<boolean>(false)
    const [sended, setSended] = useState<Array<number>>([])

    useEffect(() => {
        dispatch(getTeams())
    }, [])

    useEffect(() => {
        if (teams.error) return setJoinError(true)
    }, [teams.error])

    const createOwnTeam = () => {
        changePage()
    }

    const connectToTeam = (teamid: number) => {
        setSended([...sended, teamid])
        dispatch(joinToTeam({ teamid }))
    }

    return (
        <div className="ct">
            <header className="ct__header">
                <button
                    className="ct__goback"
                    onClick={() => previosPage()}
                >
                    <Arrow className="ct__icon" />
                </button>
                <h1 className="ct__title">Команда</h1>
            </header>
            <ul className="ct__list">
                {!!teams.teams && teams.teams.length != 0 ? (
                    <>
                        {teams.teams.map((item: any, index: number) => {
                            if (item.caseid == caseId) {
                                return (
                                    <li className="ct__item">
                                        <div className="ct__item-info">
                                            <h3 className="ct__title">{item.name}</h3>
                                            <p className="ct__text">{item.description}</p>
                                        </div>
                                        {sended.includes(item.id) ? (
                                            <p className="ct__text">Запрос отправлен</p>
                                            ) : (
                                            <button
                                                className="ct__send-btn"
                                                onClick={() => connectToTeam(item.id)}
                                            >
                                                Присоедениться
                                            </button>
                                        )}
                                    </li>
                                )
                            }
                        })}
                    </>
                ) : (
                    <h1 className="ct__error">
                        Команды не найдены
                    </h1>
                )}
            </ul>
            <button
                className="profile__btn"
                onClick={createOwnTeam}
            >
                Создать свою команду
            </button>
        </div>
    )
}

export default ChoseTeam