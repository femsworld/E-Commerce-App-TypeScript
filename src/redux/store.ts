import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import categoryReducer from "./reducers/categoryReducer";
import cartReducer from "./reducers/cartReducer";
import authenticationReducer from "./reducers/authenticationReducer";

const store = configureStore({
  reducer: {
    productsReducer,
    usersReducer,
    categoryReducer,
    cartReducer,
    authenticationReducer,
  },
  preloadedState: {
    productsReducer: {
      loading: false,
      error: "",
      products: [],
      singleProduct: {}
    },
    usersReducer: {
      loading: false,
      error: "",
      users: [],
      newUser: {
        name: "",
        email: "",
        password: "",
        avatar: ""
      }
    },
  },
});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; //type of dispatch method from redux store
export default store;
