import React from 'react';
import { Container } from '@mui/material';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from './components/app-router/app-router.component';
import CookieCheck from './components/cookie-check/cookie-check.component';
import store from './redux/store';

const App = () => {
    return (
        <CookiesProvider>
            <Provider store={store}>
                <Container disableGutters maxWidth={false}>
                    <CookieCheck />
                    <AppRouter />
                </Container>
                <ToastContainer />
            </Provider>
        </CookiesProvider>
    );
};

export default App;
