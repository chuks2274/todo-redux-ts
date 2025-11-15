import React, { useEffect, useState } from "react";// Import React and necessary hooks
import { auth } from "../firebase/firebaseConfig"; // Import Firebase auth instance
import EditProfileModal from "./EditProfileModal"; // Import EditProfileModal component
import DeleteAccountModal from "./DeleteAccountModal"; // Import DeleteAccountModal component

// ProfilePage component to display and manage user profile
export default function ProfilePage() {
  // State for current user, modals visibility, and messages
  const [user, setUser] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [message, setMessage] = useState("");

  // Listen for auth state changes to get current user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);
  // Handle profile update
  const handleProfileUpdate = (newName: string) => {
    if (user) {
      setUser({ ...user, displayName: newName });
      setMessage("✅ Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };
  // Handle account deletion
  const handleAccountDelete = () => {
    setMessage("⚠️ Account deleted successfully!");
    setTimeout(() => setMessage(""), 3000);
  };
  // Render the profile page
  return (
    <div className="profile-container">
      <div className="profile-card shadow p-4 rounded">
        <h2 className="text-center mb-4 text-dark">Profile</h2>

        {user ? (
          <>
            <div className="mb-3 text-dark">
              <strong>Name:</strong> {user.displayName || "No name set"}
            </div>
            <div className="mb-3 text-dark">
              <strong>Email:</strong> {user.email}
            </div>

            {message && <div className="alert alert-success">{message}</div>}

            <div className="d-flex justify-content-center gap-3 mt-3">
              <button
                className="btn btn-primary"
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-muted">
            No user logged in. Please sign in to view your profile.
          </p>
        )}
      </div>

      {/* Modals */}
      {/* Modals */}
<EditProfileModal
  show={showEditModal}
  onClose={() => setShowEditModal(false)}
  onSave={handleProfileUpdate}
/>

<DeleteAccountModal
  show={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  onDelete={handleAccountDelete}
/>
    </div>
  );
}
