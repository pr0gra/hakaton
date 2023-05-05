import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import caseSlice from "./slices/caseSlice";
import teamSlice from "./slices/teamSlice";
import requestSlice from "./slices/requestSlice";
import adminSlice from "./slices/adminSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        cases: caseSlice,
        teams: teamSlice,
        requests: requestSlice,
        admin: adminSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch