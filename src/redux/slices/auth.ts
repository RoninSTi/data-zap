// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import api, { ApiError } from '../../services/api';

import type { RootState } from '../store';

interface AuthState {
    isCookieChecked: boolean;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    isCookieChecked: false,
    isLoggedIn: false,
};

interface UserResponse {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

interface ForgotResponse {
    message: string;
}

interface ForgotPayload {
    email: string;
}

export const forgot = createAsyncThunk<ForgotResponse, ForgotPayload, { rejectValue: ApiError }>(
    'auth/forgot',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api({
                method: 'post',
                url: 'auth/forgot',
                data,
            });

            return response.data as ForgotResponse;
        } catch (err: any) {
            return rejectWithValue(err.response.data as ApiError);
        }
    },
);

interface ResetResponse {
    message: string;
}

interface ResetPayload {
    password: string;
    otp: string;
}

export const reset = createAsyncThunk<ResetResponse, ResetPayload, { rejectValue: ApiError }>(
    'auth/reset',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api({
                method: 'post',
                url: 'auth/reset',
                data,
            });

            return response.data as ResetResponse;
        } catch (err: any) {
            return rejectWithValue(err.response.data as ApiError);
        }
    },
);

export const logout = createAsyncThunk('auth/logout', async () => {
    const response = await api({
        method: 'post',
        url: 'auth/logout',
        withCredentials: true,
    });

    return response.data;
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            const { isLoggedIn, isCookieChecked } = action.payload;

            state.isLoggedIn = isLoggedIn;
            state.isCookieChecked = isCookieChecked;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false;
        });

        builder.addCase(forgot.fulfilled, (_, action) => {
            const { message } = action.payload;

            toast.success(message);
        });

        builder.addCase(reset.fulfilled, (_, action) => {
            const { message } = action.payload;

            toast.success(message);
        });
    },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
