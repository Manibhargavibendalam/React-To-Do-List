# React To-Do List & Scrumboard

A small React app with a **Task list page** and a **Scrumboard page**.

- **Task page**: add, edit, delete tasks; shows tasks in a card grid.
- **Scrumboard**: Kanban-style board with columns (To Do / In Progress / Blocked / Review / Done). Drag & drop tasks between columns (if implemented).

---

## Features

- Add / edit / delete tasks
- Tasks have `title`, `description` (optional), and `status`
- Scrumboard view showing tasks grouped by status
- Persisted in `localStorage` (or swap with API)
- Example drag-and-drop support with `react-beautiful-dnd` (optional)

---

## Tech stack

- React (Create React App / Vite)
- React Router
- Context API (or Redux) for shared tasks
- Optionally `react-beautiful-dnd` or `@dnd-kit` for drag/drop
- CSS / Tailwind for styling

---

## Quick start

### Prereqs
- Node.js (LTS)
- npm or yarn

### Install & run
```bash
git clone https://github.com/Manibhargavibendalam/React-To-Do-List.git
cd React-To-Do-List/client   # adjust if code is in client/
npm install
npm start
# or
yarn
yarn start
