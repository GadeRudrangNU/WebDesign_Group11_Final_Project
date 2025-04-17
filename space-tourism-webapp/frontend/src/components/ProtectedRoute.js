// frontend/src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token is found, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If allowedRoles is provided and user's role is not included, show unauthorized message or redirect
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
