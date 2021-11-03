import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

import { fetchLogs } from '../../queries/log';
import Loader from '../loader/loader.component';
import LogsTable from '../logs-table/logs-table.component';

const Logs = () => {
    const history = useHistory();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { isLoading, data } = useQuery(
        ['logs', page, rowsPerPage],
        () => fetchLogs({ page, pageSize: rowsPerPage }),
        { keepPreviousData: true },
    );

    const handleOnChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    const handleOnClickRow = (
        event: React.MouseEvent<HTMLTableRowElement> | null,
        logId: string,
    ) => {
        history.push(`/dashboard/logs/${logId}`);
    };

    const handleOnPageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    return (
        <Box>
            <Loader isLoading={isLoading}>
                <Box>
                    <Link to="/dashboard/logs/new">New Log</Link>
                </Box>
                {data?.logs.length ? (
                    <LogsTable
                        count={data?.count || 0}
                        onChangeRowsPerPage={handleOnChangeRowsPerPage}
                        onClickRow={handleOnClickRow}
                        onPageChange={handleOnPageChange}
                        page={page}
                        rows={data?.logs || []}
                        rowsPerPage={rowsPerPage}
                    />
                ) : (
                    <Typography>No logs</Typography>
                )}
            </Loader>
        </Box>
    );
};

export default Logs;
