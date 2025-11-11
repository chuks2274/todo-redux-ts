import React from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import type { RootState } from '../store';
import type { Todo, TodoStatus } from '../features/todos/types';

interface Props {
  filterStatus?: TodoStatus;
}

export default function TodoList({ filterStatus }: Props) {
  // Get all todos from Redux store
  const todos: Todo[] = useSelector((state: RootState) => state.todos);

  // Filter todos by status if filterStatus is provided
  const filteredTodos: Todo[] = filterStatus
    ? todos.filter(todo => todo.status === filterStatus)
    : todos;

  // Create a copy before sorting to avoid mutating Redux state
  const sortedTodos: Todo[] = [...filteredTodos].sort(
    (a, b) => b.createdAt - a.createdAt
  );

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