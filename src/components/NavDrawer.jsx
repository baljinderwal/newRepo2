import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';

const NavDrawer = ({ open, onClose }) => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Inventory', icon: <InventoryIcon />, path: '/inventory' },
    { text: 'Customers', icon: <PeopleIcon />, path: '/customers' },
    { text: 'Billing', icon: <ReceiptIcon />, path: '/billing' },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div style={{ width: 250 }}>
        <List>
          <ListItem>
            <ListItemText primary="Menu" />
          </ListItem>
          <Divider />
          {menuItems.map((item) => (
            <ListItem button component={Link} to={item.path} key={item.text} onClick={onClose}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default NavDrawer;
