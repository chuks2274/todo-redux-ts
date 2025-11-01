// src/App.jsx
import React, { useState, useEffect } from "react"; // Import React and hooks from React library
import AddTodo from "./components/AddTodo"; // Import the AddTodo component (form to add new todos)
import TodoList from "./components/TodoList"; // Import the TodoList component (renders the list of todos)

// Default export of the App component
export default function App() {
  // useState hook to store the current theme as a string
  // Initial theme is "light"
  // We'll cycle between "light", "dark", and "blue"
  const [theme, setTheme] = useState("light");

  // useEffect hook runs whenever 'theme' changes
  // Updates the body's 'data-theme' attribute
  // This is used in CSS to switch styles based on theme
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]); // dependency array: runs effect only when 'theme' changes

  // Function to cycle through themes on button click
  const toggleTheme = () => {
    setTheme(prev =>
      prev === "light" ? "dark" : prev === "dark" ? "blue" : "light"
    );
  };

  // Render the component
  return (
    // Main container div
    <div className="container">
      {/* Header section with centered title and right-aligned theme button */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        {/* Empty div to balance layout (keeps title centered) */}
        <div style={{ width: "100px" }}></div>

        {/* Page heading centered */}
        <h1 style={{ textAlign: "center", flexGrow: 1 }}>
          Todo List (Redux Toolkit + JS)
        </h1>

        {/* Theme toggle button aligned to the right */}
        <button onClick={toggleTheme} className="theme-toggle">
          {/* Display icon and label depending on current theme */}
          {theme === "light"
            ? "☀️ Light"
            : theme === "dark"
            ? "🌙 Dark"
            : "💙 Blue"}
        </button>
      </div>

      {/* Render the AddTodo form */}
      <AddTodo />

      {/* Render the list of todos */}
      <TodoList />
    </div>
  );
}