import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';

const Header = ({ onMenuClick, drawerWidth }) => {
  const [title, setTitle] = useState('Dashboard');
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case '/inventory':
        setTitle('Inventory');
        break;
      case '/customers':
        setTitle('Customers');
        break;
      case '/billing':
        setTitle('Billing');
        break;
      case '/':
      default:
        setTitle('Dashboard');
        break;
    }
  }, [location]);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
