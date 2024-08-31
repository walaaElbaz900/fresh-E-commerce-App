import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/Login" />
  );
};

export default PrivateRoute;



