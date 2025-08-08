import React, { useRef } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material';
import { useReactToPrint } from 'react-to-print';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ReceiptContent = React.forwardRef(({ bill }, ref) => {
  if (!bill) return null;

  return (
    <Box ref={ref} sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Receipt</Typography>
      <Typography variant="h6">Bill ID: {bill.id}</Typography>
      <Typography>Date: {new Date(bill.date).toLocaleString()}</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="h6">Customer:</Typography>
      <Typography>{bill.customer.name}</Typography>
      <Typography>{bill.customer.email}</Typography>
      <Typography>{bill.customer.phone}</Typography>
      <Divider sx={{ my: 2 }} />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bill.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">${item.unitPrice.toFixed(2)}</TableCell>
                <TableCell align="right">{item.qty}</TableCell>
                <TableCell align="right">${(item.unitPrice * item.qty).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Typography>Subtotal: ${bill.subtotal.toFixed(2)}</Typography>
        <Typography>Tax (12%): ${bill.tax.toFixed(2)}</Typography>
        <Typography>Discount: -${bill.discount.toFixed(2)}</Typography>
        <Typography variant="h6">Total: ${bill.total.toFixed(2)}</Typography>
      </Box>
    </Box>
  );
});


const PrintableReceipt = ({ open, onClose, bill }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <ReceiptContent ref={componentRef} bill={bill} />
        <Box sx={{ mt: 2, textAlign: 'right' }}>
          <Button onClick={handlePrint} variant="contained">Print</Button>
          <Button onClick={onClose} sx={{ ml: 1 }}>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PrintableReceipt;
