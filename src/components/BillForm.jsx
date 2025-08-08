import React, { useState, useContext } from 'react';
import {
  Autocomplete,
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { StoreContext } from '../context/StoreContext';

const BillForm = ({ onSaveBill }) => {
  const { state } = useContext(StoreContext);
  const { customers, products } = state;

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [billItems, setBillItems] = useState([]);
  const [discount, setDiscount] = useState(0);

  const handleAddProduct = (event, product) => {
    if (product) {
      const existingItem = billItems.find(item => item.id === product.id);
      if (existingItem) {
        setBillItems(billItems.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        ));
      } else {
        setBillItems([...billItems, { ...product, qty: 1 }]);
      }
    }
  };

  const handleQuantityChange = (productId, qty) => {
    const quantity = parseInt(qty, 10);
    setBillItems(billItems.map(item =>
      item.id === productId ? { ...item, qty: quantity > 0 ? quantity : 1 } : item
    ));
  };

  const handleRemoveItem = (productId) => {
    setBillItems(billItems.filter(item => item.id !== productId));
  };

  const subtotal = billItems.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
  const tax = subtotal * 0.12;
  const total = subtotal + tax - discount;

  const handleSave = () => {
    if (!selectedCustomer || billItems.length === 0) {
      alert('Please select a customer and add products to the bill.');
      return;
    }
    const bill = {
      customer: selectedCustomer,
      items: billItems,
      subtotal,
      tax,
      discount,
      total,
      date: new Date().toISOString(),
    };
    onSaveBill(bill);
    setSelectedCustomer(null);
    setBillItems([]);
    setDiscount(0);
  };

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>Create Bill</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={customers}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setSelectedCustomer(newValue)}
            renderInput={(params) => <TextField {...params} label="Select Customer" required />}
            value={selectedCustomer}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={products}
            getOptionLabel={(option) => `${option.name} (${option.sku})`}
            onChange={handleAddProduct}
            renderInput={(params) => <TextField {...params} label="Search & Add Product" />}
            value={null}
          />
        </Grid>

        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell sx={{ width: '100px' }}>Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billItems.map(item => (
                  <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ fontWeight: '600' }}>{item.name}</TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        inputProps={{ min: 1 }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">${(item.unitPrice * item.qty).toFixed(2)}</TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleRemoveItem(item.id)} sx={{ color: 'error.main' }}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                 {billItems.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} align="center">
                            <Typography color="text.secondary" sx={{ py: 4 }}>
                                Products added to the bill will appear here.
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12}>
            <Divider />
        </Grid>

        <Grid item xs={12} md={6}></Grid>
        <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Subtotal:</Typography>
                <Typography sx={{ fontWeight: '600' }}>${subtotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography color="text.secondary">Tax (12%):</Typography>
                <Typography sx={{ fontWeight: '600' }}>${tax.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography color="text.secondary">Discount:</Typography>
                <TextField
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    size="small"
                    sx={{ width: '100px' }}
                />
            </Box>
            <Divider sx={{ my: 1 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>${total.toFixed(2)}</Typography>
            </Box>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" size="large" onClick={handleSave}>Save & Generate Bill</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BillForm;
