import React, { useEffect, useState } from "react";

import Home from "./components/layout/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsPage from "./components/layout/DetailsPage";
import CartPage from "./components/layout/CartPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProfilePage from "./components/layout/ProfilePage";
import PrivateRoute from "./components/layout/PrivateRoute";
import useAppSelector from "./hooks/useAppSelector";


const App = () => {
  const { access_token, userProfile } = useAppSelector((state) => state.authenticationReducer);
  const isLoggedIn = !!access_token || !!userProfile;

  
  // return (
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/details/:id" element={<DetailsPage />} />
  //       <Route path="/cart/" element={<CartPage />} />
  //       <Route path="/signup/" element={<SignUp />} />
  //       <Route path="/login/" element={<Login />} />
  //       {/* <Route path="/profile/" element={<ProfilePage />} /> */}
  //       {/* <PrivateRoute path="/profile/" element={<ProfilePage />} isAuthenticated={isLoggedIn} redirectTo="/login/" /> */}
  //       <Route path="/profile" element= <PrivateRoute isAuthenticated={isLoggedIn} redirectTo="/login" component={<ProfilePage/>} />}
  //     </Routes>
  //   </BrowserRouter>
  // );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            // <PrivateRoute
            //   isAuthenticated={isLoggedIn}
            //   redirectTo="/login"
            //   element={<ProfilePage />}
            // />
            <PrivateRoute
          path="/profile"
          isAuthenticated={isLoggedIn}
          redirectTo="/login"
          element={<ProfilePage />}
        />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
