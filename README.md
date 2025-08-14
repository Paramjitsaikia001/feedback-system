# Feedback System (MERN)

An end-to-end feedback platform where students submit feedback and teachers view analytics. The project is split into a Node/Express/MongoDB backend and a React (Vite) frontend. Authentication uses JWT with httpOnly cookies. Role-Based Access Control (RBAC) is used via user roles (student, teacher, admin) to drive UI access and can be enforced at the API level.

## Features

- Authentication with JWT (httpOnly cookies)
- RBAC with roles: student, teacher, admin
- Student-facing flow to submit feedback on predefined questions
- Teacher-facing dashboards and feedback analytics (charts)
- MongoDB persistence with Mongoose models
- CORS, cookie parsing, environment-based configuration

## Tech Stack

- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, dotenv, cors, cookie-parser
- Frontend: React (Vite), React Router, Axios, Tailwind CSS, Chart.js via react-chartjs-2
- Database: MongoDB

## Project Structure

```
feedback-system/
  backend/
    src/
      app.js                # Express app setup (CORS, cookies, routes)
      server.js             # Server bootstrap + DB connection
      constaint.js          # DB name constant
      db/index.js           # Mongo connection helper
      routes/
        user.route.js       # /api/v1/users: register, login, me
        question.route.js   # /api/v1/questions: add, list
        feedback.route.js   # /api/v1/feedback: submit, statistics
      controllers/
        user.controller.js
        question.controller.js
        feedback.controller.js
      models/
        user.model.js       # Includes role field and JWT helpers
        questions.model.js
        feedback.model.js
      middlewares/
        auth.middleware.js  # verifyJWT
      utils/                # ApiError, ApiResponse, asyncHandler
  frontend/
    src/
      App.jsx               # Routes (student/teacher dashboards, analytics)
      pages/login.jsx       # Login and role-based navigation
      components/           # Student + Teacher UI
      utils/                # Shared UI components
    vite.config.js
    README.md               # Vite template (see this root README instead)
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB connection string (local or Atlas)

### 1) Backend Setup

```
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017
CORS_ORIGIN=http://localhost:5173

# JWT secrets and expiry
ACCESS_TOKEN_SECRET=replace-with-strong-secret
REFRESH_TOKEN_SECRET=replace-with-strong-secret
ACCESS_TOKEN_EXPIRES_IN=1d
REFRESH_TOKEN_EXPIRES_IN=7d
```

Run the backend (dev):

```
npm run dev
```

The server will start on `http://localhost:3000` (or the `PORT` you set) and connect to the database `feedbackDB` at `${MONGODB_URI}/feedbackDB`.

### 2) Frontend Setup

```
cd frontend
npm install
```

Create a `.env` file in `frontend/` with:

```
VITE_API_URL=http://localhost:3000
```

Run the frontend (dev):

```
npm run dev
```

The app runs at `http://localhost:5173` by default.

Note: Some components in the current code call `http://localhost:3000` directly; prefer using `VITE_API_URL` consistently when extending the UI.

## Authentication & Cookies

- Login sets two httpOnly cookies: `accessToken` and `refreshToken`.
- Protected routes require a valid `accessToken` cookie and use `verifyJWT` middleware.
- Requests from the frontend to protected routes must include `withCredentials: true` (Axios) and CORS must allow credentials.

## RBAC (Role-Based Access Control)

- Roles are defined on the user model: `student`, `teacher`, `admin`.
- The frontend uses the authenticated user’s `role` to drive navigation:
  - Students go to `/student-dashboard/...` and can submit feedback.
  - Teachers go to `/teacher-dashboard/...` and can view analytics.
- The API currently enforces authentication with `verifyJWT`. To hard-enforce RBAC at the API layer, add a role middleware and apply it to teacher/admin-only endpoints (example below).

Example role middleware to add (backend):

```js
// middlewares/role.middleware.js
export const requireRole = (...allowed) => (req, res, next) => {
  if (!req.user || !allowed.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
```

Then apply to teacher-only analytics route:

```js
import { requireRole } from '../middlewares/role.middleware.js';
router.get('/statistics', verifyJWT, requireRole('teacher', 'admin'), getFeedbackStats);
```

## API Reference

Base URL: `http://localhost:3000/api/v1`

### Auth & Users

- POST `/users/register`
  - Body: `{ fullname, email, password, universityName, role, username? }`
  - Response: created user (without password/refreshToken)

- POST `/users/login`
  - Body: `{ email | username, password }`
  - Sets cookies: `accessToken`, `refreshToken`
  - Response: `{ user, accessToken, refreshToken }`

- GET `/users/me` (Protected)
  - Cookies: `accessToken`
  - Response: current user profile

### Questions

- POST `/questions`
  - Body: `{ tittle }`
  - Response: created question

- GET `/questions`
  - Response: array of questions (most recent first)

### Feedback

- POST `/feedback` (Protected)
  - Body: `{ questionId, rating }`
  - Response: created feedback
  - Side-effect: updates the `averageRating` on the question (computed via aggregation)

- GET `/feedback/statistics` (Protected; teacher/admin recommended)
  - Response: `{ perQuestion: [...], ratingDistribution: [...] }`
  - Used by the teacher analytics page for Pie/Bar charts

## Frontend Routes

- `/login`: Authenticates and navigates based on role
- `/student-dashboard/profile`: Student dashboard
- `/student-dashboard/give-feedback`: Student feedback submission UI
- `/teacher-dashboard/profile`: Teacher dashboard
- `/teacher-dashboard/feedback-analytics`: Charts for feedback statistics

## Developer Notes

- Make sure CORS is configured to match the frontend origin and `credentials: true` is set both in CORS and axios requests.
- Keep secrets out of source control; use `.env` files.
- Prefer using `VITE_API_URL` on the frontend to avoid hard-coding the backend URL.

## Useful cURL Examples

```
# Register
curl -X POST http://localhost:3000/api/v1/users/register \
  -H 'Content-Type: application/json' \
  -d '{
    "fullname":"Alice Doe",
    "email":"alice@example.com",
    "password":"Passw0rd!",
    "universityName":"Example University",
    "role":"student"
  }'

# Login (stores cookies)
curl -i -c cookies.txt -X POST http://localhost:3000/api/v1/users/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"alice@example.com","password":"Passw0rd!"}'

# Me (send cookies)
curl -b cookies.txt http://localhost:3000/api/v1/users/me

# Add question
curl -X POST http://localhost:3000/api/v1/questions \
  -H 'Content-Type: application/json' \
  -d '{"tittle":"Explains concepts clearly"}'

# Submit feedback (authenticated)
curl -b cookies.txt -X POST http://localhost:3000/api/v1/feedback \
  -H 'Content-Type: application/json' \
  -d '{"questionId":"<QUESTION_ID>","rating":5}'

# Stats (authenticated; teacher/admin recommended)
curl -b cookies.txt http://localhost:3000/api/v1/feedback/statistics
```

## License

This project is provided as-is. Add a license here if needed.


