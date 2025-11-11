import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  todoTitle: string;
}

export default function DeleteConfirmModal({
  show,
  onHide,
  onConfirm,
  todoTitle,
}: DeleteConfirmModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered className="clean-modal">
      <Modal.Header closeButton className="clean-modal-header justify-content-center">
        <Modal.Title className="text-center w-100">Confirm Deletion</Modal.Title>
      </Modal.Header>

      <Modal.Body className="text-center text-dark">
        <p className="fw-semibold">
          Are you sure you want to delete <span className="text-primary">"{todoTitle}"</span>?
        </p>
        <p className="text-muted small">
          This action cannot be undone.
        </p>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={onHide} className="px-4">
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} className="px-4">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
