import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, checkEmail, forgotPassword, login, logout, resetPassword, signup } from "./api";

const initialState = {
    userData: null,
    checkLoading: false,
    signupLoading: false,
    signinLoading: false,
    checkEmailLoading: false,
    resetPasswordLoading: false,
    forgotPasswordLoading: false,
    logoutLoading: false,
    error: null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            // checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.checkLoading = true;
                state.error = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.checkLoading = false;
                state.userData = action.payload.data;
                localStorage.setItem("userData", JSON.stringify(action.payload.data));
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.checkLoading = false;
                state.error = action.payload;
            })
            // signup
            .addCase(signup.pending, (state) => {
                state.signupLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.signupLoading = false;
                state.userData = action.payload.data;
                localStorage.setItem("userData", JSON.stringify(action.payload.data));
            })
            .addCase(signup.rejected, (state, action) => {
                state.signupLoading = false;
                state.error = action.payload;
            })
            // login
            .addCase(login.pending, (state) => {
                state.signinLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.signinLoading = false;
                state.userData = action.payload.data;
                localStorage.setItem("userData", JSON.stringify(action.payload.data));
            })
            .addCase(login.rejected, (state, action) => {
                state.signinLoading = false;
                state.error = action.payload;
            })
            // logout
            .addCase(logout.pending, (state) => {
                state.logoutLoading = true;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.logoutLoading = false;
                state.userData = null;
                localStorage.removeItem("userData");
            })
            .addCase(logout.rejected, (state, action) => {
                state.logoutLoading = false;
                state.error = action.payload;
            })
            // checkEmail
            .addCase(checkEmail.pending, (state) => {
                state.checkEmailLoading = true;
                state.error = null;
            })
            .addCase(checkEmail.fulfilled, (state, action) => {
                state.checkEmailLoading = false;
                state.userData = action.payload.data;
                localStorage.setItem("userData", JSON.stringify(action.payload.data));
            })
            .addCase(checkEmail.rejected, (state, action) => {
                state.checkEmailLoading = false;
                state.error = action.payload;
            })
            // forgetPassword
            .addCase(forgotPassword.pending, (state) => {
                state.forgotPasswordLoading = true;
                state.error = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.forgotPasswordLoading = false;
                // forgotPassword might not return user data if it just sends an email
                // but let's assume it might return some token info if needed
                state.userData = action.payload.data;
                if (action.payload.data) {
                    localStorage.setItem("userData", JSON.stringify(action.payload.data));
                }
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.forgotPasswordLoading = false;
                state.error = action.payload;
            })
            // reset Password
            .addCase(resetPassword.pending, (state) => {
                state.resetPasswordLoading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.resetPasswordLoading = false;
                state.userData = action.payload.data;
                if (action.payload.data) {
                    localStorage.setItem("userData", JSON.stringify(action.payload.data));
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.resetPasswordLoading = false;
                state.error = action.payload;
            })


    }
})
export default authSlice.reducer