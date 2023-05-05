import { createSlice } from '@reduxjs/toolkit';
import { getCases } from '../actions/caseAction';

interface IinitialState {
    loading: boolean
    cases: any
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    cases: null,
    error: null,
    success: false,
} as IinitialState;

const caseSlice = createSlice({
    name: 'case',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // register
        builder.addCase(getCases.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getCases.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.cases = payload.cases
        })
        builder.addCase(getCases.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default caseSlice.reducer;