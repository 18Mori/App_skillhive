import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // First, check if the user is logged in.
  if (!currentUser) {
    // If not, redirect them to the login page.
    // We save the location they were trying to go to, so we can redirect them back after login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Next, if a specific 'role' is required for this route, check if the user has that role.
  if (role && currentUser.role !== role) {
    // If the roles do not match, the user is not authorized.
    // Redirect them to the home page as they don't have permission.
    return <Navigate to="/" replace />;
  }

  // If the user is logged in and has the correct role (if required), render the component.
  return children;
};

export default ProtectedRoute;