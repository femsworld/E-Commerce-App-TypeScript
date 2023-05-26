import React from "react";
import { Route, Navigate } from "react-router-dom";

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
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default PrivateRoute;
