import React from 'react';

import { Switch } from 'react-router-dom';

import PrivateRoute from '../private-route/private-route.component';

interface ComponentRouterProps {
    routes: any[];
}

const ComponentRouter = ({ routes }: ComponentRouterProps) => {
    return (
        <Switch>
            {routes.map((route: any) => (
                <PrivateRoute key={route.path} exact={route.isExact} path={route.path}>
                    <route.component />
                </PrivateRoute>
            ))}
        </Switch>
    );
};

export default ComponentRouter;
