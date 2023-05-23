import { error } from "console";
import productsReducer, { fetchAllProducts, updateOneProduct } from "../../redux/reducers/productsReducer";
import { Product } from "../../types/Product";
import { ProductUpdate } from "../../types/ProductUpdate";
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../../redux/reducers/categoryReducer";
import cartReducer from "../../redux/reducers/cartReducer";
import usersReducer from "../../redux/reducers/usersReducer";

// const store = configureStore({
//     reducer: {
//         productsReducer,
//         categoryReducer,
//         cartReducer,
//         usersReducer
//     }
// })

describe("Testing categoryReducer", () => {
  test("Check initialState", () => {
    const state = categoryReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
            categories: [], 
            productByCategory: [],
            loading: false,
            error: ''
        });
  });
});
