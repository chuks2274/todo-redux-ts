import React, { useState } from "react"; // Import React and useState hook
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth"; // Import Firebase auth functions
import { auth } from "../firebase/firebaseConfig"; // Import Firebase auth instance

// Define props type for DeleteAccountModal component
interface DeleteAccountModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}
 // DeleteAccountModal component for confirming account deletion
export default function DeleteAccountModal({
  show,
  onClose,
  onDelete,
}: DeleteAccountModalProps) {
  // State for password input, messages, errors, and loading status
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  // If modal is not shown, return null
  if (!show) return null;
  // Handle account deletion
  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      //  Reauthenticate user before sensitive action
      const credential = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credential);

      //  Proceed with account deletion
      await deleteUser(user);

      setMessage("✅ Your account has been successfully deleted.");
      onDelete();
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/requires-recent-login") {
        setError("⚠️ Please log in again before deleting your account.");
      } else if (err.code === "auth/wrong-password") {
        setError("❌ Incorrect password. Please try again.");
      } else {
        setError("An error occurred while deleting your account.");
      }
    } finally {
      setLoading(false);
    }
  };
  // Render the modal
  return (
    <div className="modal-overlay">
      <div className="modal-content p-4 rounded shadow bg-white">
        
        <h5 className="mb-3 text-danger">Confirm Account Deletion</h5>
        <p>
          Enter your password to confirm account deletion. This action cannot be
          undone.
        </p>

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {message && <div className="alert alert-success py-2">{message}</div>}

        <div className="d-flex justify-content-end gap-2 mt-3">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={loading || !password}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
