import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRouter from './components/app-router/app-router.component';
import CookieCheck from './components/cookie-check/cookie-check.component';
import store from './redux/store';

const theme = createTheme();

const App = () => {
    return (
        <CookiesProvider>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Container disableGutters maxWidth={false}>
                        <CssBaseline />
                        <CookieCheck />
                        <AppRouter />
                    </Container>
                    <ToastContainer />
                </ThemeProvider>
            </Provider>
        </CookiesProvider>
    );
};

export default App;
