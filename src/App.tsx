import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { CookiesProvider } from 'react-cookie';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@uppy/core/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';

import AppRouter from './components/app-router/app-router.component';
import CookieCheck from './components/cookie-check/cookie-check.component';
import store from './redux/store';

const theme = createTheme();

const queryClient = new QueryClient();

const App = () => {
    return (
        <CookiesProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <ThemeProvider theme={theme}>
                        <Container
                            disableGutters
                            maxWidth={false}
                            sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
                        >
                            <CssBaseline />
                            <CookieCheck />
                            <AppRouter />
                        </Container>
                        <ToastContainer />
                    </ThemeProvider>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </Provider>
        </CookiesProvider>
    );
};

export default App;
