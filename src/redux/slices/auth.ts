// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import api from '../../services/api';

import type { RootState } from '../store';

interface AuthState {
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
};

interface ApiError {
    message: string;
}

interface LoginPayload {
    email: string;
    password: string;
}

interface UserResponse {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

interface LoginResponse {
    message: string;
    user: UserResponse;
}

export const login = createAsyncThunk<LoginResponse, LoginPayload, { rejectValue: ApiError }>(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api({
                method: 'post',
                url: 'auth/login',
                data,
                withCredentials: true,
            });

            return response.data as LoginResponse;
        } catch (err: any) {
            return rejectWithValue(err.response.data as ApiError);
        }
    },
);

interface ForgotResponse {
    message: string;
}

interface ForgotPayload {
    email: string;
}

export const forgot = createAsyncThunk<ForgotResponse, ForgotPayload>(
    'auth/forgot',
    async (data) => {
        const response = await api({
            method: 'post',
            url: 'auth/forgot',
            data,
        });

        return response.data as ForgotResponse;
    },
);

interface ResetResponse {
    message: string;
}

interface ResetPayload {
    password: string;
    otp: string;
}

export const reset = createAsyncThunk<ResetResponse, ResetPayload>('auth/reset', async (data) => {
    const response = await api({
        method: 'post',
        url: 'auth/reset',
        data,
    });

    return response.data as ResetResponse;
});

interface RegisterResponse {
    message: string;
    user: UserResponse;
}

interface RegisterPayload {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    username: string;
}

export const register = createAsyncThunk<RegisterResponse, RegisterPayload>(
    'auth/register',
    async (data) => {
        const response = await api({
            method: 'post',
            url: 'auth/register',
            data,
        });

        return response.data as RegisterResponse;
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
        setIsLoggedIn: (state, action) => {
            const { isLoggedIn } = action.payload;
            state.isLoggedIn = isLoggedIn;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true;
        });

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

        builder.addCase(register.fulfilled, (_, action) => {
            const { message } = action.payload;

            toast.success(message);
        });
    },
});

export const { setIsLoggedIn } = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
