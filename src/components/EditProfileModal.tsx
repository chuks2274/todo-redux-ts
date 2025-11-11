import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

interface EditProfileModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
}

export default function EditProfileModal({
  show,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const [name, setName] = useState("");

  if (!show) return null;

  const handleSave = async () => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
      onSave(name);
    }
    onClose();
  };

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