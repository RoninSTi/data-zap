import { useMutation } from 'react-query';
import { History } from 'history';

import type { AppDispatch } from '../redux/store';
import api, { ApiError } from '../services/api';
import { setAuthState } from '../redux/slices/auth';
import { toast } from 'react-toastify';

interface LoginArgs {
    email: string;
    password: string;
}

interface User {
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
    user: User;
}

const login = async (data: LoginArgs) => {
    try {
        const response = await api({
            method: 'post',
            url: 'auth/login',
            data,
            withCredentials: true,
        });

        return response.data as LoginResponse;
    } catch (err: any) {
        throw err.response.data as ApiError;
    }
};

export const useLogin = (dispatch: AppDispatch) => {
    return useMutation(login, {
        onError: (err: any) => {
            toast.error(err.message);
        },
        onSuccess: () => {
            dispatch(
                setAuthState({
                    isLoggedIn: true,
                    isCookieChecked: false,
                }),
            );
        },
    });
};

interface RegisterResponse {
    message: string;
    user: User;
}

interface RegisterArgs {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string;
    username: string;
}

const register = async (data: RegisterArgs) => {
    try {
        const response = await api({
            method: 'post',
            url: 'auth/register',
            data,
            withCredentials: true,
        });

        return response.data as RegisterResponse;
    } catch (err: any) {
        throw err.response.data as ApiError;
    }
};

export const useRegister = (history: History) => {
    return useMutation(register, {
        onError: (err: any) => {
            toast.error(err.message);
        },
        onSuccess: (data) => {
            toast.success(data.message);

            history.push('/login');
        },
    });
};
