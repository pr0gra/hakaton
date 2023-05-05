import React, { useEffect, Suspense } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Elements/Header/Header'
import Footer from './components/Elements/Footer/Footer'

const Home = React.lazy(() => import('./pages/Home.page'))
const Login = React.lazy(() => import('./pages/Login.page')); 
const SignUp = React.lazy(() => import('./pages/SignUp.page')); 
const Profile = React.lazy(() => import('./pages/Profile.page'));
const Admin = React.lazy(() => import('./pages/Admin.page'));
const Privacy = React.lazy(() => import('./pages/Privacy.page'));

import { useAppDispatch, useAppSelector } from './hooks/redux.hooks'

import { refresh } from './redux/actions/authActions'
import Spinner from './components/Elements/Spinner/Spinner'

function App() {

  const dispatch = useAppDispatch();
  const { isAdmin } = useAppSelector(state => state.auth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(refresh())
    }
  }, [])

  const deadline = new Date("2023/05/11 00:18:00 GMT+5").getTime();
  const now = Date.now();

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            {deadline < now ? null : <Route path="/signup" element={<SignUp />} />}
            <Route path="/signin" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />

            {isAdmin ? (
              <Route path="/admin" element={<Admin />} />
            ) : null}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
