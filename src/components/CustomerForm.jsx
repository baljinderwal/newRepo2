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

const CustomerForm = ({ open, onClose, onSave, customer }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (customer) {
      setFormData(customer);
    } else {
      setFormData({
        name: '',
        phone: '',
        email: '',
      });
    }
  }, [customer, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
              {customer ? 'Edit Customer' : 'Add New Customer'}
            </Typography>
          </Box>
          <Divider />
          <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
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
                  Save Customer
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default CustomerForm;
