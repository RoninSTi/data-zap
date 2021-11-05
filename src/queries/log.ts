import { useMutation, useQueryClient } from 'react-query';
import { History } from 'history';

import api from '../services/api';

export interface Tag {
    id: string;
    name: string;
}

export interface Log {
    id: string;
    isPublic: boolean;
    tags: Tag[];
    title: string;
    updatedAt: string;
    viewedAt: string;
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

const createLog = async (data: CreateLogData) => {
    const response = await api({
        method: 'post',
        url: 'log',
        data,
        withCredentials: true,
    });

    return response.data as CreateLogResponse;
};

export const useCreateLog = (history: History) => {
    const queryClient = useQueryClient();

    return useMutation(createLog, {
        onSuccess: (data) => {
            queryClient.invalidateQueries('logs');
            history.push(`/dashboard/logs/${data.log.id}`);
        },
    });
};

interface ViewLogData {
    logId: string;
}

interface ViewLogResponse {
    message: string;
    log: Log;
}

const viewLog = async (data: ViewLogData) => {
    const response = await api({
        method: 'put',
        url: `log/${data.logId}/view`,
        withCredentials: true,
    });

    return response.data as ViewLogResponse;
};

export const useViewLog = () => {
    const queryClient = useQueryClient();

    return useMutation(viewLog, {
        onSuccess: () => {
            queryClient.invalidateQueries('recent-logs');
        },
    });
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

export const recentlyViewedLogs = async () => {
    const response = await api({
        method: 'get',
        url: 'log/recently-viewed',
        withCredentials: true,
    });

    return response.data as FetchLogsResponse;
};
