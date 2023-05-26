import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Product } from "../../types/Product";
import axios, { AxiosError } from "axios";
import { NewProduct } from "../../types/NewProduct";
import { SingleProduct } from "../../types/SingleProduct";
import { ProductUpdate } from "../../types/ProductUpdate";
import { UserProfile } from "../../types/UserProfile";

interface AuthenticationReducer {
  loading: boolean;
  error: string;
  email: string;
  password: string;
  access_token?: string;
  userProfile?: UserProfile
}

export interface loginQuery {
  email: string;
  password: string;
}

const initialState: AuthenticationReducer = {
  loading: false,
  error: "",
  email: "",
  password: "",
};

export const userLogin = createAsyncThunk(
  "userLogin",
//   async ({ email, password }: loginQuery) => {
  async ({ email, password }: loginQuery) => {
    try {
      const result = await axios.post<AuthenticationReducer>(
        `https://api.escuelajs.co/api/v1/auth/login`, {email, password}
      );
      const userProfile = await axios.get<UserProfile>(
        `https://api.escuelajs.co/api/v1/auth/profile`, { headers: { Authorization: `Bearer ${result.data.access_token}` } }
      );
      return {
        access_token: result.data.access_token!,
        userProfile: userProfile.data,
      }; 
    //   console.log("Login result", result)
    //   console.log("userProfilet", userProfile)
      //save result to local storage here
    } catch (e) {
      const error = e as AxiosError;
      return error.message;
    }
  }
);

export const userLogout = createAsyncThunk("userLogout", async () => {
    return null;
  });
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

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanUpAuthenticationReducer: (state) => {
      return initialState;
    },
    setCurrentUser: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(userLogin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          "This action cannot be completed at the moment, please try again later";
      })
    //   .addCase(userLogin.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.access_token = action.payload.access_token;
    //     state.userProfile = action.payload.userProfile; // Store the userProfile in the state
    //   })
    .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        // if (action.payload) {
        //   state.access_token = action.payload.access_token;
        //   state.userProfile = action.payload.userProfile;
        // } else {
          // Handle the case where payload is undefined
          // You can set appropriate values or handle the error state
        //   state.error = "User profile data is missing";
        // }
        // state.loading = false;
        state.access_token = (action.payload as { access_token: string }).access_token;
        state.userProfile = (action.payload as { userProfile: UserProfile }).userProfile;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        return initialState;
      });
      
//       .addCase(userLogin.fulfilled, (state, action) => {
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
  },
});

const authenticationReducer = authenticationSlice.reducer;
export const { cleanUpAuthenticationReducer } = authenticationSlice.actions;
export default authenticationReducer
