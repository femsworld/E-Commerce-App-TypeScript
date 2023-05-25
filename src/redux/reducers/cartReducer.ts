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
    // deleteItemFromCart: (state, action) => {
    //   const itemId: number = action.payload;
    //   const existingItemIndex = state.items.findIndex((item) => item.id === itemId);
    //   if (existingItemIndex !== -1) {
    //     const existingItem = state.items[existingItemIndex];
    //     if (existingItem.quantity && existingItem.quantity > 1) {
    //       if(existingItem.quantity){
    //         existingItem.quantity -= 1;
    //         state.totalAmount -= existingItem.price;
    //       }
          
    //     } else {
    //       state.items.splice(existingItemIndex, 1);
    //       state.totalAmount -= existingItem.price;
    //     }
    //   }
    // },
    deleteItemFromCart: (state, action) => {
      const itemId: number = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === itemId);
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if(existingItem.quantity){
          // state.totalAmount -= existingItem.price * existingItem.quantity;
        state.items.splice(existingItemIndex);
        }
      }
    },
    clearCart: (state) => {
      return initialState;
    },
  },
});

export const { addItemToCart, removeItemToCart, deleteItemFromCart, clearCart } = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
