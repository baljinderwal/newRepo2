import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import CustomerTable from '../components/CustomerTable';
import CustomerForm from '../components/CustomerForm';
import { Button, Typography, Box } from '@mui/material';

const Customers = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  const handleOpenModal = (customer = null) => {
    setEditingCustomer(customer);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingCustomer(null);
    setModalOpen(false);
  };

  const handleSaveCustomer = (customer) => {
    if (editingCustomer) {
      dispatch({ type: 'UPDATE_CUSTOMER', payload: { ...customer, id: editingCustomer.id } });
    } else {
      dispatch({ type: 'ADD_CUSTOMER', payload: customer });
    }
    handleCloseModal();
  };

  const handleDeleteCustomer = (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      dispatch({ type: 'DELETE_CUSTOMER', payload: { id: customerId } });
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Customers</Typography>
        <Button variant="contained" onClick={() => handleOpenModal()}>
          Add Customer
        </Button>
      </Box>
      <CustomerTable
        customers={state.customers}
        onEdit={handleOpenModal}
        onDelete={handleDeleteCustomer}
      />
      <CustomerForm
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomer}
        customer={editingCustomer}
      />
    </div>
  );
};

export default Customers;
