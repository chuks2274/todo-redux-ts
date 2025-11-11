// types.ts

// Optional: keep TodoStatus if you want to track different statuses
export type TodoStatus = 'pending' | 'in-process' | 'completed';

export interface Todo {
  id: string;                   // Unique ID
  title: string;                // Task title
  description?: string;         // Optional description
  completed: boolean;           // Whether task is completed
  status?: TodoStatus;          // Optional status tracking
  createdAt: number;            // Timestamp when todo was created
  dueDate: string;              // ISO string for due date/time
  reminderValue: number;        // Reminder value (number)
  reminderUnit: 'hours' | 'days'; // Reminder unit
  alertShown?: boolean;         // To avoid repeated alerts
}