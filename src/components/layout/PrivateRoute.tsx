import React from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  // path: string;
  // element: React.ReactNode;
  isAuthenticated: boolean;
  // redirectTo: string;
}


const PrivateRoute: React.FC<PrivateRouteProps> = (isAuthenticated) => {
  return isAuthenticated ? <Outlet></Outlet> : <Navigate to="/login" />
}

export default PrivateRoute
