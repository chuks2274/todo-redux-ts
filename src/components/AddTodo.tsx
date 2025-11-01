import React, { useState } from 'react'; // Import React and useState hook for managing component-level state
import { useDispatch } from 'react-redux'; // Import the useDispatch hook to send actions to the Redux store
import { addTodo, clearCompleted } from '../features/todos/todosSlice'; // Import Redux actions
import type { AppDispatch } from '../store'; // Typed dispatch for TypeScript safety

// Default exported React functional component
export default function AddTodo() {
  // Local component state for the input field
  // "text" holds the current input value
  // "setText" updates it whenever user types
  const [text, setText] = useState('');

  // Get the Redux dispatch function, typed with AppDispatch
  // Lets us safely dispatch actions defined in our slice
  const dispatch = useDispatch<AppDispatch>();

  // Handler function when form is submitted
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit
    const trimmed = text.trim(); // Remove extra spaces from user input
    if (!trimmed) return; // Stop if input is empty (no blank todos)

    // Dispatch addTodo action to Redux store
    // This will trigger the reducer to add the new todo
    dispatch(addTodo(trimmed));

    // Reset input field back to empty after adding
    setText('');
  };

  // JSX returned by this component
  return (
    <div className="add-todo">
      {/* Wrap the input and buttons inside a form element */}
      <form className="add-todo-form" onSubmit={handleAdd}>
        {/* Controlled input: React keeps input value in sync with state */}
        <input
          aria-label="New todo" // Accessibility label for screen readers
          value={text} // Input value bound to "text" state
          onChange={e => setText(e.target.value)} // Update text when user types
          placeholder="What needs to be done?" // Hint shown inside input box
          className="add-todo-input" // CSS class for styling
        />

        {/* Container for buttons */}
        <div className="add-todo-buttons">
          {/* Submit button adds a new todo when clicked */}
          <button type="submit" className="add-button">
            Add
          </button>

          {/* Secondary button to clear all completed todos */}
          {/* type="button" prevents it from submitting the form */}
          <button
            type="button"
            onClick={() => dispatch(clearCompleted())}
            className="clear-button"
          >
            Clear Completed
          </button>
        </div>
      </form>
    </div>
  );
}