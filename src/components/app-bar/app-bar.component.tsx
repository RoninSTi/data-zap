import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const ABar = () => {
    const history = useHistory();

    const handleOnClickLogin = () => {
        history.push('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div">
                    DataZap
                </Typography>
                <Button color="inherit" onClick={handleOnClickLogin}>
                    Login
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default ABar;
