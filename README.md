# LeetCode-Grinder
This is a full-stack study tracker for LeetCode problems. Track progress, organize problems by category and difficulty, keep a review queue for difficult problems, and study with built in guides ranging from familiar patterns and external resources.
**Live Demo** https://leet-code-grinder.vercel.app

## Features
- **Secure Authentication** — JWT-based auth with bcrypt password hashing
- **Problem Tracking** — Full CRUD for logging LeetCode problems with title, number, difficulty, category, status, notes, and URL
- **Smart Filtering** — Filter problems by category, difficulty, and status, plus real-time search
- **Progress Stats** — Track total problems, solved count, and breakdown by difficulty
- **Review Queue** — Mark problems for review and manage them in a dedicated queue
- **Patterns Cheat Sheet** — Built-in reference for 7 common algorithm patterns
- **Curated Resources** — Study links organized by topic with type filtering

## Stack 
**Frontend:** React, Vite, React Router, Axios, Tailwind CSS
**Backend:** Node.js, Express, Prisma ORM
**Database:** PostgreSQL
**Security:** JWT, bcrypt, Helmet, express-rate-limit, input validation, IDOR protection
**Deployment:** Vercel (frontend), Render (backend), Supabase (database)

## Build Architecture 
React Frontend (Vercel) → Express REST API (Render) → PostgreSQL (Supabase)

## Security
- Passwords hashed with bcrypt
- JWT authentication on all protected routes
- Rate limiting on auth endpoints (20 requests / 15 min)
- Ownership verification on all mutations (IDOR protection)
- Input validation on all endpoints
- Security headers via Helmet
- CORS restricted to known origins

## Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL

### Backend
```bash
cd backend
npm install
# create .env with DATABASE_URL and JWT_SECRET
npx prisma migrate dev
node server.js
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Login
![Login](screenshots/login.png)

### Patterns Cheat Sheet
![Patterns](screenshots/patterns.png)

### Resources
![Resources](screenshots/resources.png)

