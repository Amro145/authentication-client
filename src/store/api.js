import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post("/signup", data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post("/signin", data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        const res = await api.post("/logout");
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const checkEmail = createAsyncThunk("auth/checkEmail", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post("/verify-email", data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const forgotPassword = createAsyncThunk("auth/forgotPassword", async (data, { rejectWithValue }) => {
    try {
        const res = await api.post("/forgot-password", data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await api.post(`/reset-password/${id}`, data);
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const res = await api.get("/check-auth");
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || { message: error.message });
    }
});
