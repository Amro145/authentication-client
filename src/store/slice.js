import { createSlice } from "@reduxjs/toolkit";
import {
    checkAuth,
    verifyEmail,
    forgotPassword,
    login,
    logout,
    resetPassword,
    signup
} from "./api";

const initialState = {
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    checkLoading: false,
    signupLoading: false,
    signinLoading: false,
    verifyEmailLoading: false,
    resetPasswordLoading: false,
    forgotPasswordLoading: false,
    logoutLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Combined Pending Handler
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state, action) => {
                    const baseType = action.type.split("/")[1];
                    state[`${baseType}Loading`] = true;
                    state.error = null;
                }
            )
            // Combined Rejected Handler
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    const baseType = action.type.split("/")[1];
                    state[`${baseType}Loading`] = false;
                    state.error = action.payload;
                }
            )
            // Combined Fulfilled Handler (Success)
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state, action) => {
                    const baseType = action.type.split("/")[1];
                    state[`${baseType}Loading`] = false;

                    if (baseType === 'logout') {
                        state.userData = null;
                        localStorage.removeItem("userData");
                    } else if (action.payload?.data) {
                        state.userData = action.payload.data;
                        localStorage.setItem("userData", JSON.stringify(action.payload.data));
                    }
                }
            );
    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;