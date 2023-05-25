import React, { useEffect, useState } from "react";

import Home from "./components/layout/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./components/layout/DetailsPage";
import CartPage from "./components/layout/CartPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/cart/" element={<CartPage />} />
        <Route path="/signup/" element={<SignUp />} />
        <Route path="/login/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
