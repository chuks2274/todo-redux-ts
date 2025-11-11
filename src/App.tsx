import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Pages
import Home from './pages/Home';
import About from './pages/about';
import Completed from './pages/completed';
import Pending from './pages/Pending';
import InProcess from './pages/InProcess';
import Login from './pages/Login';
import Register from './pages/Register';
import ProfilePage from './components/ProfilePage'; // Added
import ForgotPassword from './pages/ForgotPassword'; // Added

// Auth
import PrivateRoute from './auth/PrivateRoute';

export default function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/pending"
          element={
            <PrivateRoute>
              <Pending />
            </PrivateRoute>
          }
        />
        <Route
          path="/in-process"
          element={
            <PrivateRoute>
              <InProcess />
            </PrivateRoute>
          }
        />
        <Route
          path="/completed"
          element={
            <PrivateRoute>
              <Completed />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
