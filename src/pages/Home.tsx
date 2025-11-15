import React, { useState } from 'react'; // Import React and useState hook
import AddTodo from '../components/AddTodo'; // Import AddTodo component
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from AuthContext

// Home component to display welcome message and AddTodo form
export default function Home() {
  // Get current user from auth context
  const { user } = useAuth();
  // State to toggle AddTodo form visibility
  const [showForm, setShowForm] = useState(false);
  // Format todays's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
 // Render the Home page
  return (
    <div className="container mt-4 text-center">
      {user && (
        <>
          <h1 className="mb-2">Welcome, {user.displayName || user.email}!</h1>
          <p className="mb-1">{formattedDate}</p>
          <p className="mb-4   container">
            Manage your daily tasks efficiently — add, track, and complete your todos with ease!
          </p>

          <div className="text-center mb-4">
            <button
              data-testid="toggle-form" // <-- Added for tests
              className={`btn btn-lg rounded-pill px-4 fw-semibold shadow-sm ${
                showForm ? 'btn-outline-danger' : 'btn-primary'
              }`}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Close' : '+ Create'}
            </button>
          </div>

          {/* AddTodo form */}
          {showForm && <AddTodo />}
        </>
      )}
    </div>
  );
}
