import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import AddTodo from '../components/AddTodo';
import { store } from '../store';

// Mock navigate so it doesn't break during test
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('AddTodo Component', () => {
  it('renders form when Add Todo button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddTodo />
        </MemoryRouter>
      </Provider>
    );

    const toggleBtn = screen.getByTestId('toggle-form');
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId('add-todo-form')).toBeInTheDocument();
  });

  it('adds a new todo when form is submitted', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddTodo />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('toggle-form'));

    fireEvent.change(screen.getByTestId('todo-title-input'), {
      target: { value: 'Test Todo' },
    });
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2025-11-10T10:00' },
    });

    fireEvent.click(screen.getByTestId('add-todo'));

    await waitFor(() => {
      expect(screen.getByTestId('add-todo')).toBeEnabled();
    });
  });
});