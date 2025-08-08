import React from 'react';
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
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

const NavDrawer = ({ onClose }) => {
  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const activeLinkStyles = {
    backgroundColor: 'action.selected',
    color: 'primary.main',
    '& .MuiListItemIcon-root': {
      color: 'primary.main',
    },
  };

  return (
    <div>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', height: 64 }}>
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
            onClick={handleLinkClick}
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
    </div>
  );
};

export default NavDrawer;
