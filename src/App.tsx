import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAppSelector from "./hooks/useAppSelector";

import Home from "./components/layout/Home";
import DetailsPage from "./components/layout/DetailsPage";
import CartPage from "./components/layout/CartPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ProfilePage from "./components/layout/ProfilePage";
import PrivateRoute from "./components/layout/PrivateRoute";
import Dashboard from "./components/layout/Dashboard";


const App = () => {
  const { access_token, userProfile } = useAppSelector((state) => state.authenticationReducer);
  // const isLoggedIn = !!access_token || !!userProfile;
  const storedUserProfile = localStorage.getItem("userProfile");
  // const isLoggedIn = !!access_token || !!userProfile;
  // console.log("Access token: ", access_token)
  // console.log("userProfile: ", userProfile)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* <Route
          path="/*"
          element={
            <PrivateRoute
          path="/profile"
          isAuthenticated={!!storedUserProfile}
          redirectTo="/login"
          element={<ProfilePage />}
        />
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute
          path="/dashboard"
          isAuthenticated={!!storedUserProfile}
          redirectTo="/login"
          element={<Dashboard />}
        />
          }
        /> */}

        <Route path="/" element={<PrivateRoute isAuthenticated={!!storedUserProfile}/>}>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
};

export default App;
