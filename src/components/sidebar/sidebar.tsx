import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '-src/hooks';
import { colors } from '-src/styles/theme';
import { Divider, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ArrowLeft, Bank, List as Menu, SignOut, ClipboardText } from "phosphor-react"


import { CSSObject, styled, Theme } from '@mui/material/styles';

const drawerWidth = 300;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: "80px",
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export function Sidebar() {
    const [open, setOpen] = React.useState(false);

    const { signOut } = useAuth();
    const navigate = useNavigate();

    const items = [
        { icon: <Bank size={30} />, text: "Finanças", onClick: () => navigate('/') },
        { icon: <ClipboardText size={30} />, text: "Categorias", onClick: () => navigate('/categorias') },
        { icon: <SignOut size={30} />, text: "Sair", onClick: signOut }
    ]

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{ justifyContent: !open ? "center" : "flex-end" }}>
                    <IconButton onClick={() => setOpen(!open)}>
                        {!open ? <Menu /> : <ArrowLeft />}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <List>
                    {items.map((item, index) => (
                        <Tooltip placement="left" arrow title={item.text} disableHoverListener={open}>
                            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    onClick={() => {
                                        setOpen(false);
                                        item.onClick()
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>

                                    <ListItemText primary={item.text} sx={{
                                        opacity: open ? 1 : 0, "& .MuiTypography-root": {
                                            fontSize: '1.25rem',
                                            fontWeight: '600',
                                            color: colors.grey100
                                        }
                                    }} style={{ fontSize: '20rem' }} />
                                </ListItemButton>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}