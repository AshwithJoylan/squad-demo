import React, { useCallback, useMemo, useState } from 'react';
import type { FC } from 'react';
import { useSelector } from 'react-redux';
import MUIDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import { dispatch } from '../store';
import { drawerOpenSelector, toggleDrawer } from '../store/features/drawer';
import NavItem from './NavItem';
// import ListItemIcon from '@mui/material/ListItemIcon';

/**
 * DrawerProps
 */
type DrawerProps = {
  children: any;
  window?: Window;
};

const drawerWidth = 300;

const Header = () => {
  const handleDrawerToggle = useCallback(() => {
    dispatch(toggleDrawer());
  }, []);
  return (
    <AppBar
      position='fixed'
      sx={{
        display: { xs: 'black', md: 'none' },
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          Responsive drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const MobileDrawer: FC<{ children: React.ReactNode; window?: Window }> = ({
  children,
  window,
}) => {
  const isOpened = useSelector(drawerOpenSelector);

  const handleDrawerToggle = useCallback(() => {
    dispatch(toggleDrawer());
  }, []);

  return (
    <MUIDrawer
      container={
        window !== undefined ? () => (window as any)().document.body : undefined
      }
      variant='temporary'
      open={isOpened}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
        display: { xs: 'block', md: 'none' },
      }}
    >
      {children}
    </MUIDrawer>
  );
};

/**
 * Drawer
 */
const Drawer: FC<DrawerProps> = ({ children, window }) => {
  const drawer = useMemo(
    () => (
      <List>
        {[{ key: 'home', title: 'Home' }].map((item) => (
          <NavItem key={item.key} item={item} />
        ))}
      </List>
    ),

    []
  );
  console.log('Drawer');
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component='nav'
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label='mailbox folders'
      >
        <Header />
        <MobileDrawer>{drawer}</MobileDrawer>
        <MUIDrawer
          variant='permanent'
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </MUIDrawer>
      </Box>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          paddingTop: { xs: '60px', sm: '80px', md: '20px' },
          width: { xs: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Drawer;
