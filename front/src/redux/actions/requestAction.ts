import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { backendURL } from '../../configs/config'

export const getRequests = createAsyncThunk(
    'requests/getRequests',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/team/getmyrequests`,
                {
                    token: token
                },
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface AttachRequestProps {
    userid: number
    teamid: number
}

export const AttachRequest = createAsyncThunk(
    'requests/attachRequest',
    async ({userid, teamid}: AttachRequestProps, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/team/attachusertoteam`,
                {
                    token: token,
                    userid,
                    teamid
                },
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)