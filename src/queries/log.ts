import { useMutation, useQueryClient } from 'react-query';

import api from '../services/api';

export interface Log {
    id: string;
    isPublic: boolean;
    title: string;
    updatedAt: string;
}

interface CreateLogData {
    csvUrl: string;
    isPublic: boolean;
    notes?: string;
    title: string;
}

interface CreateLogResponse {
    message: string;
    log: Log;
}

export const createLog = async (data: CreateLogData) => {
    const response = await api({
        method: 'post',
        url: 'log',
        data,
        withCredentials: true,
    });

    return response.data as CreateLogResponse;
};

interface FetchLogArgs {
    logId: string;
}

export const fetchLog = async ({ logId }: FetchLogArgs) => {
    const response = await api({
        method: 'get',
        url: `log/${logId}`,
        withCredentials: true,
    });

    return response.data as Log;
};

interface FetchLogsArgs {
    page: number;
    pageSize: number;
}

interface FetchLogsResponse {
    message: string;
    logs: Log[];
    count: number;
}

export const fetchLogs = async (params: FetchLogsArgs) => {
    const response = await api({
        method: 'get',
        url: 'log',
        params,
        withCredentials: true,
    });

    return response.data as FetchLogsResponse;
};

export const useCreateLog = () => {
    const queryClient = useQueryClient();

    return useMutation(createLog, {
        onSuccess: () => {
            queryClient.invalidateQueries('logs');
        },
    });
};
