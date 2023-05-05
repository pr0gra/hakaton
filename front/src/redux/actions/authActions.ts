import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { backendURL } from '../../configs/config'

interface registerProps {
    name: string,
    surname: string,
    patronymic: string,
    phone: string,
    dateOfBorn: string,
    email: string,
    password: string
    tglink: string
}

// Токен передаём в authorization header
export const register = createAsyncThunk(
    'user/register',
    async (data: registerProps, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }

            const response = await axios.post(
                `${backendURL}/signup`,
                { ...data },
                config
            )

            localStorage.setItem('token', response.data.accessToken);

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface loginProp {
    email: string
    password: string
}

export const login = createAsyncThunk(
    'user/login',
    async ({ email, password }: loginProp, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }

            const response = await axios.post(
                `${backendURL}/signin`,
                { email, password },
                config
            )

            localStorage.setItem('token', response.data.accessToken);

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const refresh = createAsyncThunk(
    'user/refresh',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }

            const response = await axios.get(
                `${backendURL}/refresh`,
                config
            )

            localStorage.setItem('token', response.data.accessToken);

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }

            localStorage.removeItem("token")

            const response = await axios.get(
                `${backendURL}/logout`,
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
) 