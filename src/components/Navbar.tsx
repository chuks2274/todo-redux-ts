import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { FaMoon, FaSun, FaTint } from 'react-icons/fa';
import { auth } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import '../App.css';

type Theme = 'light' | 'dark' | 'blue';

const themes: Theme[] = ['light', 'dark', 'blue'];

const themeIcons: Record<Theme, any> = {
  light: <FaSun className="me-2 theme-icon" />,
  dark: <FaMoon className="me-2 theme-icon" />,
  blue: <FaTint className="me-2 theme-icon" />,
};

const themeLabels: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  blue: 'Blue',
};

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>('light');
  const [animate, setAnimate] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Theme initialization
  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleThemeToggle = () => {
    setAnimate(true);
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTimeout(() => setAnimate(false), 300);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded mb-4">
      <div className="container">
        {/* Brand on the left */}
        <span className="navbar-brand fw-bold fs-5">Professional Todo App</span>

        {/* Hamburger button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible nav links + theme/auth buttons */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Only show these links if user is logged in */}
            {user && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/pending" className="nav-link">Pending</Link>
                </li>
                <li className="nav-item">
                  <Link to="/in-process" className="nav-link">In Process</Link>
                </li>
                <li className="nav-item">
                  <Link to="/completed" className="nav-link">Completed</Link>
                </li>
                <li className="nav-item me-3">
                  <Link to="/about" className="nav-link">About</Link>
                </li>
                {/* ✅ New Profile link */}
                <li className="nav-item me-3">
                  <Link to="/profile" className="nav-link fw-bold">
                    Profile
                  </Link>
                </li>
              </>
            )}

            {/* Auth Buttons */}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
              </>
            ) : (
              <>
                {/* Logout Button */}
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>

                {/* Theme button only visible when logged in */}
                <li className="nav-item ms-2">
                  <button
                    className={`btn btn-sm d-flex align-items-center theme-btn ${
                      theme === 'dark'
                        ? 'btn-dark'
                        : theme === 'blue'
                        ? 'btn-primary'
                        : 'btn-light text-dark'
                    } ${animate ? 'animate-icon' : ''}`}
                    style={{
                      padding: '0.5rem 1rem',
                      fontSize: '1rem',
                      cursor: 'pointer',
                      borderRadius: '12px',
                      transition: 'all 0.5s ease',
                    }}
                    onClick={handleThemeToggle}
                  >
                    <span
                      className="theme-icon-wrapper"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'transform 0.3s ease, color 0.5s ease',
                        transform: animate ? 'rotate(360deg)' : 'rotate(0deg)',
                      }}
                    >
                      {themeIcons[theme]}
                    </span>
                    <span className="theme-label" style={{ transition: 'color 0.5s ease' }}>
                      {themeLabels[theme]}
                    </span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}