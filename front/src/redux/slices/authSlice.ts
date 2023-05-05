import { createSlice } from '@reduxjs/toolkit';
import { register, login, refresh, logout } from '../actions/authActions';

interface IinitialState {
    loading: boolean
    userInfo: any
    error: any
    isAuth: boolean
    isAdmin: boolean
    success: boolean
}

const checkIsAdmin = (arr: Array<string>) => {
    let result = false;
    arr.map(item => {
        if (item == 'ROLE_ADMIN') {
            result = true;
        } 
    })
    return result;
} 

const initialState = {
    loading: false,
    userInfo: null,
    error: null,
    isAuth: false,
    isAdmin: false,
    success: false,
} as IinitialState;

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        // register
        builder.addCase(register.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(register.fulfilled, (state, { payload }) => {
            state.loading = false
            state.success = true
            state.userInfo = payload
            state.isAuth = true
        })
        builder.addCase(register.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // login
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(login.fulfilled, (state, {payload}) => {            
            state.loading = false
            state.success = true
            state.userInfo = payload
            state.isAuth = true
            state.isAdmin = checkIsAdmin(payload.roles)
        })
        builder.addCase(login.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

        // refresh
        builder.addCase(refresh.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(refresh.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            state.userInfo = payload
            state.isAuth = true
            state.isAdmin = checkIsAdmin(payload.roles)
        })
        builder.addCase(refresh.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })

         // logout
         builder.addCase(logout.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(logout.fulfilled, (state, {payload}) => {
            state.loading = false
            state.success = true
            state.userInfo = payload
            state.isAuth = true
            state.isAdmin = false
            localStorage.removeItem('token');
        })
        builder.addCase(logout.rejected, (state, {payload}) => {
            state.loading = false
            state.error = payload;
        })
    }
})

export default authSlice.reducer;