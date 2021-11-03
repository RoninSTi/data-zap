import React from 'react';
import { Switch } from 'react-router-dom';
import { Box } from '@mui/material';

import AppDrawer from '../app-drawer/app-drawer.component';
import Logs from '../logs/logs.component';
import PrivateRoute from '../private-route/private-route.component';
import DashboardContent from '../dashboard-content/dashboard-content.component';
import LogCreate from '../log-create/log-create.component';
import LogDetail from '../log-detail/log-detail.component';
import { DRAWER_WIDTH } from '../../constants';

interface DashboardProps {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
}

const Dashboard = ({ isDrawerOpen, toggleDrawer }: DashboardProps) => {
    return (
        <>
            <AppDrawer toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    height: '100%',
                    overflow: 'auto',
                    position: 'fixed',
                    left: DRAWER_WIDTH,
                    top: '64px',
                    transition: (theme) =>
                        theme.transitions.create(['left', 'width'], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                    width: () => `calc(100vw - ${DRAWER_WIDTH}px)`,

                    ...(!isDrawerOpen && {
                        transition: (theme) =>
                            theme.transitions.create(['left', 'width'], {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.leavingScreen,
                            }),
                        left: (theme) => theme.spacing(9),
                        width: 'calc(100vw - 72px)',
                    }),
                }}
            >
                <Switch>
                    <PrivateRoute exact path="/dashboard">
                        <DashboardContent />
                    </PrivateRoute>
                    <PrivateRoute exact path="/dashboard/logs/new">
                        <LogCreate />
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard/logs/:logId">
                        <LogDetail />
                    </PrivateRoute>
                    <PrivateRoute path="/dashboard/logs">
                        <Logs />
                    </PrivateRoute>
                </Switch>
            </Box>
        </>
    );
};

export default Dashboard;
