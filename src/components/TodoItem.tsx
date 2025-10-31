import React, { useState } from "react"; // Import React and useState hook for component-level state
import { useDispatch } from "react-redux"; // Import useDispatch to send actions to Redux store
//Import actions and Todo type from todosSlice
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

    //  Exit editing mode after saving
    setIsEditing(false);
  };

  return (
    //  Each todo is a list item
    <li className="todo-item">
      <label>
        {/*  Checkbox toggles completion status */}
        <input
          type="checkbox"
          checked={todo.completed} // bind to todo.completed
          onChange={() => dispatch(toggleTodo(todo.id))} // dispatch toggle action
        />

        {/*  Conditional rendering: show input if editing, otherwise span */}
        {isEditing ? (
          <input
            value={editText} // bind input to editText state
            onChange={(e) => setEditText(e.target.value)} // update editText on change
            onBlur={handleSave} // save when input loses focus
            onKeyDown={(e) => e.key === "Enter" && handleSave()} // save on Enter key
            autoFocus // automatically focus input when editing starts
          />
        ) : (
          <span
            className={todo.completed ? "completed" : ""} // line-through if completed
            onDoubleClick={() => setIsEditing(true)} // double click to edit
          >
            {todo.text} {/* display todo text */}
          </span>
        )}
      </label>

      {/*  Action buttons for editing and deleting */}
      <div>
        {isEditing ? (
          <button onClick={handleSave}>Save</button> // Save button during editing
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button> // Edit button otherwise
        )}

        {/*  Delete button always visible */}
        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
      </div>
    </li>
  );
}