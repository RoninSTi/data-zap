import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppBar from '../app-bar/app-bar.component';
import Landing from '../landing/landing.component';
import Login from '../login/login.component';

const AppRouter = () => {
    return (
        <>
            <Router>
                <AppBar />
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Router>
        </>
    );
};

export default AppRouter;
