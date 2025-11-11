// src/test-utils.tsx
import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store'; // adjust if your store is elsewhere
import { BrowserRouter } from 'react-router-dom';

export function renderWithProviders(ui: ReactNode) {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>
  );
}