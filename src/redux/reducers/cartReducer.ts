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
      let newItem: CartItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        const selectedProduct = state.items.find(
          (item) => item.id === action.payload.id
        );
        if (selectedProduct && selectedProduct.quantity) {
          selectedProduct.quantity += 1;
          return;
        }
      } else {
        newItem = { ...newItem, quantity: 1 };
        state.items.push(newItem);
      }
        // state.totalAmount += newItem.price * newItem.quantity;
        state.totalAmount += Number(newItem.price) * Number(newItem.quantity);
        console.log("This is total amount", state.totalAmount)
    },
    // removeItemFromCart: (state, action) => {
    //   const itemId = action.payload;
    //   // Find the item in the cart
    //     // const existingItem = state.items.find(item => item.id === itemId);
    //     // if (existingItem) {
    //     //   // Subtract the item's price from the total
    //     //   state.total -= existingItem.price * existingItem.quantity;
    //     //   // Remove the item from the cart
    //     //   state.items = state.items.filter(item => item.id !== itemId);
    //     // }
    // },
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
