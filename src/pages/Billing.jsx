import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import BillForm from '../components/BillForm';
import PrintableReceipt from '../components/PrintableReceipt';
import { Typography, Box } from '@mui/material';

const Billing = () => {
  const { dispatch } = useContext(StoreContext);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [latestBill, setLatestBill] = useState(null);

  const handleSaveBill = (bill) => {
    const billWithId = { ...bill, id: `bill-${Date.now()}` };
    dispatch({ type: 'ADD_BILL', payload: billWithId });
    setLatestBill(billWithId);
    setReceiptModalOpen(true);
  };

  const handleCloseReceipt = () => {
    setReceiptModalOpen(false);
    setLatestBill(null);
  };

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4">Create a New Bill</Typography>
      </Box>
      <BillForm onSaveBill={handleSaveBill} />
      <PrintableReceipt
        open={receiptModalOpen}
        onClose={handleCloseReceipt}
        bill={latestBill}
      />
    </div>
  );
};

export default Billing;
