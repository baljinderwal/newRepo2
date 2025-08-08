import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, ThemeProvider, Drawer } from '@mui/material';
import { StoreProvider } from './context/StoreContext';
import theme from './theme';
import Header from './components/Header';
import NavDrawer from './components/NavDrawer';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Customers from './pages/Customers';
import Billing from './pages/Billing';

const drawerWidth = 280;

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <Router>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header onMenuClick={handleDrawerToggle} drawerWidth={drawerWidth} />
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
              {/* Mobile Drawer */}
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                <NavDrawer onClose={handleDrawerToggle} />
              </Drawer>
              {/* Desktop Drawer */}
              <Drawer
                variant="permanent"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
              >
                <NavDrawer />
              </Drawer>
            </Box>
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: { xs: 2, sm: 3, md: 4 }, // Increased padding
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                backgroundColor: (theme) => theme.palette.background.default,
                minHeight: '100vh'
              }}
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
    </ThemeProvider>
  );
}

export default App;
