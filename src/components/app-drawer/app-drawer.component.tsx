import React from 'react';
import { Divider, Drawer as MuiDrawer, IconButton, List, Toolbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronLeft } from '@mui/icons-material';
import { mainListItems, secondaryListItems } from './list-items';

import { DRAWER_WIDTH } from '../../constants';

interface AppDrawerProps {
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: any) => prop !== 'open' })(
    ({ theme, open }: any) => ({
        '& .MuiDrawer-paper': {
            whiteSpace: 'nowrap',
            width: DRAWER_WIDTH,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const AppDrawer = (props: AppDrawerProps) => {
    const { isDrawerOpen, toggleDrawer } = props;

    return (
        <Drawer variant="permanent" open={isDrawerOpen}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeft />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
        </Drawer>
    );
};

export default AppDrawer;
