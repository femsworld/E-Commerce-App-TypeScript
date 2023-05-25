import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";
import { NewProduct } from "../../types/NewProduct";
import { SingleProduct } from "../../types/SingleProduct";
import { ProductUpdate } from "../../types/ProductUpdate";

interface AuthenticationReducer {
  loading: boolean;
  error: string;
  email: string;
  password: string;
  access_token?: string;
//   data: {
//     access_token: ""
//     refresh_token: ""
//   }
}

interface userProfile {
    loading: boolean;
    error: string;
    email: string;
    role: "customer" | "admin" ;
    avatar: ""
  }

export interface loginQuery {
  email: string;
  password: string;
}

// export interface FetchSingleProductQuery {
//   id: string | undefined;
// }

const initialState: AuthenticationReducer = {
  loading: false,
  error: "",
  email: "",
  password: "",
//   data: { access_token: "", refresh_token: "" }
};

export const userLogin = createAsyncThunk(
  "userLogin",
  async ({ email, password }: loginQuery) => {
    try {
      const result = await axios.post<AuthenticationReducer>(
        `https://api.escuelajs.co/api/v1/auth/login`, {email, password}
      );
      const userProfile = await axios.get<userProfile>(
        `https://api.escuelajs.co/api/v1/auth/profile`, { headers: { Authorization: `Bearer ${result.data.access_token}` } }
      );
    //   return result.data;    
      console.log("Login result", result)
      console.log("userProfilet", userProfile)
      //save result to local storage here
    } catch (e) {
      const error = e as AxiosError;
      return error.message;
    }
  }
);

// export const createNewProduct = createAsyncThunk(
//   "createNewProduct",
//   async (product: NewProduct) => {
//     try {
//       const result = await axios.post<Product>(
//         "https://api.escuelajs.co/api/v1/products/",
//         product
//       );
//       return result.data;
//     } catch (e) {
//       const error = e as AxiosError;
//       if (error.response) {
//         return JSON.stringify(error.response.data);
//       }
//       return error.message;
//     }
//   }
// );

// export const fetchSingleProduct = createAsyncThunk(
//   "fetchSingleProduct",
//   async ({ id }: FetchSingleProductQuery) => {
//     try {
//       const result = await axios.get<SingleProduct>(
//         `https://api.escuelajs.co/api/v1/products/${id}`
//       );
//       return result.data;
//     } catch (e) {
//       const error = e as AxiosError;
//       return error.message;
//     }
//   }
// );

// const authenticationSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {
//     cleanUpauthenticationReducer: (state) => {
//       return initialState;
//     },
//     loggedInUser: (state, action: PayloadAction<AuthenticationReducer>) => {
//         const { email, password } = action.payload;
//         const updatedUser = state.email(() => {
//         if (email && password === email && password) {
//             return {...updatedUser, update}
//         }
//         return updatedUser;
//     })
//     return {
//         ...state, users: updatedUser
//     }
//     },
//     // sortProductByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
//     //   if (action.payload === "asc") {
//     //     state.products.sort((a, b) => (a.price && b.price) && (a.price - b.price));
//     //   } else {
//     //     state.products.sort((a, b) => b.price - a.price);
//     //   }
//     // },
//   },
//   extraReducers: (build) => {
//     build
//       .addCase(fetchAllProducts.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(fetchAllProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           "This action cannot be completed at the moment, please try again later";
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         if (typeof action.payload === "string") {
//           state.error = action.payload;
//         } else {
//           state.products = action.payload;
//         }
//       })
//       .addCase(createNewProduct.fulfilled, (state, action) => {
//         if (typeof action.payload === "string") {
//           state.error = action.payload;
//         } else {
//           state.products.push(action.payload);
//         }
//         state.loading = false;
//       })
//       .addCase(createNewProduct.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(createNewProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           "This action cannot be completed at the moment, please try again later";
//       })
//       .addCase(fetchSingleProduct.fulfilled, (state, action) => {
//         if (typeof action.payload === "string") {
//           state.error = action.payload;
//         } else {
//           state.singleProduct = action.payload;
//         }
//         state.loading = false;
//       })
//       .addCase(fetchSingleProduct.pending, (state, action) => {
//         state.loading = true;
//       })
//       .addCase(fetchSingleProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error =
//           "This action cannot be completed at the moment, please try again later";
//       });
//   },
// });

// const productsReducer = productsSlice.reducer;
// export const { cleanUpProductReducer, updateOneProduct } = productsSlice.actions;
// export default productsReducer;
