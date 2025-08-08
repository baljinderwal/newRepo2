import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header';
import NavDrawer from './components/NavDrawer';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Billing from './pages/Billing';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <StoreProvider>
      <Router>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <Header onMenuClick={handleDrawerToggle} />
          <NavDrawer open={drawerOpen} onClose={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 250px)` } }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/billing" element={<Billing />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </StoreProvider>
  );
}

export default App;
