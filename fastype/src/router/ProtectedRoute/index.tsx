import React, { ElementType } from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/index'; 
interface ProtectedRouteProps {
  component: ElementType; 
  path?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
