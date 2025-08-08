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
        <TableHead>
          <TableRow>
            <TableCell>SKU</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell>
                <Typography variant="body2" color="text.secondary">{product.sku}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: '600' }}>{product.name}</Typography>
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
