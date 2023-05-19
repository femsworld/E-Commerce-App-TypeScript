import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";
import { NewProduct } from "../../types/NewProduct";

interface ProductReducer {
    loading: boolean
    error: string
    products: Product[]
}

const initialState: ProductReducer = {
    loading: false,
    error: "",
    products: []
}

export interface FetchQuery {
    offset: number
    limit: number
  }

// export const fetchAllProducts = createAsyncThunk(
//     "fetchAllProducts",
//     async ({
//         offset, limit
//     }: FetchQuery) => {
//         try {
//             const result = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
//             return result.data
//         } catch (e) {
//             const error = e as AxiosError
//             return error.message
//         }
//     }
// )

export const fetchAllProducts = createAsyncThunk(
    "fetchAllProducts",
    async ({
        offset, limit
    }: FetchQuery) => {
        try {
            const result = await axios.get<Product[]>(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`)
            return result.data
        } catch (e) {
            const error = e as AxiosError
            return error.message
        }
    }
)

export const createNewProduct = createAsyncThunk(
    "createNewProduct",
    async (product:NewProduct) => {
        try {
            const result = await axios.post<Product>("https://api.escuelajs.co/api/v1/products/", product)
            return result.data
        } catch (e) {
            const error = e as AxiosError
            if (error.response) {
                return JSON.stringify(error.response.data)
            }
            return error.message
        }
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        cleanUpProductReducer: (state) => {
            return initialState
        }
    },
    extraReducers: (build) => {
        build
            .addCase(fetchAllProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false
                state.error = "This action cannot be completed at the moment, please try again later"
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } else {
                    state.products = action.payload
                }
            })
            .addCase(createNewProduct.fulfilled, (state, action) => {
                if (typeof action.payload === "string") {
                    state.error = action.payload
                } else {
                    state.products.push(action.payload)
                }
                state.loading = false
            })
            .addCase(createNewProduct.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createNewProduct.rejected, (state, action) => {
                state.loading = false
                state.error = "This action cannot be completed at the moment, please try again later"
            })
    }
})

const productsReducer = productsSlice.reducer
export const { cleanUpProductReducer } = productsSlice.actions
export default productsReducer