import React from 'react'; // Import React
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import { Provider } from 'react-redux'; // Import Provider to connect Redux store
import App from './App'; // Import main App component
import { store } from './store'; // Import Redux store
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider for authentication context
import './App.css';

// Get the root element from the HTML
const rootElement = document.getElementById('root');
// Render the React application
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
