// Import createSlice for Redux slice, nanoid for unique IDs, and PayloadAction for typing actions
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

// Define TypeScript interface for a Todo item
export interface Todo {
  id: string;          // Unique identifier
  text: string;        // Todo description
  completed: boolean;  // Whether the todo is completed
  createdAt: number;   // Timestamp for creation
}

// Function to load saved todos from localStorage
const loadState = (): Todo[] => {
  try {
    const serialized = localStorage.getItem("todos_state"); // Get saved state
    return serialized ? JSON.parse(serialized) : []; // Parse or return empty array
  } catch {
    return []; // Return empty array on error (e.g., JSON parse error)
  }
};

// Set initial state from localStorage
const initialState: Todo[] = loadState();

// Create a Redux slice for todos
const todosSlice = createSlice({
  name: "todos",      // Name of the slice
  initialState,       // Initial state
  reducers: {         // Reducer functions
    // Add a new todo
    addTodo: {
      // Reducer receives full Todo object and pushes to state array
      reducer(state, action: PayloadAction<Todo>) {
        state.push(action.payload);
      },
      // Prepare function allows passing only text and automatically creates Todo object
      prepare(text: string) {
        return {
          payload: {
            id: nanoid(),         // Generate unique ID
            text,                 // Text from input
            completed: false,     // Default to not completed
            createdAt: Date.now() // Timestamp
          } as Todo,
        };
      },
    },

    //  Toggle completed status
    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.find((t) => t.id === action.payload); // Find todo by ID
      if (todo) todo.completed = !todo.completed; // Toggle completed
    },

    //  Delete a todo by ID
    deleteTodo(state, action: PayloadAction<string>) {
      return state.filter((t) => t.id !== action.payload); // Remove todo from state
    },

    //  Clear all completed todos
    clearCompleted(state) {
      return state.filter((t) => !t.completed); // Keep only incomplete todos
    },

    //  Edit a todo's text
    editTodo(
      state,
      action: PayloadAction<{ id: string; newText: string }>
    ) {
      const todo = state.find((t) => t.id === action.payload.id); // Find todo
      if (todo) todo.text = action.payload.newText; // Update text
    },
  },
});

//  Export actions so components can dispatch them
export const { addTodo, toggleTodo, deleteTodo, clearCompleted, editTodo } =
  todosSlice.actions;

// Export reducer to use in store
export default todosSlice.reducer;