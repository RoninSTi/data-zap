import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppBar from '../app-bar/app-bar.component';
import Dashboard from '../dashboard/dashboard.component';
import Forgot from '../forgot/forgot.component';
import Landing from '../landing/landing.component';
import Login from '../login/login.component';
import PrivateRoute from '../private-route/private-route.component';
import Reset from '../reset/reset.component';

const AppRouter = () => {
    return (
        <Router>
            <AppBar />
            <Route exact path="/">
                <Landing />
            </Route>
            <Route exact path="/forgot">
                <Forgot />
            </Route>
            <Route exact path="/login">
                <Login />
            </Route>
            <Route exact path="/reset">
                <Reset />
            </Route>
            <PrivateRoute exact path="/dashboard">
                <Dashboard />
            </PrivateRoute>
        </Router>
    );
};

export default AppRouter;
