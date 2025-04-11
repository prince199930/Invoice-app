// src/routes/PrivateRoutes.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/auth"; // adjust the path if needed

// Handle private (protected) routes
const PrivateRoutes = () => {
  return getToken() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

// Handle public routes
export const PublicRoutes = () => {
  return !getToken() ? <Outlet /> : <Navigate to="/dashboard" />;
};
