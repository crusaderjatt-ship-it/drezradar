"use client";

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSupabase } from '@/components/SessionContextProvider';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { session, loading } = useSupabase();

  if (loading) {
    // You might want a loading spinner here
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Checking authentication...</div>;
  }

  if (!session) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;