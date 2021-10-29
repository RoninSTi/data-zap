import React, { useState } from 'react';
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectIsLoggedIn } from '../../redux/slices/auth';

const ABar = () => {
    const dispatch = useAppDispatch();

    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const handleOnClickLogin = () => {
        history.push('/login');
    };

    const handleOnClickRegister = () => {
        history.push('/register');
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(logout());
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    DataZap
                </Typography>
                {isLoggedIn ? (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <>
                        <Button color="inherit" onClick={handleOnClickLogin}>
                            Login
                        </Button>
                        <Button color="inherit" onClick={handleOnClickRegister}>
                            Create Account
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default ABar;
