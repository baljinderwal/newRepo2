import React, { createContext, useReducer, useEffect } from 'react';
import { loadState, saveState } from '../utils/storage';
import { seedProducts, seedCustomers } from '../data/seed';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  products: [],
  customers: [],
  bills: [],
};

const persistedState = loadState();
const initialStoreState = persistedState ? persistedState : {
  products: seedProducts,
  customers: seedCustomers,
  bills: [],
};

const storeReducer = (state, action) => {
  switch (action.type) {
    // Product actions
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, { ...action.payload, id: uuidv4() }] };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(p => p.id === action.payload.id ? action.payload : p),
      };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p.id !== action.payload.id) };

    // Customer actions
    case 'ADD_CUSTOMER':
      return { ...state, customers: [...state.customers, { ...action.payload, id: uuidv4() }] };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customers: state.customers.map(c => c.id === action.payload.id ? action.payload : c),
      };
    case 'DELETE_CUSTOMER':
      return { ...state, customers: state.customers.filter(c => c.id !== action.payload.id) };

    // Bill actions
    case 'ADD_BILL':
      return { ...state, bills: [...state.bills, { ...action.payload, id: uuidv4() }] };

    default:
      return state;
  }
};

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialStoreState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
