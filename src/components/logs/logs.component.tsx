import React, { useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useHistory } from 'react-router-dom';
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

    const handleOnClickNew = () => {
        history.push('/dashboard/logs/create');
    };

    const handleOnPageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    return (
        <Container>
            <Loader isLoading={isLoading}>
                <Box
                    paddingY={2}
                    sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'flex-end',
                    }}
                >
                    <Button onClick={handleOnClickNew} startIcon={<AddIcon />} variant="contained">
                        New Log
                    </Button>
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
        </Container>
    );
};

export default Logs;
