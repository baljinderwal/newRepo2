import { describe, it, expect } from 'vitest';
import { storeReducer } from '../StoreContext';

describe('storeReducer', () => {
  const initialState = {
    products: [],
    customers: [],
    bills: [],
  };

  it('should handle ADD_PRODUCT', () => {
    const action = {
      type: 'ADD_PRODUCT',
      payload: { name: 'Test Product', sku: 'TP-01', category: 'Test', unitPrice: 10, qty: 1 },
    };
    const newState = storeReducer(initialState, action);
    expect(newState.products).toHaveLength(1);
    expect(newState.products[0].name).toBe('Test Product');
    expect(newState.products[0]).toHaveProperty('id');
  });

  it('should handle ADD_BILL', () => {
    const stateWithCustomer = {
      ...initialState,
      customers: [{ id: 'c1', name: 'Test Customer' }],
    };
    const action = {
      type: 'ADD_BILL',
      payload: {
        customer: { id: 'c1', name: 'Test Customer' },
        items: [{ id: 'p1', name: 'Test Product', unitPrice: 10, qty: 2 }],
        total: 20,
      },
    };
    const newState = storeReducer(stateWithCustomer, action);
    expect(newState.bills).toHaveLength(1);
    expect(newState.bills[0].total).toBe(20);
    expect(newState.bills[0]).toHaveProperty('id');
  });
});
