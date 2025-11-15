import React, { useState } from "react"; // Import React and useState hook
import { updateProfile } from "firebase/auth"; // Import Firebase updateProfile function
import { auth } from "../firebase/firebaseConfig"; // Import Firebase auth instance

// Define props type for EditProfileModal component
interface EditProfileModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
}
// EditProfileModal component for editting user profile
export default function EditProfileModal({
  show,
  onClose,
  onSave,
  // Destructure props
}: EditProfileModalProps) {
  // State for name input
  const [name, setName] = useState("");
  // If modal is not shown, return null
  if (!show) return null;
  // Handle saving profile changes
  const handleSave = async () => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
      onSave(name);
    }
    onClose();
  };
  // Render the modal
  return (
    <div className="modal-overlay">
      <div className="modal-content p-4 rounded shadow bg-white">
        <h5 className="mb-3">Edit Profile</h5>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter new name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}