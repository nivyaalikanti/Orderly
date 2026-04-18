import api from "../../utils/api";

import {
    loginRequest, loginSuccess, loginFail, loadUserFail, logoutSuccess, logoutFail, updateRequest, updateSuccess, updateFail, updateReset, clearErrors
} from "../slices/userSlice";

//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await api.post("/users/login", { email, password });
        dispatch(loginSuccess(data.data.user));
    } catch (error) {
        dispatch(loginFail("Login failed. Please check your credentials and try again."));
    }
};

//register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch(loginRequest());
        const { data } = await api.post("/users/signup", userData, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(loginSuccess(data.data.user));
    } catch (error) {
        console.error("Registration Error:", error.response?.data);
        dispatch(loginFail(error.response?.data?.message || "Registration failed. Please try again."));
    }
};

//load user
export const loadUser = () => async (dispatch) => {
    try {
        const { data } = await api.get("/users/me");
        dispatch(loginSuccess(data.user));
    } catch (error) {
        dispatch(loadUserFail("Failed to load user data. Please log in again."));
    }
};

//update Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch(updateRequest()); 
        const { data } = await api.put("/users/me/update", userData, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(updateSuccess(data.success));
    }
    catch (error) { 
        dispatch(updateFail(error.response?.data?.message || "Profile update failed. Please try again."));
    }
};

//logout
export const logout = () => async (dispatch) => {
    try {
        await api.get("/users/logout");  
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFail("Logout failed. Please try again."));
    }
};