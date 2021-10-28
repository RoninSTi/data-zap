import * as React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useAppSelector } from '../../redux/hooks';
import { selectIsLoggedIn } from '../../redux/slices/auth';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component?: any;
    // tslint:disable-next-line:no-any
    children?: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { component: Component, children, ...rest } = props;

    const [cookies] = useCookies(['access_expiration']);

    const expires = cookies?.access_expiration?.expires;

    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    if (expires && new Date(expires) < new Date())
        return (
            <Redirect
                to={{
                    pathname: '/login',
                    state: { from: rest.location },
                }}
            />
        );

    return (
        <Route
            {...rest}
            render={(routeProps) =>
                isLoggedIn ? (
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
