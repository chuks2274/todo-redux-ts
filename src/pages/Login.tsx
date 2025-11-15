import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase sign-in function
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { useNavigate, Link } from 'react-router-dom'; // Import navigation and link from react-router-dom

// Login component for user authentication
export default function Login() {
  // State for form fields, loading, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation states
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  // Initialize navigation
  const navigate = useNavigate();

  // Auto-fill email if previously remembered
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedUser');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // validate email and password on change
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,8}$/;
    setPasswordValid(passwordRegex.test(password));
  }, [email, password]);
  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailValid) {
      setError('Please enter a valid email address');
      return;
    }
    if (!passwordValid) {
      setError('Password must be 6-8 characters and include letters and numbers');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (rememberMe) {
        localStorage.setItem('rememberedUser', email);
      } else {
        localStorage.removeItem('rememberedUser');
      }

      navigate('/'); // redirect to dashboard (Home)
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // Helper to set border colors
  const getInputClass = (isValid: boolean | null) => {
    if (isValid === null) return 'form-control';
    return isValid ? 'form-control border-success' : 'form-control border-danger';
  };
  // Render the login form
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        padding: '20px',
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: '400px',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}
      >
        {/* Card Header/Banner */}
        <div
          style={{
            background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
            color: 'white',
            padding: '20px',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          Welcome Back
        </div>

        <div className="p-4">
          <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label fw-semibold">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                className={getInputClass(emailValid)}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="form-label fw-semibold">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="6-8 characters, letters and numbers"
                onChange={(e) => setPassword(e.target.value)}
                className={getInputClass(passwordValid)}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-check">
                <input
                  type="checkbox"
                  id="rememberMe"
                  className="form-check-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe" className="form-check-label fw-semibold">
                  Remember Me
                </label>
              </div>
              <Link to="/forgot-password" className="text-decoration-none fw-semibold">
                Forgot Password?
              </Link>
            </div>

            {/* Error */}
            {error && <p className="text-danger text-center fw-semibold">{error}</p>}

            {/* Login button */}
            <div className="d-flex justify-content-center mt-2">
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 fw-semibold"
                style={{ fontSize: '1rem', borderRadius: '8px' }}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>

          {/* Optional: link to Register */}
          <div className="text-center mt-4">
            <p className="mb-0 text-muted">
              Don’t have an account?{' '}
              <Link to="/register" className="text-decoration-none fw-semibold text-primary">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
