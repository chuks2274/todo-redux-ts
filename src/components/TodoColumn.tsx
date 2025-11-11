import React from 'react';
import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { Todo, TodoStatus } from '../features/todos/types';

interface Props {
  status: TodoStatus;
  title: string;
}

export default function TodoColumn({ status, title }: Props) {
  // Correctly select the todos array and type it
  const todos = useSelector((state: RootState): Todo[] =>
    state.todos.todos.filter((todo: Todo) => todo.status === status)
  );

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