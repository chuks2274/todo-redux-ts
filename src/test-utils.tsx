import React, { ReactNode } from 'react'; // Import React and ReactNode type
import { render } from '@testing-library/react'; // Import render method from Testing Library
import { Provider } from 'react-redux'; // Import Provider to connect Redux store
import { store } from './store'; // Import Redux store
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing

// Custom render function to include Redux Provider and Router
export function renderWithProviders(ui: ReactNode) {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}