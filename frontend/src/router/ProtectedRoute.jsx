import React from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../contextApi/AuthProvider.jsx';

function ProtectedRoute({ children, requiredRole }) {
  const { authUser } = useAuth();

  if (!authUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (authUser.user.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  

  return children;
}

export default ProtectedRoute;
