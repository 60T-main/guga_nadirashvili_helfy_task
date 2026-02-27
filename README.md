# Task Manager (Helfy Task)

## Setup / Install

- Requirements: Node.js (v18+), npm
- Backend: `cd backend && npm install`
- Frontend: `cd frontend && npm install`

## Run

- Backend: `cd backend && node server.js` (http://localhost:4000)
- Frontend: `cd frontend && npm run dev` (http://localhost:5173)

## API Docs

Base URL: `http://localhost:4000/api/tasks`

Task model:

```js
{
  (id, title, description, completed, createdAt, priority);
}
```

Endpoints:

- `GET /api/tasks`
- `POST /api/tasks` body: `{ title, description, completed, priority }`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `PATCH /api/tasks/:id/toggle`

## Assumptions / Design Decisions

- Data is in-memory (`backend/data.js`) (resets when backend restarts)
- No auth (was not required)
- Endless carousel built with React + CSS transitions (I didnt use external carousel library)
- Edit is inline in task card

## Time Spent

- Frontend: ~120 min
- Styling: ~30 min
- Backend: ~100 min
- README: ~15 min
- Total: ~180 min
