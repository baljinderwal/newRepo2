import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import InventoryTable from '../components/InventoryTable';
import ProductForm from '../components/ProductForm';
import { Button, Typography, Box } from '@mui/material';

const Inventory = () => {
  const { state, dispatch } = useContext(StoreContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setModalOpen(false);
  };

  const handleSaveProduct = (product) => {
    if (editingProduct) {
      dispatch({ type: 'UPDATE_PRODUCT', payload: { ...product, id: editingProduct.id } });
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: product });
    }
    handleCloseModal();
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch({ type: 'DELETE_PRODUCT', payload: { id: productId } });
    }
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Inventory</Typography>
        <Button variant="contained" onClick={() => handleOpenModal()}>
          Add Product
        </Button>
      </Box>
      <InventoryTable
        products={state.products}
        onEdit={handleOpenModal}
        onDelete={handleDeleteProduct}
      />
      <ProductForm
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
};

export default Inventory;
