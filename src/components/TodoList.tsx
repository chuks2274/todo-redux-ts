import React, { useState } from 'react'; // Import React and useState hook for component-level state
import { useSelector } from 'react-redux'; // Import useSelector hook to access Redux store state
import type { RootState } from '../store'; // Import RootState type for TypeScript to know the shape of your store
import TodoItem from './TodoItem'; // Import TodoItem component to render each individual todo
import type { Todo } from '../features/todos/types'; // Import Todo type to type each todo object


// Define filter type for TypeScript
// Only allows these three string values
type Filter = 'All' | 'Active' | 'Completed';

// Default exported functional component
export default function TodoList() {
  // Access the list of todos from Redux state
  const todos = useSelector((state: RootState) => state.todos);

  // Local state to track which filter is active
  const [filter, setFilter] = useState<Filter>('All'); // default: All

  // Compute filtered todos based on the selected filter
  const filteredTodos = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed; // show only incomplete
    if (filter === 'Completed') return todo.completed; // show only completed
    return true; // show all todos
  });

  // Show a message if there are no todos
  if (todos.length === 0) return <p>No todos yet. Add one above.</p>;

  return (
    <div className="todo-list-container">
      {/* Filter buttons section */}
      <div className="filter-buttons">
        {(['All', 'Active', 'Completed'] as Filter[]).map(f => (
          <button
            key={f} // unique key for each filter button
            className={`filter-button ${filter === f ? 'active' : ''}`} // highlight active filter
            onClick={() => setFilter(f)} // change active filter on click
          >
            {f} {/* display filter name */}
          </button>
        ))}
      </div>

      {/* Render list of todos based on current filter */}
      <ul className="todo-list">
        {filteredTodos.map((todo: Todo) => (
          // Render each todo using TodoItem component
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}