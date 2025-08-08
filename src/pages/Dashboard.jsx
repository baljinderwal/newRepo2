import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Typography, Grid, Paper, Box, Fade } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Defs, linearGradient, Stop } from 'recharts';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';

const StatCard = ({ title, count, icon, color }) => (
  <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', height: '100%' }}>
    <Box sx={{
      color: color,
      display: 'inline-flex',
      mr: 2
    }}>
      {React.cloneElement(icon, { sx: { fontSize: '2.5rem' } })}
    </Box>
    <Box>
      <Typography variant="h6" color="text.secondary">{title}</Typography>
      <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold' }}>{count}</Typography>
    </Box>
  </Paper>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1.5,
        backgroundColor: (theme) => theme.palette.text.primary,
        color: (theme) => theme.palette.background.paper,
        borderRadius: 1,
      }}>
        <Typography sx={{ fontWeight: 'bold' }}>{label}</Typography>
        <Typography>{`Revenue : $${payload[0].value.toFixed(2)}`}</Typography>
      </Paper>
    );
  }
  return null;
};


const Dashboard = () => {
  const { state } = useContext(StoreContext);
  const { products, customers, bills } = state;

  const summaryData = [
    { title: 'Total Products', count: products.length, icon: <InventoryIcon />, color: 'primary.main' },
    { title: 'Total Customers', count: customers.length, icon: <PeopleIcon />, color: 'secondary.main' },
    { title: 'Total Bills', count: bills.length, icon: <ReceiptIcon />, color: 'error.main' },
  ];

  const monthlyRevenue = bills.reduce((acc, bill) => {
    const month = new Date(bill.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + bill.total;
    return acc;
  }, {});

  const chartData = Object.keys(monthlyRevenue).map(month => ({
    month,
    revenue: monthlyRevenue[month],
  })).sort((a, b) => new Date(a.month) - new Date(b.month));

  return (
    <Fade in={true}>
      <div>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Dashboard
        </Typography>
        <Grid container spacing={4}>
          {summaryData.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StatCard title={item.title} count={item.count} icon={item.icon} color={item.color} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Paper sx={{ p: {xs: 2, sm: 3}, height: 400 }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Monthly Revenue</Typography>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5A67D8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#5A67D8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(90, 103, 216, 0.1)'}} />
                  <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
};

export default Dashboard;
