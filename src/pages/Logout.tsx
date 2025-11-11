import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login'); // redirect to login
  };

  return (
    <button className="btn btn-danger" onClick={handleLogout}>
      Logout
    </button>
  );
}