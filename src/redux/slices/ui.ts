import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import type { RootState } from '../store';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;

type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

interface UIState {
    isLoading: Array<string>;
}

const initialState: UIState = {
    isLoading: [],
};

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
    return action.type.endsWith('/fulfilled');
}

function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending');
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
    return action.type.endsWith('/rejected');
}

const getBaseActionType = (type: string) => {
    const actionComponents = type.split('/');

    return `${actionComponents[0]}/${actionComponents[1]}`;
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(isFulfilledAction, (state, action) => {
            const type = getBaseActionType(action.type);

            state.isLoading = state.isLoading.filter((elem) => elem !== type);
        });

        builder.addMatcher(isPendingAction, (state, action) => {
            const type = getBaseActionType(action.type);

            state.isLoading = [...state.isLoading, type];
        });

        builder.addMatcher(isRejectedAction, (state, action: AnyAction) => {
            const type = getBaseActionType(action.type);

            state.isLoading = state.isLoading.filter((elem) => elem !== type);

            toast.error(action.payload.message);
        });
    },
});

export const selectIsLoading = (state: RootState) => state.ui.isLoading;

export default uiSlice.reducer;
