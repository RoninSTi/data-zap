import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { useAppSelector } from '../../redux/hooks';
import { selectAuthState } from '../../redux/slices/auth';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component?: any;
    // tslint:disable-next-line:no-any
    children?: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, children, ...rest } = props;

    const { isCookieChecked, isLoggedIn } = useAppSelector(selectAuthState);

    const redirect = isCookieChecked && !isLoggedIn;

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                !redirect ? (
                    Component ? (
                        <Component {...routeProps} />
                    ) : (
                        children
                    )
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: routeProps.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
