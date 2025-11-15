import { render, screen, fireEvent, waitFor } from '@testing-library/react'; // Import necessary testing utilities
import { Provider } from 'react-redux'; // Import Provider to connect Redux store
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for routing in tests
import AddTodo from '../components/AddTodo'; // Import the AddTodo component to be tested
import { store } from '../store'; // Import the Redux store

// Mock navigate so it doesn't break during test
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));
// Test suite for AddTodo component
describe('AddTodo Component', () => {
  it('renders form when Add Todo button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddTodo />
        </MemoryRouter>
      </Provider>
    );
    // Initially, the form should not be in the document
    const toggleBtn = screen.getByTestId('toggle-form');
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId('add-todo-form')).toBeInTheDocument();
  });
  // Test for adding a new todo
  it('adds a new todo when form is submitted', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AddTodo />
        </MemoryRouter>
      </Provider>
    );
    // OPen the form
    fireEvent.click(screen.getByTestId('toggle-form'));

    fireEvent.change(screen.getByTestId('todo-title-input'), {
      target: { value: 'Test Todo' },
    });
    fireEvent.change(screen.getByLabelText(/Due Date/i), {
      target: { value: '2025-11-10T10:00' },
    });

    fireEvent.click(screen.getByTestId('add-todo'));
    // Wait for the loading state to finish
    await waitFor(() => {
      expect(screen.getByTestId('add-todo')).toBeEnabled();
    });
  });
});