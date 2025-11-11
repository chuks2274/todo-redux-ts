import React from 'react';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';

export default function Home() {
  return (
    <div className="container">
      <nav className="navbar">
        <span className="navbar-brand">My Professional Todo App</span>
        <div className="navbar-links">
          <a href="/">Home</a>
          <a href="/completed">Completed</a>
          <a href="/about">About</a>
        </div>
      </nav>

      <h1>Todo List</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
}
