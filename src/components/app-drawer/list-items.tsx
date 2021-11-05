import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HelpIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerIcon from '@mui/icons-material/PowerSettingsNew';

import { useHistory, useLocation } from 'react-router-dom';

import { useAppDispatch } from '../../redux/hooks';
import { useLogout } from '../../queries/auth';
import { SIDENAV_ROUTES } from '../../routes';

export const MainListItems = () => {
    const history = useHistory();

    const { pathname } = useLocation();

    const handleOnClick = (event: React.MouseEvent<HTMLDivElement>, path: string) => {
        history.push(path);
    };

    return (
        <div>
            {SIDENAV_ROUTES.map((listItem: any) => (
                <ListItemButton
                    key={listItem.path}
                    onClick={(event) => handleOnClick(event, listItem.path)}
                    selected={pathname === listItem.path}
                >
                    <ListItemIcon>
                        <listItem.icon />
                    </ListItemIcon>
                    <ListItemText primary={listItem.name} />
                </ListItemButton>
            ))}
        </div>
    );
};

export const SecondaryListItems = () => {
    const dispatch = useAppDispatch();

    const logout = useLogout(dispatch);

    const handleOnClickLogout = () => {
        logout.mutate();
    };

    return (
        <div>
            <ListItemButton>
                <ListItemIcon>
                    <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Help" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton onClick={handleOnClickLogout}>
                <ListItemIcon>
                    <PowerIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </div>
    );
};
