import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { GlobalState } from "./redux/store";
import useAppSelector from "./hooks/useAppSelector";
import {
  createUser,
  emptyUserReducer,
  fetchAllUsers,
  sortByEmail,
  updateOneUser,
  updateUserReducer,
} from "./redux/reducers/usersReducer";
import useAppDispatch from "./hooks/useAppDispatch";
import axios from "axios";
import { User } from "./types/User";
import { IconButton } from "@mui/material";
import { addOneFav, removeFromFav } from "./redux/reducers/favReducer";
import Home from "./components/layout/Home";
import { fetchAllProducts } from "./redux/reducers/productsReducer";
import { Product } from "./types/Product";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./components/layout/DetailsPage";

// const getFilteredList = (users: User[], search: string) => {
//   return users.filter(user => user.name.toLowerCase().includes(search.toLocaleLowerCase()))
// }

// const getFilteredProductList = (products: Product[], search: string) => {
//   return products.filter(product => product.title.toLowerCase().includes(search.toLocaleLowerCase()))
// }

const App = () => {
  const [sort, setSort] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const { users, loading, error } = useAppSelector(
    (state) => state.usersReducer
  );
  // const filterUsers = getFilteredList(users, search)
  // const favIds = useAppSelector(state => state.favReducer)
  // const favList = users.filter(user => favIds.includes(user.id))
  const dispatch = useAppDispatch();

  const addUser = () => {
    dispatch(
      createUser({
        id: 2,
        email: "",
        password: "",
        role: "admin",
        name: "Tom",
        avatar: "string",
      })
    );
  };

  useEffect(() => {
    dispatch(fetchAllUsers({ page: 1, per_page: 10 }));
  }, []);

  const deleteAllUsers = () => {
    dispatch(emptyUserReducer());
  };

  const updateUser = () => {
    dispatch(
      updateOneUser({
        id: 1,
        update: {
          email: "femi@mail.com",
          password: "femi",
          role: "customer",
          name: "femi",
          avatar: "",
        },
      })
    );
  };

  const sortByEmailDynamic = () => {
    dispatch(sortByEmail(sort));
    setSort(sort === "asc" ? "desc" : "asc");
  };
  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // const toggleFav = (id: number) =>{
  //   if (favIds.includes(id)){
  //     dispatch(removeFromFav(id))
  //   } else {
  //     dispatch(addOneFav(id))
  //   }

  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<DetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
