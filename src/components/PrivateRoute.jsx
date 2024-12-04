import React from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, roles }) => {
  const { isAuthenticated, userRole } = React.useContext(AuthContext);

  if (!isAuthenticated || (roles && !roles.includes(userRole))) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;