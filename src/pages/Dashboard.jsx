import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Typography, Grid, Paper, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleIcon from '@mui/icons-material/People';
import ReceiptIcon from '@mui/icons-material/Receipt';

const StatCard = ({ title, count, icon, color }) => (
  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', height: '100%' }}>
    <Box sx={{
      p: 1.5,
      borderRadius: '50%',
      backgroundColor: color,
      color: 'white',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      mr: 2
    }}>
      {icon}
    </Box>
    <Box>
      <Typography color="textSecondary">{title}</Typography>
      <Typography variant="h4" component="h2">{count}</Typography>
    </Box>
  </Paper>
);

const Dashboard = () => {
  const { state } = useContext(StoreContext);
  const { products, customers, bills } = state;

  const summaryData = [
    { title: 'Total Products', count: products.length, icon: <InventoryIcon />, color: 'primary.main' },
    { title: 'Total Customers', count: customers.length, icon: <PeopleIcon />, color: 'success.main' },
    { title: 'Total Bills', count: bills.length, icon: <ReceiptIcon />, color: 'error.main' },
  ];

  const monthlyRevenue = bills.reduce((acc, bill) => {
    const month = new Date(bill.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + bill.total;
    return acc;
  }, {});

  const chartData = Object.keys(monthlyRevenue).map(month => ({
    month,
    revenue: monthlyRevenue[month],
  }));

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StatCard title={item.title} count={item.count} icon={item.icon} color={item.color} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Monthly Revenue</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#0052CC" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
