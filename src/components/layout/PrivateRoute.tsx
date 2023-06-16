import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  isAuthenticated: boolean;
  redirectTo: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  isAuthenticated,
  redirectTo,
}) => {
  // console.log("Profile page", isAuthenticated)
  return isAuthenticated ? (
    <Routes>
    <Route path={path} element={element} />
    </Routes>
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default PrivateRoute;
