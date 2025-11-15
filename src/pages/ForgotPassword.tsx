import React, { useState } from 'react'; // Imort React and useState hook
import { sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase function to send password reset email
import { auth } from '../firebase/firebaseConfig'; // Import Firebase auth instance
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

// ForgotPassword component for resetting user password
const ForgotPassword: React.FC = () => {
  // State for email, messages, and errors
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Initialize navigation
  const navigate = useNavigate();
  // Handle password reset form submission
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault(); //Prevent default form submission behavior
    // Basic email validation
    if (!email.trim()) {
      setError('Please enter your registered email address.');
      return;
    }
    // Attempt to send password reset email
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(`✅ Password reset link sent to ${email}`);
      setError(null);
      setTimeout(() => navigate('/login'), 4000); // redirect after 4s
    } catch (err: any) {
      setError(err.message);
      setMessage(null);
    }
  };
  // Render the forgot password form
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
        {/* Card Header/Banner */}
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
          Reset Your Password
        </div>

        <div className="p-4">
          <form onSubmit={handleResetPassword} className="d-flex flex-column gap-3">
            {/* Email */}
            <div>
              <label htmlFor="email" className="form-label fw-semibold">
                Enter your registered email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="form-control"
              />
            </div>

            {/* Inline success/error messages */}
            {message && <p className="text-success text-center fw-semibold">{message}</p>}
            {error && <p className="text-danger text-center fw-semibold">{error}</p>}

            {/* Send Reset Link button */}
            <div className="d-flex justify-content-center mt-2">
              <button
                type="submit"
                className="btn btn-primary px-4 py-2 fw-semibold"
                style={{ fontSize: '1rem', borderRadius: '8px' }}
              >
                Send Reset Link
              </button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/login')}
              className="btn btn-link text-decoration-none fw-semibold text-primary"
            >
              🔙 Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
