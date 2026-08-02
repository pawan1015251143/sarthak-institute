# Sarthak Institute - API Documentation

Base URL: `http://localhost:5000/api`

All secure endpoints require the Authorization header:
`Authorization: Bearer <JWT_TOKEN>`

---

## 1. Authentication Endpoints (`/auth`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/auth/login` | Student login with `studentId` and `password` | No |
| POST | `/auth/admin-login` | Admin login with `email` and `password` | No |
| GET | `/auth/me` | Get currently logged-in user profile | Yes (JWT) |
| POST | `/auth/first-login-profile` | Complete profile after first login and lock profile | Yes (Student) |

---

## 2. Student Endpoints (`/students`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/students` | Get all students (filter by class, status) | Yes (Admin) |
| GET | `/students/:id` | Get student by ID | Yes (Admin/Student) |
| POST | `/students/register` | Admin/public student registration | Yes (Admin/Public) |
| POST | `/students/request-profile-edit` | Submit profile edit request | Yes (Student) |
| PUT | `/students/:id/approve-edit` | Approve student profile edit request | Yes (Admin) |
| PUT | `/students/:id` | Update student profile (if approved) | Yes (Admin/Student) |

---

## 3. Courses Endpoints (`/courses`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/courses` | List all courses (Class 10, 11 Science/Commerce/Arts, 12) | No |
| GET | `/courses/:id` | Get single course details | No |
| POST | `/courses` | Create new course | Yes (Admin) |
| PUT | `/courses/:id` | Update course details | Yes (Admin) |
| DELETE | `/courses/:id` | Delete a course | Yes (Admin) |

---

## 4. Fee & Payment Endpoints (`/fees`, `/payments`, `/receipts`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/fees` | Get fee structure (Monthly Fee, Yearly Fee) | No |
| POST | `/payments` | Process fee payment (UPI, Cash, Bank Transfer) | Yes |
| GET | `/payments/history` | Get student payment history | Yes (Student/Admin) |
| GET | `/receipts/:id` | Get receipt details by receipt number | Yes |
| GET | `/receipts/:id/pdf` | Generate and download receipt PDF | Yes |

---

## 5. Academic Endpoints (`/notes`, `/tests`, `/results`, `/attendance`, `/homework`, `/assignments`, `/notices`, `/gallery`, `/contact`)

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/notes` | Get study notes filtered by Class -> Subject -> Chapter | Yes |
| POST | `/notes` | Upload new study note PDF | Yes (Admin) |
| GET | `/tests` | Get active online MCQ tests | Yes |
| POST | `/tests` | Create new MCQ online test | Yes (Admin) |
| POST | `/tests/:id/submit` | Submit test answers & calculate score/rank | Yes (Student) |
| GET | `/results` | Get student results (Subject-wise, percentage, rank) | Yes |
| GET | `/notices` | Get notice board announcements | No/Yes |
| GET | `/gallery` | Get campus and achievement photos | No |
| POST | `/contact` | Submit contact form message | No |
