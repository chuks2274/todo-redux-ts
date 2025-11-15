import React from 'react'; // Import React
import { useSelector } from 'react-redux'; // Import useSelector hook from react-redux
import TodoItem from './TodoItem'; // Import TodoItem component
import type { RootState } from '../store'; // Import RootState type from the store
import type { Todo, TodoStatus } from '../features/todos/types'; // Import Todo and TodoStatus types

// Prop types for TodoList component
interface Props {
  filterStatus?: TodoStatus;
}
// TodoList component to display a list of todos, optionally filtered by status
export default function TodoList({ filterStatus }: Props) {
  // Select todos from Redux store
  const todos: Todo[] = useSelector(
    (state: RootState) => state.todos.todos
  );

  // Filter todos by status if filterStatus is provided
  const filteredTodos: Todo[] = filterStatus
    ? todos.filter(todo => todo.status === filterStatus)
    : todos;

  // Sort todos by creation date (newest first)
  const sortedTodos: Todo[] = [...filteredTodos].sort(
    (a, b) => b.createdAt - a.createdAt
  );
  // Render the todo list
  return (
    <ul className="todo-list list-group">
      {sortedTodos.length === 0 && (
        <li className="list-group-item text-muted">No todos here</li>
      )}
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}