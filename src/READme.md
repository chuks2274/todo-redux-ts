# Todo App (React, Redux Toolkit + TypeScript)

[Live Demo on Vercel](https://todo-redux-ts-opal.vercel.app/) | [GitHub Repo](https://github.com/chuks2274/todo-redux-ts.git)

A modern **task management application** designed to help users organize daily tasks efficiently, stay productive, and track progress visually with a Kanban-style interface. Built with **React**, **Redux Toolkit**, **TypeScript**, **Firebase Authentication**, and **Bootstrap**, fully responsive and deployed via **Vercel**.

---

## Key Benefits

1. **Efficient Task Management**
   - Create, edit, and delete tasks easily.
   - Organize tasks into **Pending, In-Process, and Completed** categories.
   - Track deadlines and reminders for better time management.

2. **Visual Kanban Board**
   - Tasks displayed in clear columns for each status.
   - Quickly see task progress at a glance.

3. **Multiple Themes**
   - Switch between **Light, Dark, and Blue** themes.
   - Persistent theme selection saved in `localStorage`.

4. **User Profile & Personalization**
   - Maintain a personal profile with editable display name.
   - Secure account deletion and password management.

5. **Responsive & User-Friendly**
   - Works seamlessly on **desktop, tablet, and mobile**.
   - Smooth animations, modals, and interactive components.

6. **Boosts Productivity**
   - Clear organization and status tracking.
   - Encourages task completion and reduces stress.

7. **Secure Access**
   - Firebase Authentication ensures private and secure tasks.
   - Protected routes using `PrivateRoute` component.

---

## Core Features

- **Add, Edit, Delete Todos** with title, description, due date, and reminder.
- **Todo Status Management**: Pending → In-Process → Completed.
- **Pagination** for long todo lists.
- **Countdown Timer** for due dates.
- **Modals**: `DeleteConfirmModal`, `EditProfileModal`, `DeleteAccountModal`.
- **Authentication**: Login, Register, Forgot Password, Logout.
- **Redux Toolkit**: Centralized state management for todos.
- **Custom Hooks**: `useAuth` for authentication state tracking.
- **Themes & Styling**: CSS variables with light, dark, and blue modes.

---

## Technology Stack

- **Frontend**: React, TypeScript, React Router, Bootstrap
- **State Management**: Redux Toolkit
- **Authentication**: Firebase Auth
- **Deployment**: Vercel (CI/CD configured via GitHub Actions)
- **Testing**: Jest, React Testing Library
- **Unique Features**: UUID for todo IDs, countdown timer, responsive Kanban UI

---

## Component Highlights

### `PrivateRoute`
Protects routes, allowing access only to authenticated users.

### `AddTodo`
Form for creating todos with title, description, due date, and reminders. Dispatches todos to Redux store and navigates users to **Pending Todos**.

### `TodoColumn` & `TodoItem`
Displays todos filtered by status, with countdown, edit, delete, and status update functionalities.

### `ProfilePage`
Manage user profile, edit display name, delete account, and view user info.

### Modals
- `DeleteAccountModal`: Confirm account deletion.
- `DeleteConfirmModal`: Confirm todo deletion.
- `EditProfileModal`: Update display name.

---

## Getting Started

### Clone the repository
```bash
git clone https://github.com/chuks2274/todo-redux-ts.git
cd todo-redux-ts
npm install
npm run dev