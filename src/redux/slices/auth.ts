import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../services/api';

import type { RootState } from '../store';

interface AuthState {
    isCookieChecked: boolean;
    isLoggedIn: boolean;
}

const initialState: AuthState = {
    isCookieChecked: false,
    isLoggedIn: false,
};

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
    },
});

export const { setAuthState } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
