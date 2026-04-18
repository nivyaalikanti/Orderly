import { createSlice } from "@reduxjs/toolkit";

// create intial state
const initialState = {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
    isUpdated: false,
    message: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        //Login/register/load
        loginRequest: (state) => {
            state.loading = true;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action)=>{
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        // Load user fail
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        //logout
        logoutSuccess: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
       //update profile/password
       updateRequest: (state) => {
            state.loading = true;
        },
        updateSuccess: (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        },
        updateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateReset: (state) => {
            state.isUpdated = false;
        },

        //clear errors
        clearErrors: (state) =>{
            state.error = null;
        }

    }
})
export const { loginRequest, loginSuccess, loginFail, loadUserFail, logoutSuccess, logoutFail, updateRequest, updateSuccess, updateFail, updateReset, clearErrors } = userSlice.actions;
export default userSlice.reducer;