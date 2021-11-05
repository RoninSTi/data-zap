import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsDrawerOpen, toggleDrawer } from '../../redux/slices/ui';

import AppBar from '../app-bar/app-bar.component';
import Dashboard from '../dashboard/dashboard.component';
import PrivateRoute from '../private-route/private-route.component';

import { ROUTES } from '../../routes';

const AppRouter = () => {
    const dispatch = useAppDispatch();

    const isDrawerOpen = useAppSelector(selectIsDrawerOpen);

    const handleToggleDrawer = () => {
        dispatch(toggleDrawer());
    };

    return (
        <Router>
            <AppBar isDrawerOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer} />
            <Box sx={{ display: 'flex', flex: 1 }}>
                {ROUTES.map((route: any) => (
                    <Route key={route.path} exact={route.isExact} path={route.path}>
                        <route.component />
                    </Route>
                ))}
                <PrivateRoute path="/dashboard">
                    <Dashboard isDrawerOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer} />
                </PrivateRoute>
            </Box>
        </Router>
    );
};

export default AppRouter;
