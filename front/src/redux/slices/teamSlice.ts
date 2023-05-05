import { createSlice } from '@reduxjs/toolkit';
import { createTeam, deleteTeam, excludeMember, getMyTeam, getTeam, getTeams, joinToTeam, leaveFromTeam } from '../actions/teamActions';

interface IinitialState {
    loading: boolean
    teams: any
    myteam: any
    adminFiled: any,
    error: any
    success: boolean
}

const initialState = {
    loading: false,
    teams: null,
    myteam: null,
    adminFiled: null,
    error: null,
    success: false,
} as IinitialState;

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // getTeams
        builder.addCase(getTeams.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getTeams.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.teams = payload.teams
        })
        builder.addCase(getTeams.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // createTeam
        builder.addCase(createTeam.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(createTeam.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.myteam = payload.team
        })
        builder.addCase(createTeam.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // joinToTeam
        builder.addCase(joinToTeam.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(joinToTeam.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(joinToTeam.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // getMyTeam
        builder.addCase(getMyTeam.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getMyTeam.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.myteam = payload.team
        })
        builder.addCase(getMyTeam.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
        
        // leave from team
        builder.addCase(leaveFromTeam.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(leaveFromTeam.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.myteam = null
        })
        builder.addCase(leaveFromTeam.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // delete team
        builder.addCase(deleteTeam.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(deleteTeam.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.myteam = null
        })
        builder.addCase(deleteTeam.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // exclude member
        builder.addCase(excludeMember.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(excludeMember.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
        })
        builder.addCase(excludeMember.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // get team
        builder.addCase(getTeam.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(getTeam.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.adminFiled = payload
        })
        builder.addCase(getTeam.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default teamSlice.reducer;