import React from 'react';
import { useSession } from '../hooks/useSession';
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading } = useSession();

  if (isLoading) {
    return <Spinner />;
  }

  return <div>{session?.success ? children : <Navigate to="/signin" />}</div>;
}

export default ProtectedRoute;
