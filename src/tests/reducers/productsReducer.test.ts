import { error } from "console";
import productsReducer, { fetchAllProducts, updateOneProduct } from "../../redux/reducers/productsReducer";
import { Product } from "../../types/Product";
import { ProductUpdate } from "../../types/ProductUpdate";
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../../redux/reducers/categoryReducer";
import cartReducer from "../../redux/reducers/cartReducer";
import usersReducer from "../../redux/reducers/usersReducer";
// import store from "../../redux/store";

const store = configureStore({
    reducer: {
        productsReducer,
        categoryReducer,
        cartReducer,
        usersReducer
    }
})

describe("Testing productsReducer", () => {
  test("Check initialState", () => {
    const state = productsReducer(undefined, { type: "unknown" });
    expect(state).toEqual({
      loading: false,
      error: "",
      products: [],
      singleProduct: {
        id: -1,
        title: "",
        price: 0,
        description: "",
        category: { id: -1, name: "", image: "" },
        images: [""],
      },
    });
  });
  test("Check should fetch all product", ()=> {
    const product: ProductUpdate = {
        id: 1,
        update: { 
            title: "Femi"
        }
    }
    const state = productsReducer(undefined, updateOneProduct(product))
    expect(state).toEqual({
        loading: false,
      error: '',
      products: [],
      singleProduct: {
        id: -1,
        title: '',
        price: 0,
        description: '',
        category: { id: -1, name: '', image: '' },
        images: [ '' ]
      }
    })

  })
});
