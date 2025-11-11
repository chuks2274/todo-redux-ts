import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TodoItem from '../components/TodoItem';
import type { RootState } from '../store';

const ITEMS_PER_PAGE = 5; // Adjust how many todos per page

export default function CompletedPage() {
  const navigate = useNavigate();

  // Filter todos with status 'completed' and sort newest on top
  const todos = useSelector((state: RootState) =>
    state.todos.todos
      .filter(todo => todo.status === 'completed')
      .sort((a, b) => b.createdAt - a.createdAt)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);

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
      <h2 className="mb-4">Completed Todos</h2>

      {currentTodos.length === 0 && <p>No completed todos!</p>}

      {currentTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
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
