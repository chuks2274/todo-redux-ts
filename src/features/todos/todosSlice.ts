import { createSlice, PayloadAction } from '@reduxjs/toolkit'; // Import necessary functions from Redux Toolkit
import { Todo } from './types'; // Import Todo type

// Function to load todos from localStorage
const loadTodos = (): Todo[] => {
  try {
    // Retrieve and parse todos from localStorage
    const stored = localStorage.getItem('todos');
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  } catch {
    return [];
  }
};

// Define the shape of the todos state
interface TodosState {
  todos: Todo[];
}
// initial state with todos loaded from localStorage
const initialState: TodosState = {
  todos: loadTodos(),
};
// Create the todos slice with reducers for various actions
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add a new todo
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    // Toggle the completion status of a todo
    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    // Mark the alert as shown for a todo
    markAlertShown: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) todo.alertShown = true;
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    // Remove a todo by id
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    // Update a todo's details
    updateTodo: (
      state,
      action: PayloadAction<{
        id: string;
        title?: string;
        description?: string;
        dueDate?: string;
        reminderValue?: number;
        reminderUnit?: 'hours' | 'days';
        status?: Todo['status'];
      }>
    ) => {
      // Find the todo to update
      const todo = state.todos.find(t => t.id === action.payload.id);
      if (todo) {
        if (action.payload.title !== undefined) todo.title = action.payload.title;
        if (action.payload.description !== undefined) todo.description = action.payload.description;
        if (action.payload.dueDate !== undefined) todo.dueDate = action.payload.dueDate;
        if (action.payload.reminderValue !== undefined) todo.reminderValue = action.payload.reminderValue;
        if (action.payload.reminderUnit !== undefined) todo.reminderUnit = action.payload.reminderUnit;
        if (action.payload.status !== undefined) todo.status = action.payload.status;
        todo.alertShown = false; // reset alert when updated
      }
      // Save updated todos to localStorage
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    // Clear all completed todos
    clearCompleted: (state) => {
      state.todos = state.todos.filter(t => !t.completed);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
});
// Export actions and reducer
export const { addTodo, toggleComplete, markAlertShown, removeTodo, updateTodo, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
