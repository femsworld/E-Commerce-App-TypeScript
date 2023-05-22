import React, { useEffect, useState } from "react";

import Home from "./components/layout/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./components/layout/DetailsPage";


const App = () => {
  
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
