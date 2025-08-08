import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InventoryTable = ({ products, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: 'primary.main' }}>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SKU</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Unit Price</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
            >
              <TableCell>
                <Typography variant="body2">{product.sku}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{product.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{product.category}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">${product.unitPrice.toFixed(2)}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{product.qty}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex' }}>
                  <IconButton size="small" onClick={() => onEdit(product)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(product.id)} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;
