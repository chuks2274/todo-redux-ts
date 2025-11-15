import React from 'react';// Import React
import { signOut } from 'firebase/auth'; // Import Firebase signout function
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { useNavigate } from 'react-router-dom'; // Import navigation from react-router-dom

// Logout component to handle user sign-out
export default function Logout() {
  // Initialize navigation
  const navigate = useNavigate();
  // Handle user logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); // redirect to login
  };
  // Render logout button
  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}