import { createSlice, AsyncThunk, AnyAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

type PendingAction = ReturnType<GenericAsyncThunk['pending']>;

type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

interface UIState {
    isLoading: Array<string>;
}

const initialState: UIState = {
    isLoading: [],
};

function isPendingAction(action: AnyAction): action is PendingAction {
    return action.type.endsWith('/pending');
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
    return action.type.endsWith('/fulfilled');
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
        builder.addMatcher(isPendingAction, (state, action) => {
            const type = getBaseActionType(action.type);

            state.isLoading = [...state.isLoading, type];
        });

        builder.addMatcher(isFulfilledAction, (state, action) => {
            const type = getBaseActionType(action.type);

            state.isLoading = state.isLoading.filter((elem) => elem !== type);
        });
    },
});

export const selectIsLoading = (state: RootState) => state.ui.isLoading;

export default uiSlice.reducer;
