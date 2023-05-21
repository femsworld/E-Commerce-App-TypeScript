import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import favReducer from "./reducers/favReducer";
import categoryReducer from "./reducers/categoryReducer";
import cartReducer from "./reducers/cartReducer";

// const favData = JSON.parse(localStorage.getItem("fav") || "")
const favData = localStorage.getItem("fav");
const parsedFavData = favData ? JSON.parse(favData) : null;

const store = configureStore({
  reducer: {
    productsReducer,
    usersReducer,
    favReducer,
    categoryReducer,
    cartReducer,
  },
  preloadedState: {
    productsReducer: {
      loading: false,
      error: "",
      products: [],
      singleProduct: {}
    //   singleProduct: {
    //     id: -1,
    //     title: "",
    //     price: 0,
    //     description: "",
    //     category: {
    //       id: -1,
    //       name: "",
    //       image: "",
    //     },
    //     images: [""],
    //   },
    },
    usersReducer: {
      loading: false,
      error: "",
      users: [],
    },
    // favReducer: favData
    favReducer: parsedFavData,
  },
});

store.subscribe(() => {
  localStorage.setItem("fav", JSON.stringify(store.getState().favReducer));
});

export type GlobalState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; //type of dispatch method from redux store
export default store;
