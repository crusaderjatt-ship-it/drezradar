"use client";

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSupabase } from '@/components/SessionContextProvider';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  adminOnly?: boolean; // New prop to indicate if the route is for admins only
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { session, loading } = useSupabase();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Checking authentication...</div>;
  }

  if (!session) {
    // User is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && session.user?.email !== 'randhawa.m@gmail.com') {
    // User is authenticated but not the specified admin, redirect to home or a not-authorized page
    return <Navigate to="/" replace />; // Redirect to home for unauthorized admin access
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;