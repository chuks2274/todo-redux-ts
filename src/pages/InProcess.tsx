import React, { useState, useEffect, useMemo } from 'react'; // Import React and necessary hooks
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { useSelector } from 'react-redux'; // Import useSelector to access Redux store
import TodoItem from '../components/TodoItem'; // Import TodoItem component
import type { RootState } from '../store'; // Import RootState type from the store

// Number of todos to display per page
const ITEMS_PER_PAGE = 5; 

// In-Process todos page component
export default function InProcessPage() {
  // Initialize navigation
  const navigate = useNavigate();

  // Get all todos from Redux store
  const todos = useSelector((state: RootState) => state.todos.todos);

  // Memoize filtered + sorted todos
  const inProcessTodos = useMemo(() => {
    return todos
      .filter(todo => todo.status === 'in-process')
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [todos]);
  // State for current page
  const [currentPage, setCurrentPage] = useState(1);
  // Calculate total pages
  const totalPages = Math.max(Math.ceil(inProcessTodos.length / ITEMS_PER_PAGE), 1);  
  // Handlers for pagination and navigation
  const handlePrev = () => setCurrentPage(prev => (prev > 1 ? prev - 1 : prev));
  const handleNext = () => setCurrentPage(prev => (prev < totalPages ? prev + 1 : prev));
  const handleGoHome = () => navigate('/');
  
  // Calculate starting index for current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  // Memoize current page slice of todos
  const currentTodos = useMemo(() => {
    return inProcessTodos.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [inProcessTodos, startIndex]); 

  // Reset to page 1 when todos change (new todo added)
  useEffect(() => {
    setCurrentPage(1); 
  }, [inProcessTodos.length]);
  // Render the in-process todos page
  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      <h2 className="mb-4">In-Process Todos</h2>

      {currentTodos.length === 0 && <p>No todos in process!</p>}

      {currentTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}

      {/* Pagination */}
      {inProcessTodos.length > ITEMS_PER_PAGE && ( // Only show if more than one page
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