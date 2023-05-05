import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { backendURL } from '../../configs/config'

export const getStatistic = createAsyncThunk(
    'admin/getStatistic',
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                headers: { 'Content-Type': 'application/json' },
            }

            const token = localStorage.getItem("token")

            const response = await axios.post(
                `${backendURL}/admin/getStatistics`,
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