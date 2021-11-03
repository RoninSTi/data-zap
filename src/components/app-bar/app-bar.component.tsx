import React, { useState } from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import { Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout, selectIsLoggedIn } from '../../redux/slices/auth';
import { DRAWER_WIDTH } from '../../constants';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop: any) => prop !== 'open',
})<AppBarProps>(({ theme, open }: any) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin', 'display'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        transition: theme.transitions.create(['width', 'margin', 'display'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface ABarProps {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
}

const ABar = ({ isDrawerOpen, toggleDrawer }: ABarProps) => {
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
        <AppBar open={isDrawerOpen}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...((isDrawerOpen || !isLoggedIn) && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
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
