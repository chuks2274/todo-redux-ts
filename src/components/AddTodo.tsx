import React, { useState } from 'react'; // Import React and useState hook for managing component-level state
import { useDispatch } from 'react-redux';// Import the useDispatch hook to send actions to the Redux store
// Import specific action creators from your todosSlice
// addTodo → adds a new todo
// clearCompleted → removes all completed todos
import { addTodo, clearCompleted } from '../features/todos/todosSlice';
//Import the typed AppDispatch type for TypeScript safety
// This ensures dispatch knows what actions are allowed
import type { AppDispatch } from '../store';

// Default exported React functional component
export default function AddTodo() {
  // Local component state for the input field
  // "text" holds the current input value
  // "setText" updates it whenever user types
  const [text, setText] = useState('');

  // Get the Redux dispatch function, typed with AppDispatch
  // lets us safely dispatch actions defined in our slice
  const dispatch = useDispatch<AppDispatch>();

  // Handler function when form is submitted
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload on form submit

    const trimmed = text.trim(); // remove extra spaces from user input

    if (!trimmed) return; // stop if input is empty (no blank todos)

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
      {/* Added style to wrap buttons on small screens */}
      <form onSubmit={handleAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {/* Controlled input: React keeps input value in sync with state */}
        <input
          aria-label="New todo" // accessibility label for screen readers
          value={text} // input value bound to "text" state
          onChange={e => setText(e.target.value)} // update text when user types
          placeholder="What needs to be done?" // hint shown inside input box
          style={{ flex: '1 1 200px' }} // allow input to shrink/grow for responsiveness
        />

        {/* Submit button adds a new todo when clicked */}
        <button type="submit">Add</button>

        {/* Secondary button to clear all completed todos */}
        {/* type="button" prevents it from submitting the form */}
        <button type="button" onClick={() => dispatch(clearCompleted())}>
          Clear completed
        </button>
      </form>
    </div>
  );
}
