import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { Link } from 'react-router-dom'; // Import Link for navigation
import { FaMoon, FaSun, FaTint } from 'react-icons/fa'; // Import icons for themes
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Import Firebase auth functions
import '../App.css'; // Import global styles

// Define theme types
type Theme = 'light' | 'dark' | 'blue';

// Define available themes and their corresponding icons and labels
const themes: Theme[] = ['light', 'dark', 'blue'];
// Map theme to icons
const themeIcons: Record<Theme, any> = {
  light: <FaSun className="me-2 theme-icon" />,
  dark: <FaMoon className="me-2 theme-icon" />,
  blue: <FaTint className="me-2 theme-icon" />,
};
// Map theme to labels
const themeLabels: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  blue: 'Blue',
};
 // Navbar component
export default function Navbar() {
  //// State for theme, animation toggle, and current user
  const [theme, setTheme] = useState<Theme>('light');
  const [animate, setAnimate] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Load saved theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []); 

  // Listen for auth state changes to get current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []); 
  // Handle theme toggle with animation
  const handleThemeToggle = () => {
    setAnimate(true);
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTimeout(() => setAnimate(false), 300);
  };
  // Handle user logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Collapse navbar on link click
  const handleNavLinkClick = () => {
    const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
    const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
    if (navbarCollapse.classList.contains('show') && navbarToggler) {
      navbarToggler.click();
    }
  };
  // Render the navbar
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded mb-4">
      <div className="container">
        {/* Brand on the left */}
        <span className="navbar-brand fw-bold fs-5"> Todo App</span>

        {/* Hamburger button for mobile */}
        <button
          className={`navbar-toggler ${theme === 'dark' ? 'navbar-dark-toggler' : ''}`}
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
            {user && (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link" onClick={handleNavLinkClick}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/pending" className="nav-link" onClick={handleNavLinkClick}>Pending</Link>
                </li>
                <li className="nav-item">
                  <Link to="/in-process" className="nav-link" onClick={handleNavLinkClick}>In Process</Link>
                </li>
                <li className="nav-item">
                  <Link to="/completed" className="nav-link" onClick={handleNavLinkClick}>Completed</Link>
                </li>
                <li className="nav-item me-3">
                  <Link to="/about" className="nav-link" onClick={handleNavLinkClick}>About</Link>
                </li>
                <li className="nav-item me-3">
                  <Link to="/profile" className="nav-link fw-bold" onClick={handleNavLinkClick}>
                    Profile
                  </Link>
                </li>
              </>
            )}

            {!user ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={handleNavLinkClick}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link" onClick={handleNavLinkClick}>Register</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
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