# Todo List App (Redux Toolkit + TypeScript)

A simple **Todo List** application built with **React**, **Redux Toolkit**, and **TypeScript**.  
This project is perfect for beginners who want to **learn state management with Redux** and **practice TypeScript in React**.

---

## Features

- Add new todos
- Toggle todo completion
- Edit todo text
- Delete individual todos
- Clear all completed todos
- Filter todos by **All / Active / Completed**
- Dark / Light / Blue theme toggle
- Persistent state saved in `localStorage`

---

## Technologies Used

- **React.js** – Frontend library for building UI components
- **Redux Toolkit** – Simplified state management for React
- **TypeScript** – Adds type safety to JavaScript for better code quality
- **CSS variables** – For theme toggling and styling

---

## Learning Goals

This project is designed to help you understand:

1. **Redux Toolkit Basics**
   - How to create a `slice` for todos
   - Defining actions (`addTodo`, `toggleTodo`, `deleteTodo`, `clearCompleted`, `editTodo`)
   - Using `useDispatch` to send actions
   - Using `useSelector` to read state

2. **TypeScript Integration**
   - Typing Redux state and actions
   - Typing props in components
   - Using `interface` for Todo object

3. **React Hooks**
   - `useState` for local state (input, theme, editing)
   - `useEffect` for side effects (theme toggle, localStorage persistence)

4. **Responsive Design**
   - Flexbox for input and buttons
   - Theme toggle for accessibility

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/todo-redux-ts.git
cd todo-redux-ts