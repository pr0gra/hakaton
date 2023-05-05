import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { backendURL } from '../../configs/config'

export const getTeams = createAsyncThunk(
    'teams/getTeams',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.get(
                `${backendURL}/team/getteams`,
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface CreateTeamProps {
    name: string 
    description: string
    caseid: number 
    linkToChat: string
}

export const createTeam = createAsyncThunk(
    'teams/createTeam',
    async ({name, description, caseid, linkToChat}: CreateTeamProps, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/team/createteam`,
                {
                    token,
                    name,
                    description,
                    caseid,
                    linkToChat,
                },
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface JoinToTeamProps {
    teamid: number
}

export const joinToTeam = createAsyncThunk(
    'teams/jointoteam',
    async ({teamid}: JoinToTeamProps, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/team/jointoteam`,
                {
                    token,
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

export const getMyTeam = createAsyncThunk(
    'teams/getmyteam',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/team/getmyteam`,
                {
                    token,
                },
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const leaveFromTeam = createAsyncThunk(
    'teams/leaveFromTeam',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/team/leaveFromTeam`,
                {
                    token,
                },
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const deleteTeam = createAsyncThunk(
    'teams/deleteTeam',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/team/deleteTeam`,
                {
                    token,
                },
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface ExcludeMemberProp {
    userid: number
}

export const excludeMember = createAsyncThunk(
    'teams/excludeMember',
    async ({userid}: ExcludeMemberProp, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/team/excludeMember`,
                {
                    token,
                    userid
                },
                config
            )

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

interface GetTeamProps {
    teamid: number
}

export const getTeam = createAsyncThunk(
    'teams/getteam',
    async ({teamid}: GetTeamProps, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/team/getTeam`,
                {
                    token,
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