import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
  { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
  { text: 'Billing', icon: <ReceiptIcon />, path: '/billing' },
];

const NavDrawer = ({ open, onClose }) => {
  const navLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
  };

  const activeLinkStyles = {
    backgroundColor: 'action.selected',
    color: 'primary.main',
    '& .MuiListItemIcon-root': {
      color: 'primary.main',
    },
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Inventory App
        </Typography>
      </Box>
      <Divider />
      <List sx={{ p: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            end={item.path === '/'}
            onClick={onClose}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              '&.active': activeLinkStyles,
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
