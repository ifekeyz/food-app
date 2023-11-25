import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

export const ProtectedRoute = ({ element, ...props }) => {
  const { isAuthenticated } = useUser();

  return isAuthenticated ? <Route {...props} element={element} /> : <Navigate to="/login" />;
};
