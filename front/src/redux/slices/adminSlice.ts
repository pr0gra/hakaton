import { createSlice } from '@reduxjs/toolkit';
import { getStatistic } from '../actions/adminActions';

interface IinitialState {
    loading: boolean
    stat: any
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    stat: null,
    error: null,
    success: false,
} as IinitialState;

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // get stat
        builder.addCase(getStatistic.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getStatistic.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.stat = payload
        })
        builder.addCase(getStatistic.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default adminSlice.reducer;