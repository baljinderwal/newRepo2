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

const CustomerTable = ({ customers, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead sx={{ backgroundColor: 'primary.main' }}>
          <TableRow>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Phone</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow
              key={customer.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.action.hover,
                },
              }}
            >
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{customer.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{customer.phone}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{customer.email}</Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex' }}>
                  <IconButton size="small" onClick={() => onEdit(customer)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDelete(customer.id)} sx={{ color: 'error.main' }}>
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

export default CustomerTable;
