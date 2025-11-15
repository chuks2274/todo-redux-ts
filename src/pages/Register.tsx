import React, { useState, useEffect } from 'react'; // Import React and necessary hooks
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; // Import Firebase auth functions
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { useNavigate } from 'react-router-dom'; // Import navigation from react-router-dom

// Register component for new user sign-up
export default function Register() {
  // State for form fields, loading, error, and sucess messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Validation states
  const [nameValid, setNameValid] = useState<boolean | null>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  
  // Initialize navigation
  const navigate = useNavigate();

  // validate name, email, and password on change
  useEffect(() => {
    const trimmedName = name.trim();
    setNameValid(trimmedName.length >= 2 && trimmedName.length <= 30);

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,8}$/;
    setPasswordValid(passwordRegex.test(password));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(email));
  }, [name, password, email]);
  // Handle registration form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!nameValid) {
      setError('Name must be between 2 and 30 characters');
      return;
    }
    if (!emailValid) {
      setError('Please enter a valid email address');
      return;
    }
    if (!passwordValid) {
      setError('Password must be 6-8 characters long and include both letters and numbers');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
        // Creating a new user object: only `name` and `email` are used for now; other fields are placeholders for future app features
        const newUser = {
          name: name,
          email: email,
          location: "Not specified yet",
          title: "Member",
          bio: "Tell us about yourself...",
          skills: [],
          profilePic: "https://via.placeholder.com/150",
        };
        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(newUser));
        // Show success message and redirect to home
        setSuccess('✅ Account created successfully! Redirecting to home...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  // Helper to set input border colors
  const getInputClass = (isValid: boolean | null) => {
    if (isValid === null) return 'form-control';
    return isValid ? 'form-control border-success' : 'form-control border-danger';
  };
  // Render the registration form
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        padding: '20px'
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          maxWidth: '400px',
          width: '100%',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: 'white'
        }}
      >
        <div
          style={{
            background: 'linear-gradient(90deg, #6a11cb, #2575fc)',
            color: 'white',
            padding: '20px',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}
        >
          Create Your Account
        </div>

        <div className="p-4">
          <form onSubmit={handleRegister} className="d-flex flex-column gap-3">
            {/* Name */}
            <div>
              <label htmlFor="name" className="form-label fw-semibold">
                Name:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                placeholder="Enter your name"
                onChange={e => setName(e.target.value)}
                className={getInputClass(nameValid)}
              />
            </div>

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
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
                className={getInputClass(passwordValid)}
              />
            </div>

            {/* Error */}
            {error && <p className="text-danger text-center fw-semibold">{error}</p>}
            {/* Success */}
            {success && <p className="text-success text-center fw-semibold">{success}</p>}

            {/* Register button */}
            <div className="d-flex justify-content-center mt-2">
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 fw-semibold"
                style={{ fontSize: '1rem', borderRadius: '8px' }}
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          {/* Optional: link to Login */}
          <div className="text-center mt-4">
            <p className="mb-0 text-muted">
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                className="text-decoration-none fw-semibold text-primary"
                style={{ cursor: 'pointer' }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
