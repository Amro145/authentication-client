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
    userData: null,
    checkLoading: false,
    signupLoading: false,
    signinLoading: false,
    verifyEmailLoading: false,
    resetPasswordLoading: false,
    forgotPasswordLoading: false,
    logoutLoading: false,
    error: null,
    success: false, // Added for UI notifications
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetSuccess: (state) => {
            state.success = false;
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
                    state.success = false;
                }
            )
            // Combined Rejected Handler
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    const baseType = action.type.split("/")[1];
                    state[`${baseType}Loading`] = false;
                    state.error = action.payload;
                    state.success = false;
                }
            )
            // Combined Fulfilled Handler (Success)
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state, action) => {
                    const baseType = action.type.split("/")[1];
                    state[`${baseType}Loading`] = false;
                    state.success = true;

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

export const { clearError, resetSuccess } = authSlice.actions;
export default authSlice.reducer;