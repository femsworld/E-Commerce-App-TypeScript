import { createSlice } from "@reduxjs/toolkit";

import { CartItem } from "../../types/CartItem";

interface CartReducer {
  items: CartItem[];
  totalAmount: number;
  count: number;
}

const initialState: CartReducer = {
  items: [],
  totalAmount: 0,
  count: 0,
};

// const calculateTotalAmount = (items: CartItem[]) => {
//   return items.reduce((total, item) => total + item.price, 0);
// };
// Create a slice for the cartReducer
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem: CartItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        if (existingItem.quantity){
          existingItem.quantity+= 1;
          state.totalAmount += existingItem.price;
        } 
      } else {
        const newCartItem = { ...newItem, quantity: 1 };
        state.items.push(newCartItem);
        state.totalAmount += newCartItem.price; 
      }
    },
    removeItemToCart: (state, action) => {
      const newItem: CartItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        if (existingItem.quantity){
          existingItem.quantity-= 1;
          state.totalAmount -= existingItem.price;
        } 
      } else {
        const newCartItem = { ...newItem, quantity: 1 };
        state.items.push(newCartItem);
        state.totalAmount -= newCartItem.price; 
      }
    },
    clearCart: (state) => {
      // Clear the cart by resetting the state to the initial state
      return initialState;
    },
  },
});


// Extract the action creators from the slice
export const { addItemToCart, removeItemToCart, clearCart } = cartSlice.actions;

// Export the cartReducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
