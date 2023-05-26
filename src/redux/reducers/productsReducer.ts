import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios, { AxiosError } from "axios";

import { Product } from "../../types/Product";
import { NewProduct } from "../../types/NewProduct";
import { SingleProduct } from "../../types/SingleProduct";
import { ProductUpdate } from "../../types/ProductUpdate";

interface ProductReducer {
  loading: boolean;
  error: string;
  products: Product[];
  singleProduct?: SingleProduct;
}
export interface FetchQuery {
  offset: number;
  limit: number;
}

export interface FetchSingleProductQuery {
  id: string | undefined;
}

const initialState: ProductReducer = {
  loading: false,
  error: "",
  products: [],
  singleProduct: {
    id: -1,
    title: "",
    price: 0,
    description: "",
    category: {
      id: -1,
      name: "",
      image: "",
    },
    images: [""],
  },
};

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async ({ offset, limit }: FetchQuery) => {
    try {
      const result = await axios.get<Product[]>(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error.message;
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "createNewProduct",
  async (product: NewProduct) => {
    try {
      const result = await axios.post<Product>(
        "https://api.escuelajs.co/api/v1/products/",
        product
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      if (error.response) {
        return JSON.stringify(error.response.data);
      }
      return error.message;
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async ({ id }: FetchSingleProductQuery) => {
    try {
      const result = await axios.get<SingleProduct>(
        `https://api.escuelajs.co/api/v1/products/${id}`
      );
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error.message;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    cleanUpProductReducer: (state) => {
      return initialState;
    },
    updateOneProduct: (state, action: PayloadAction<ProductUpdate>) => {
      const products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, ...action.payload.update };
        }
        return product;
      });
      return {
        ...state,
        products,
      };
    },
  },
  extraReducers: (build) => {
    build
      .addCase(fetchAllProducts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          "This action cannot be completed at the moment, please try again later";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.products = action.payload;
        }
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.products.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(createNewProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          "This action cannot be completed at the moment, please try again later";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else {
          state.singleProduct = action.payload;
        }
        state.loading = false;
      })
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          "This action cannot be completed at the moment, please try again later";
      });
  },
});

const productsReducer = productsSlice.reducer;
export const { cleanUpProductReducer, updateOneProduct } = productsSlice.actions;
export default productsReducer;
