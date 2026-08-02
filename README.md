# Sarthak Institute - Coaching Institute Management System

A state-of-the-art full-stack web application designed for **Sarthak Institute** to manage students, courses, fee payments, attendance, online tests, results, homework, assignments, and announcements.

## Features

- **Rich Aesthetics & Responsive UI**: Vibrant gradients, glassmorphic cards, dark/light theme toggle, and smooth micro-animations.
- **Student Dashboard**: Track enrolled courses, fee payment history, daily attendance, study notes, assignments, and test results.
- **Admin Dashboard**: Comprehensive institute management including student enrollment, course catalog, fee structuring, notice publishing, and analytics charts.
- **Online Tests & Results**: Interactive online examination interface with automated scoring and analytics.
- **Secure Authentication**: JWT-based authentication with role-based access control (Student vs. Admin).
- **Payment & Receipt Generation**: Seamless fee payment workflow with instant receipt generation.

## Project Structure

```
Sarthak-Institute/
├── frontend/             # React + Vite frontend application
│   ├── public/           # Static assets (logo, favicon, banners)
│   └── src/              # Components, Pages, Layouts, Contexts, Services, Styles
├── backend/              # Node.js + Express API server
│   ├── config/           # Database, JWT, and upload configurations
│   ├── controllers/      # Route controllers for all domains
│   ├── models/           # ORM / SQL models
│   ├── routes/           # Express routes
│   ├── middleware/       # Authentication, admin check, validation, error handling
│   ├── utils/            # ID generation, receipt PDF generator, SMS/Email helpers
│   └── database/         # SQL schema and seed data
└── docs/                 # API documentation and project guides
```

## Getting Started

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend server will start at `http://localhost:5173`. By default, the frontend includes rich interactive demo data so you can preview all features immediately.

### 2. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend server runs on `http://localhost:5000` by default. Configure your `.env` and database connection in `backend/.env`.
