import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Input from '../components/Ui/Input/Input'

import '../styles/profile.page.scss'
import { useAppDispatch, useAppSelector } from '../hooks/redux.hooks';
import { logout } from '../redux/actions/authActions';

import { refresh } from '../redux/actions/authActions'
import { useParams } from 'react-router-dom';
import { getCases } from '../redux/actions/caseAction';
import ChoseCase from '../components/UserPage/ChoseCase/ChoseCase';
import ChoseTeam from '../components/UserPage/ChoseTeam/ChoseTeam';
import CreateTeam from '../components/UserPage/CreateTeam/CreateTeam';
import UserData from '../components/UserPage/UserData/UserData';
import TeamBar from '../components/UserPage/TeamBar/TeamBar';
import { getMyTeam } from '../redux/actions/teamActions';
import TeamBoard from '../components/UserPage/TeamBoard/TeamBoard';

function Profile() {
    const { id } = useParams();

    const dispatch = useAppDispatch()
    const myaccount = useAppSelector(state => state.auth)
    const team = useAppSelector(state => state.teams)

    const [myAccount, setMyAccount] = useState<boolean>(false);

    useEffect(() => {
        if (myaccount.userInfo) {
            if (id == myaccount.userInfo.id) {
                const { username, email } = myaccount.userInfo;
                setMyAccount(true)
            }
        }
    }, [myaccount.loading, myaccount.userInfo])

    useEffect(() => {
        dispatch(getCases())
        dispatch(getMyTeam())
    }, [])

    const logoutHandler = () => {
        dispatch(logout())
        window.location.href = "/";
    }

    if (!myAccount) {
        return (
            <h1 style={{
                color: 'white'
            }}>
                Чужой аккаунт
            </h1>
        )
    }

    return (
        <div className="profile">
            <header className="profile__header">
                <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center'}}>
                    <Link
                        to="/"
                        className="profile__goback"
                    >
                        Главная
                    </Link>
                    <button
                        onClick={logoutHandler}
                        className="profile__signout"
                    >
                        Выйти
                    </button>
                </div>
                <h1 className="profile__title">Аккаунт</h1>
            </header>

            <div className="profile__body">
                <div className="profile__block">
                    <UserData />
                </div>
                <div className="profile__block profile__block_case">
                    {!team.myteam ? (
                        <TeamBar />
                    ) : (
                        <TeamBoard data={team.myteam} />
                    )}

                </div>
            </div>
        </div>
    )
}

export default Profile