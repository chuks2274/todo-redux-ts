import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface Props {
  children: ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
}
