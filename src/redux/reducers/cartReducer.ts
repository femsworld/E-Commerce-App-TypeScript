import { createSlice } from "@reduxjs/toolkit";

import { CartItem } from "../../types/CartItem";

interface CartReducer {
  items: CartItem[];
  totalAmount: number;
  count: number
}

const initialState: CartReducer = {
  items: [],
  totalAmount: 0,
  count: 0
};

// Create a slice for the cartReducer
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem: CartItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem) {
        if (existingItem.quantity) {
          existingItem.quantity += 1;
        } else {
          existingItem.quantity = 1;
        }
      } else {
        const newCartItem = { ...newItem, quantity: 1 };
        state.items.push(newCartItem);
      }
      state.totalAmount += newItem.price;
    },
    clearCart: (state) => {
      // Clear the cart by resetting the state to the initial state
      return initialState;
    },
  },
});

// Extract the action creators from the slice
export const { addItemToCart, clearCart } =
  cartSlice.actions;

// Export the cartReducer
const cartReducer = cartSlice.reducer;
export default cartReducer;
