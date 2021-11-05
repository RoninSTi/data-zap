import React from 'react';
import { useQuery } from 'react-query';
import {
    Chip,
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';

import { recentlyViewedLogs } from '../../queries/log';
import Loader from '../loader/loader.component';

const RecentLogs = () => {
    const history = useHistory();

    const { data, isLoading } = useQuery('recent-logs', recentlyViewedLogs);

    const handleOnClickRow = (
        event: React.MouseEvent<HTMLTableRowElement> | null,
        logId: string,
    ) => {
        history.push(`/dashboard/logs/${logId}`);
    };

    return (
        <Loader isLoading={isLoading}>
            <Typography variant="h6">Recently viewed logs</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        {data?.logs.map((row) => (
                            <TableRow
                                hover
                                key={row.id}
                                onClick={(event) => handleOnClickRow(event, row.id)}
                            >
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell>
                                    <>
                                        {row.tags.map((tag, index) => (
                                            <Chip
                                                key={`${row.id}-tag-${index}`}
                                                label={tag.name}
                                                sx={{
                                                    marginRight: (theme) => theme.spacing(1),
                                                    ':last-child': {
                                                        marginRight: 0,
                                                    },
                                                }}
                                            />
                                        ))}
                                    </>
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.isPublic}
                                </TableCell>
                                <TableCell style={{ width: 160 }} align="right">
                                    {row.viewedAt}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Loader>
    );
};

export default RecentLogs;
