import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";
import axios, { AxiosError } from "axios";
import { ProductByCategory } from "../../types/ProductByCategory";
import { Product } from "../../types/Product";

// Define the initial state for the product category
interface CategoryReducer {
  categories: Category[]
  productByCategory: Product[]
  loading: boolean
  error: string
}

const initialState: CategoryReducer = {
  categories: [],
  productByCategory: [],
  loading: false,
  error: ""
};

export interface FetchQueryCategory {
  offset: number
  limit: number
  categoryID: number
}

export const fetchAllCategories = createAsyncThunk(
  "fetchAllCategories",
  async () => {
      try {
          const result = await axios.get<Category[]>("https://api.escuelajs.co/api/v1/categories")
          return result.data
      } catch (e) {
          const error = e as AxiosError
          return error.message
      }
  }
)

export const fetchAllCategoriesId = createAsyncThunk(
  "fetchAllCategoriesId",
  async ({
      offset, limit, categoryID
  }: FetchQueryCategory) => {
      try {
          const result = await axios.get<Category[]>(`https://api.escuelajs.co/api/v1/categories/${categoryID}/products?offset=${offset}&limit=${limit}`)
          return result.data
      } catch (e) {
          const error = e as AxiosError
          return error.message
      }
  }
)

// Create a slice for the categoryReducerReducer
const categoryReducerSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    selectCategory: (state, action) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (build) => {
    build
        .addCase(fetchAllCategories.pending, (state, action) => {
            state.loading = true
        })
        .addCase(fetchAllCategories.rejected, (state, action) => {
            state.loading = false
            state.error = "This action cannot be completed at the moment, please try again later"
        })
        .addCase(fetchAllCategories.fulfilled, (state, action) => {
            state.loading = false
            if (typeof action.payload === "string") {
                state.error = action.payload
            } else {
                state.categories = action.payload
            }
        })
        .addCase(fetchAllCategoriesId.fulfilled, (state, action) => {
            if (typeof action.payload === "string") {
                state.error = action.payload
            } else {
              state.productByCategory = action.payload
            }
            state.loading = false
        })
        .addCase(fetchAllCategoriesId.pending, (state, action) => {
            state.loading = true
        })
        .addCase(fetchAllCategoriesId.rejected, (state, action) => {
            state.loading = false
            state.error = "This action cannot be completed at the moment, please try again later"
        })
}
});

const categoryReducer = categoryReducerSlice.reducer;

export const { setCategories, selectCategory } = categoryReducerSlice.actions;
export default categoryReducer;
