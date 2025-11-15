import React, { useState, useEffect, useMemo } from 'react'; // Import React and necessary hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import TodoItem from '../components/TodoItem'; // Import TodoItem component
import type { RootState } from '../store'; // Import RootState type from the store

// Number of todos to display per page
const ITEMS_PER_PAGE = 5; 

// Completed todos page component
export default function CompletedPage() {
  // Initialize navigation
  const navigate = useNavigate();

  // Get all todos from Redux store
  const todos = useSelector((state: RootState) => state.todos.todos);

  // Memoize filtered + sorted todos
  const completedTodos = useMemo(() => {
    return todos
      .filter(todo => todo.status === 'completed')
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [todos]);
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate total pages
  const totalPages = Math.ceil(completedTodos.length / ITEMS_PER_PAGE);
  // Handlers for pagination and navigation
  const handlePrev = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  const handleNext = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  const handleGoHome = () => navigate('/');
  // Calculate starting index for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Memoize current page slice of todos
  const currentTodos = useMemo(() => {
    return completedTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [completedTodos, startIndex]); 

  // Reset to page 1 when todos change (new todo added)
  useEffect(() => {
    setCurrentPage(1);
  }, [completedTodos.length]);

  // Render the completed todos page
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