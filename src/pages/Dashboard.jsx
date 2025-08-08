import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { Typography, Grid, Paper, Box } from '@mui/material';

const Dashboard = () => {
  const { state } = useContext(StoreContext);
  const { products, customers, bills } = state;

  const summaryData = [
    { title: 'Total Products', count: products.length, color: 'primary.main' },
    { title: 'Total Customers', count: customers.length, color: 'success.main' },
    { title: 'Total Bills', count: bills.length, color: 'error.main' },
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {summaryData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: 140,
                color: 'white',
                backgroundColor: item.color,
              }}
            >
              <Typography variant="h5">{item.title}</Typography>
              <Typography variant="h3">{item.count}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
