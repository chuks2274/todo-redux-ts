import React, { useState } from "react"; // Import React and useState hook for component-level state
import { useDispatch } from "react-redux"; // Import useDispatch to send actions to Redux store
// Import actions and Todo type from todosSlice
// toggleTodo → toggle completed status
// deleteTodo → remove a todo
// editTodo → update a todo's text
// Todo → TypeScript type for a single todo item
import { toggleTodo, deleteTodo, editTodo, Todo } from "../features/todos/todosSlice";
import type { AppDispatch } from "../store"; // Import AppDispatch type to type the dispatch function

// Default exported React functional component
// Receives a single todo prop typed as Todo
export default function TodoItem({ todo }: { todo: Todo }) {
  // Get typed Redux dispatch function
  const dispatch = useDispatch<AppDispatch>();

  // Local state to track if the todo is in "edit mode"
  const [isEditing, setIsEditing] = useState(false);

  // Local state to track current text when editing
  const [editText, setEditText] = useState(todo.text);

  // Handler to save the edited todo
  const handleSave = () => {
    const trimmed = editText.trim(); // remove extra spaces

    // Only dispatch edit if text changed and is not empty
    if (trimmed && trimmed !== todo.text) {
      dispatch(editTodo({ id: todo.id, newText: trimmed }));
    }

    // Reset edit mode back to false (fixes "stuck in edit mode" issue)
    setIsEditing(false);
  };

  // Function to enter edit mode and set text
  const handleEditClick = () => {
    setEditText(todo.text); // ensure latest text is in input
    setIsEditing(true); // switch to edit mode
  };

  return (
    // Each todo is a list item
    <li className="todo-item">
      <label className="todo-label">
        {/* Checkbox toggles completion status */}
        <input
          type="checkbox"
          checked={todo.completed} // bind to todo.completed
          onChange={() => dispatch(toggleTodo(todo.id))} // dispatch toggle action
        />

        {/* Conditional rendering: show input if editing, otherwise span */}
        {isEditing ? (
          <input
            value={editText} // bind input to editText state
            onChange={(e) => setEditText(e.target.value)} // update editText on change
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave(); // save on Enter key
              if (e.key === "Escape") setIsEditing(false); // cancel edit on Escape
            }}
            autoFocus // automatically focus input when editing starts
            className="todo-edit-input"
          />
        ) : (
          <span
            className={todo.completed ? "completed" : ""} // line-through if completed
            onDoubleClick={handleEditClick} // double click to edit
          >
            {todo.text} {/* display todo text */}
          </span>
        )}
      </label>

      {/* Action buttons container */}
      <div className="todo-actions">
        {isEditing ? (
          <button onClick={handleSave} className="save-button">
            Save
          </button> // Save button during editing
        ) : (
          <button onClick={handleEditClick} className="edit-button">
            Edit
          </button> // Edit button otherwise
        )}

        {/* Delete button always visible */}
        <button
          onClick={() => dispatch(deleteTodo(todo.id))}
          className="delete-button"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
