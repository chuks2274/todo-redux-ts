import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TodoItem from '../components/TodoItem';
import type { RootState } from '../store';

const ITEMS_PER_PAGE = 5; // Adjust number of todos per page

export default function InProcessPage() {
  const navigate = useNavigate();

  // Filter todos with status 'in-process' and sort newest on top
  const todos = useSelector((state: RootState) =>
    state.todos.todos
      .filter(todo => todo.status === 'in-process')
      .sort((a, b) => b.createdAt - a.createdAt)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(Math.ceil(todos.length / ITEMS_PER_PAGE), 1); // Ensure at least 1

  const handlePrev = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  const handleNext = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  const handleGoHome = () => navigate('/');

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentTodos = todos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when todos change (new todo added)
  useEffect(() => {
    setCurrentPage(1);
  }, [todos.length]);

  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <h2 className="mb-4">In-Process Todos</h2>

      {currentTodos.length === 0 && <p>No todos in process!</p>}

      {currentTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {/* Pagination */}
      {todos.length > ITEMS_PER_PAGE && ( // Only show if more than one page
        <div className="d-flex gap-2 mt-3 align-items-center">
          <button
            className="btn btn-outline-primary"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            className="btn btn-outline-primary"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Back to Home */}
      <button
        className="btn btn-secondary mt-3"
        onClick={handleGoHome}
      >
        Back to Home
      </button>
    </div>
  );
}