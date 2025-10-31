// src/main.jsx
import React from 'react'; // Import React library
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client for React 18+ rendering
import { Provider } from 'react-redux'; // Import Provider to connect Redux store to the React app
import { store } from './store'; // Import the Redux store we created
import App from './App'; // Import the main App component
import './App.css'; // Import global CSS file for styling

//Persist state to localStorage whenever the Redux store changes
store.subscribe(() => {
  try {
    // Get the current state from Redux store
    const state = store.getState();
    // Save only the todos array to localStorage as a JSON string
    localStorage.setItem('todos_state', JSON.stringify(state.todos));
  } catch (error) {
    // If saving fails, log the error to console
    console.error('Failed to save todos to localStorage:', error);
  }
});

// Get the root DOM element where React will render the app
const rootElement = document.getElementById('root');

// Check if the root element exists
if (rootElement) {
  // Create a React root and render the app inside <Provider>
  // Provider makes the Redux store available to all child components
  createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  // If root element not found, log an error
  console.error('Root element not found');
}
