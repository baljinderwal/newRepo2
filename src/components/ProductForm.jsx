import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Fade,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 500 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
  borderRadius: '12px',
  overflow: 'hidden',
};

const ProductForm = ({ open, onClose, onSave, product }) => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: '',
    unitPrice: '',
    qty: '',
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        sku: '',
        name: '',
        category: '',
        unitPrice: '',
        qty: '',
      });
    }
  }, [product, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'unitPrice' || name === 'qty' ? parseFloat(value) || '' : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box sx={style}>
          <Box sx={{ p: 3 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            {product ? 'Edit Product' : 'Add New Product'}
            </Typography>
        </Box>
        <Divider />
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="sku"
                label="SKU (Stock Keeping Unit)"
                value={formData.sku}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Product Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="category"
                label="Category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="unitPrice"
                label="Unit Price"
                type="number"
                value={formData.unitPrice}
                onChange={handleChange}
                fullWidth
                required
                inputProps={{ step: "0.01" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="qty"
                label="Quantity"
                type="number"
                value={formData.qty}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={onClose} variant="outlined">
                Cancel
            </Button>
            <Button type="submit" variant="contained">
                Save Product
            </Button>
          </Box>
        </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProductForm;
