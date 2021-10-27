import React from 'react';
import { Container } from '@mui/material';
import { Provider } from 'react-redux';

import AppRouter from './components/app-router/app-router.component';
import store from './redux/store';

const App = () => {
    return (
        <Provider store={store}>
            <Container disableGutters maxWidth={false}>
                <AppRouter />
            </Container>
        </Provider>
    );
};

export default App;
