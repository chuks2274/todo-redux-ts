import React from 'react'; // Import React
import TodoItem from './TodoItem'; // Import TodoItem component
import { useSelector } from 'react-redux'; // Import useSelector hook from react-redux
import type { RootState } from '../store'; // Import RootState type from the store
import type { Todo, TodoStatus } from '../features/todos/types';// Import Todo and TodoStatus types

// Prop types for TodoColumn component
interface Props {
  status: TodoStatus;
  title: string;
}
// TodoColumn component to display todos of a specific status
export default function TodoColumn({ status, title }: Props) {
  // Select todos from Redux store based on status
  const todos = useSelector((state: RootState): Todo[] =>
    state.todos.todos.filter((todo: Todo) => todo.status === status)
  );
  // Render the todo column
  return (
    <div className="todo-column">
      <h3>{title}</h3>
      {todos.length === 0 && <p>No todos in this category</p>}
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}