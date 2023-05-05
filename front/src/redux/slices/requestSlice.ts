import { createSlice } from '@reduxjs/toolkit';
import { AttachRequest, getRequests } from '../actions/requestAction';

interface IinitialState {
    loading: boolean
    requests: any
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    requests: null,
    error: null,
    success: false,
} as IinitialState;

const requestSlice = createSlice({
    name: 'request',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getRequests
        builder.addCase(getRequests.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getRequests.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.requests = payload.requests
        })
        builder.addCase(getRequests.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // getRequests
        builder.addCase(AttachRequest.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(AttachRequest.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.requests = payload.requests
        })
        builder.addCase(AttachRequest.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default requestSlice.reducer;