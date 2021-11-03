import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000,
    // withCredentials: true,
});

export interface ApiError {
    message: string;
}

export default api;
