import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTodo } from '../features/todos/todosSlice';
import { Todo } from '../features/todos/types';
import { v4 as uuidv4 } from 'uuid';
import { Spinner } from 'react-bootstrap'; // 

export default function AddTodo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [reminderValue, setReminderValue] = useState(2);
  const [reminderUnit, setReminderUnit] = useState<'hours' | 'days'>('hours');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !dueDate) return;

    setLoading(true);

    const newTodo: Todo = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      dueDate,
      reminderValue,
      reminderUnit,
      alertShown: false,
      createdAt: Date.now(),
      status: 'pending',
    };

    await new Promise(resolve => setTimeout(resolve, 300));

    dispatch(addTodo(newTodo));

    setTitle('');
    setDescription('');
    setDueDate('');
    setReminderValue(2);
    setReminderUnit('hours');
    setLoading(false);

    navigate('/pending');
  };

  return (
    <div className="text-center">
      {/* Toggle Form Button */}
      <button
        data-testid="toggle-form"
        onClick={() => setShowForm(prev => !prev)}
        className="btn btn-secondary mb-3"
      >
        {showForm ? 'Hide Form' : 'Open Form'}
      </button>

      {showForm && (
        <form
          onSubmit={handleAdd}
          data-testid="add-todo-form"
          className="card p-4 mb-4 shadow-sm mx-auto"
          style={{ maxWidth: '500px' }}
        >
          <h4 className="text-center mb-4 fw-bold">Add New Todo</h4>

          {/* Title */}
          <div className="mb-3 text-center">
            <label htmlFor="todo-title" className="form-label fw-semibold">
              Title
            </label>
            <input
              id="todo-title"
              type="text"
              placeholder="Enter todo"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="form-control text-center"
              required
              data-testid="todo-title-input"
            />
          </div>

          {/* Description */}
          <div className="mb-3 text-center">
            <label htmlFor="todo-description" className="form-label fw-semibold">
              Description
            </label>
            <textarea
              id="todo-description"
              placeholder="Enter task description (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="form-control text-center"
              rows={2}
              data-testid="todo-description-input"
            />
          </div>

          {/* Due Date */}
          <div className="mb-3 text-center">
            <label htmlFor="todo-dueDate" className="form-label fw-semibold">
              Due Date & Time
            </label>
            <input
              id="todo-dueDate"
              type="datetime-local"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="form-control text-center"
              required
              data-testid="todo-dueDate-input"
            />
          </div>

          {/* Reminder */}
          <div className="mb-3 d-flex justify-content-center gap-2">
            <div style={{ maxWidth: '100px' }}>
              <label htmlFor="todo-reminder-value" className="form-label fw-semibold text-center d-block">
                Reminder
              </label>
              <input
                id="todo-reminder-value"
                type="number"
                value={reminderValue}
                min={1}
                onChange={e => setReminderValue(Number(e.target.value))}
                className="form-control text-center"
                required
                data-testid="todo-reminder-value"
              />
            </div>
            <div style={{ maxWidth: '150px' }}>
              <label htmlFor="todo-reminder-unit" className="form-label fw-semibold text-center d-block">
                &nbsp;
              </label>
              <select
                id="todo-reminder-unit"
                value={reminderUnit}
                onChange={e => setReminderUnit(e.target.value as 'hours' | 'days')}
                className="form-select text-center"
                data-testid="todo-reminder-unit"
              >
                <option value="hours">Hours before</option>
                <option value="days">Days before</option>
              </select>
            </div>
          </div>

          {/* Add Button */}
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={loading}
              data-testid="add-todo"
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                    data-testid="loading-spinner"
                  />
                  Adding...
                </>
              ) : (
                'Add Todo'
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
