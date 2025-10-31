// Define a TypeScript interface for a single Todo item
export interface Todo {
  id: string;          // Unique identifier for each todo (used for updates/deletes)
  text: string;        // The content or description of the todo
  completed: boolean;  // Tracks whether the todo is completed (true/false)
  createdAt: number;   // Timestamp (in milliseconds) when the todo was created
}