import React, { ReactNode } from 'react'; // Import React and the ReactNode type for typing children
import { Navigate } from 'react-router-dom'; // Import Navigate to programmatically redirect users
import { useAuth } from './useAuth'; // Import custom hook to get authentication state

// Define the props type for this component
interface Props {
  children: ReactNode; // The components to render if authenticated
}
  // PrivateRoute component to protect routes
export default function PrivateRoute({ children }: Props) {
  //Get auth status
  const { user, loading } = useAuth();
  // Show loading indicator while checking auth status
  if (loading) return <p>Loading...</p>;
  // If the user is not logged in, redirect to the login page
  if (!user) return <Navigate to="/login" />;
  // If the user is authenticated, render the child components
  return <>{children}</>;
}
