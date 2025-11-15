import { configureStore } from '@reduxjs/toolkit'; // Import configureStore from Redux Toolkit
import todosReducer from './features/todos/todosSlice'; // Import todos reducer

// Configure and export the Redux store
export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
// Define RootState and AppDispatch types for use throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;