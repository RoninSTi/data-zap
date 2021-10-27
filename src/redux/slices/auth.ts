// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../../services/api';

// import type { RootState } from '../store';

// Define a type for the slice state
interface AuthState {
    isLoggedIn: boolean;
}

// Define the initial state using that type
const initialState: AuthState = {
    isLoggedIn: false,
};

interface LoginPayload {
    email: string;
    password: string;
}

interface UserResponseData {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

interface LoginResponseData {
    message: string;
    user: UserResponseData;
}

export const login = createAsyncThunk<
    // Return type of the payload creator
    LoginResponseData,
    // First argument to the payload creator
    LoginPayload
>(
    'auth/login',
    // Declare the type your function argument here:
    async (data) => {
        const response = await api({
            method: 'post',
            url: 'auth/login',
            data,
        });
        // Inferred return type: Promise<MyData>
        return response.data as LoginResponseData;
    },
);

export const authSlice = createSlice({
    name: 'auth',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true;

            console.log({ state });
        });
    },
});

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default authSlice.reducer;
