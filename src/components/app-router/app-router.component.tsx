import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectIsDrawerOpen, toggleDrawer } from '../../redux/slices/ui';

import AppBar from '../app-bar/app-bar.component';
import Dashboard from '../dashboard/dashboard.component';
import Forgot from '../forgot/forgot.component';
import Landing from '../landing/landing.component';
import Login from '../login/login.component';
import PrivateRoute from '../private-route/private-route.component';
import Register from '../register/register.component';
import Reset from '../reset/reset.component';

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
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route exact path="/forgot">
                    <Forgot />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/register">
                    <Register />
                </Route>
                <Route exact path="/reset">
                    <Reset />
                </Route>
                <PrivateRoute path="/dashboard">
                    <Dashboard isDrawerOpen={isDrawerOpen} toggleDrawer={handleToggleDrawer} />
                </PrivateRoute>
            </Box>
        </Router>
    );
};

export default AppRouter;
