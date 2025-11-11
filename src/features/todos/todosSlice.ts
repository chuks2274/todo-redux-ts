// todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from './types';

// Load todos safely from localStorage
const loadTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem('todos');
    return stored ? (JSON.parse(stored) as Todo[]) : [];
  } catch {
    return [];
  }
};

// Initial state
interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: loadTodos(),
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },

    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },

    markAlertShown: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) todo.alertShown = true;
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },

    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },

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
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },

    clearCompleted: (state) => {
      state.todos = state.todos.filter(t => !t.completed);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, toggleComplete, markAlertShown, removeTodo, updateTodo, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
