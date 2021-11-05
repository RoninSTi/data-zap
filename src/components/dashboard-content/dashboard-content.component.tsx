import React from 'react';
import { Container, Typography } from '@mui/material';
import RecentLogs from '../recent-logs/recent-logs.component';

const DashboardContent = () => {
    return (
        <Container>
            <Typography>Dashboard</Typography>
            <RecentLogs />
        </Container>
    );
};

export default DashboardContent;
