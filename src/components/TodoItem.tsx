import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todos/todosSlice';
import { Todo } from '../features/todos/types';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmModal from './DeleteConfirmModal';

interface Props {
  todo: Todo;
}

export default function TodoItem({ todo }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [dueDate, setDueDate] = useState(todo.dueDate);
  const [reminderValue, setReminderValue] = useState(todo.reminderValue || 2);
  const [reminderUnit, setReminderUnit] = useState<'hours' | 'days'>(todo.reminderUnit || 'hours');
  const [status, setStatus] = useState<Todo['status']>(todo.status || 'pending');
  const [remaining, setRemaining] = useState('');
  const [visible, setVisible] = useState(true);

  // Update countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const dueTime = new Date(dueDate).getTime();
      const diffMs = dueTime - now;

      if (diffMs > 0) {
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        setRemaining(`⏰ ${diffDays}d ${diffHours}h ${diffMinutes}m left`);
      } else {
        setRemaining('⏰ Past due!');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dueDate]);

  // Handle status change + move todo between pages
  const handleStatusChange = (newStatus: Todo['status']) => {
    setStatus(newStatus);
    if (newStatus === 'in-process' || newStatus === 'completed') setVisible(false);
    dispatch(updateTodo({ id: todo.id, status: newStatus }));
    if (newStatus === 'in-process') navigate('/in-process');
    else if (newStatus === 'completed') navigate('/completed');
  };

  // Handle todo update
  const handleUpdate = () => {
    dispatch(updateTodo({
      id: todo.id,
      title,
      description,
      dueDate,
      reminderValue,
      reminderUnit,
      status,
    }));
    setShowModal(false);
    if (status === 'in-process' || status === 'completed') setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Todo Card */}
      <div className={`card mb-3 p-3 shadow-sm ${status === 'completed' ? 'completed' : ''}`} style={{ maxWidth: '600px', width: '100%' }}>
        <div className="mb-2 text-center">
          <p><strong>Title:</strong> {title}</p>
          {description && <p><strong>Description:</strong> {description}</p>}
          <p><strong>Created:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
          <p><strong>Due:</strong> {new Date(dueDate).toLocaleString()}</p>
          {remaining && (
            <span className="badge bg-warning text-dark fw-bold">{remaining}</span>
          )}
        </div>

        <div className="d-flex flex-column align-items-center gap-2 mt-2">
          <Form.Select
            size="sm"
            value={status}
            onChange={e => handleStatusChange(e.target.value as Todo['status'])}
            className="text-center"
            style={{ maxWidth: '200px' }}
            data-testid={`status-select-${todo.id}`} // added for testing
          >
            <option value="pending">Pending</option>
            <option value="in-process">In Process</option>
            <option value="completed">Completed</option>
          </Form.Select>

          <div className="d-flex gap-2 justify-content-center">
            <Button
              size="sm"
              variant="primary"
              onClick={() => handleStatusChange('completed')}
              data-testid={`complete-todo-${todo.id}`} // added for testing
            >
              Complete
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
              data-testid={`delete-todo-${todo.id}`} // added for testing
            >
              Delete
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setShowModal(true)}>
              Edit
            </Button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="clean-modal">
        <Modal.Header closeButton className="clean-modal-header justify-content-center">
          <Modal.Title className="text-center w-100">Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark text-center">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control
                className="mx-auto"
                style={{ maxWidth: '400px' }}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                className="mx-auto"
                style={{ maxWidth: '400px' }}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Due Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                className="mx-auto"
                style={{ maxWidth: '250px' }}
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex gap-3 justify-content-center mb-3">
              <Form.Group>
                <Form.Label className="fw-bold">Reminder Value</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={reminderValue}
                  onChange={e => setReminderValue(Number(e.target.value))}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bold">Reminder Unit</Form.Label>
                <Form.Select
                  value={reminderUnit}
                  onChange={e => setReminderUnit(e.target.value as 'hours' | 'days')}
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </Form.Select>
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Status</Form.Label>
              <Form.Select
                className="mx-auto"
                style={{ maxWidth: '200px' }}
                value={status}
                onChange={e => handleStatusChange(e.target.value as Todo['status'])}
              >
                <option value="pending">Pending</option>
                <option value="in-process">In Process</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="secondary" className="px-4" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" className="px-4" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={() => {
          dispatch(removeTodo(todo.id));
          setShowDeleteModal(false);
        }}
        todoTitle={title}
      />
    </>
  );
}
