import React from 'react';
import { Box } from '@mui/material';

import AppDrawer from '../app-drawer/app-drawer.component';
import { DRAWER_WIDTH } from '../../constants';
import DashboardRouter from '../dashboard-router/dashboard-router.component';

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
                <DashboardRouter />
            </Box>
        </>
    );
};

export default Dashboard;
