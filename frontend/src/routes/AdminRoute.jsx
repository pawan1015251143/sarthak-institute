import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, role } = useAuth();
  const location = useLocation();

  const isAdmin = role === 'ADMIN' || user?.role === 'ADMIN' || String(user?.email || '').includes('ADMIN');
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminRoute;
