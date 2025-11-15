import React from 'react'; // Import React
import { Routes, Route } from 'react-router-dom'; // Import routing components
import Navbar from './components/Navbar'; // Import Navbar component
import Home from './pages/Home'; // Import Home page component
import About from './pages/about'; // Import About page component
import Completed from './pages/completed'; // Import Completed page component
import Pending from './pages/Pending'; // Import Pending page component
import InProcess from './pages/InProcess'; // Import InProcess page component
import Login from './pages/Login'; // Import Login page component
import Register from './pages/Register'; // Import Register page component
import ProfilePage from './components/ProfilePage'; // Import ProfilePage component
import ForgotPassword from './pages/ForgotPassword'; // Import ForgotPassword page component
import PrivateRoute from './auth/PrivateRoute'; // Import PrivateRoute component for protected routes

// Main App component
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
