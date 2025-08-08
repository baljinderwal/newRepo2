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
        // Increase quantity if product is already in the bill
        setBillItems(billItems.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        ));
      } else {
        // Add new product to the bill
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
    // Reset form
    setSelectedCustomer(null);
    setBillItems([]);
    setDiscount(0);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={customers}
            getOptionLabel={(option) => option.name}
            onChange={(event, newValue) => setSelectedCustomer(newValue)}
            renderInput={(params) => <TextField {...params} label="Select Customer" />}
            value={selectedCustomer}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Autocomplete
            options={products}
            getOptionLabel={(option) => `${option.name} (${option.sku})`}
            onChange={handleAddProduct}
            renderInput={(params) => <TextField {...params} label="Add Product" />}
            value={null} // Clear input after selection
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Bill Items</Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        inputProps={{ min: 1 }}
                        sx={{ width: '80px' }}
                      />
                    </TableCell>
                    <TableCell>${(item.unitPrice * item.qty).toFixed(2)}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleRemoveItem(item.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Discount"
            type="number"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
          <Typography>Subtotal: ${subtotal.toFixed(2)}</Typography>
          <Typography>Tax (12%): ${tax.toFixed(2)}</Typography>
          <Typography>Discount: -${discount.toFixed(2)}</Typography>
          <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" onClick={handleSave}>Save Bill</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BillForm;
