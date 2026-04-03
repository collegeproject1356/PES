# PerformX — Project Complete Overview

## 📌 Project Ka Naam
**PerformX** — Performance Evaluation System

---

## 🎯 Project Kya Hai?
PerformX ek **Employee Performance Evaluation System** hai jo ek company ke andar 3 types ke users ke beech kaam karta hai:
- **Admin** — Poore system ka malik, cycles aur users manage karta hai
- **Manager** — Team ke goals set karta hai, evaluations review karta hai
- **Employee** — Apni self-evaluation deta hai, apne goals aur feedback dekh sakta hai

---

## 🏗️ Tech Stack (MERN)

| Layer | Technology |
|-------|-----------|
| Frontend Framework | **React 19** (Vite) |
| Styling | **Tailwind CSS v4** |
| Animations | **Framer Motion** |
| Icons | **Lucide React** + React Icons |
| Routing | **React Router DOM v7** |
| HTTP Requests | **Axios** |
| Google Login (Frontend) | **@react-oauth/google** |
| Backend Runtime | **Node.js** |
| Backend Framework | **Express.js v5** |
| Database | **MongoDB** (via Mongoose) |
| Password Hashing | **bcryptjs** |
| Authentication | **JWT (jsonwebtoken)** |
| Email Service | **Nodemailer** |
| Google Login (Backend) | **google-auth-library** |
| Environment Variables | **dotenv** |
| Dev Server | **Nodemon** |
| Build Tool | **Vite** |

---

## ⚙️ Functionalities aur unke liye kya use kiya

### 1. 🔐 Authentication System
**Kya hai:** Register, Login, Logout

**Kaise implement kiya:**
- `JWT (jsonwebtoken)` — Login ke baad ek token generate hota hai jo frontend mein `localStorage` mein save hota hai
- `bcryptjs` — Password ko database mein save karne se pehle hash kiya jaata hai (secure storage)
- `AuthContext` (React Context API) — Poore frontend mein user ka logged-in state manage karta hai
- `ProtectedRoute` component — Bina login ke koi page access nahi hota
- `react-router-dom` — Role ke hisaab se `/admin`, `/manager`, `/employee` routes pe redirect karta hai

---

### 2. 🌐 Google Login
**Kya hai:** Google account se directly login / register

**Kaise implement kiya:**
- Frontend mein `@react-oauth/google` — Google ka OAuth button render karta hai
- Backend mein `google-auth-library` — Google ka token verify karta hai
- Verify hone ke baad `JWT` token generate karke frontend ko deta hai

---

### 3. 📩 Forgot Password / Reset Password
**Kya hai:** Email pe reset link bhejna, us link se naya password set karna

**Kaise implement kiya:**
- `Nodemailer` — Email send karta hai (Gmail ya koi bhi SMTP service use karke)
- `crypto` (Node.js built-in) — Unique reset token generate hota hai
- Token database mein save hota hai with expiry time
- Frontend mein `ResetPassword.jsx` page hai jahan naya password enter karte hain

---

### 4. 👤 User Management (Admin)
**Kya hai:** Admin Manager aur Employee accounts bana sakta hai, delete kar sakta hai

**Kaise implement kiya:**
- `Mongoose` User model — `name, email, password, role` fields hain
- `bcryptjs` — Naye user ka password hash hokar save hota hai
- `restrictTo('Admin')` middleware — Sirf Admin hi ye API call kar sakta hai
- Frontend mein `ManageUsers.jsx` page hai jisme table aur form hai

---

### 5. 📅 Evaluation Cycles (Admin)
**Kya hai:** Admin evaluation periods (Q1, Q2, etc.) create/edit/delete karta hai

**Kaise implement kiya:**
- `Mongoose` Cycle model — `name, startDate, endDate, isActive` fields
- CRUD APIs — POST, GET, PUT, DELETE `/api/cycles`
- Frontend mein `ManageCycles.jsx` — Animated form aur table hai

---

### 6. 🎯 Goal Setting (Manager)
**Kya hai:** Manager apni team ke employees ko goals assign karta hai

**Kaise implement kiya:**
- `Mongoose` Goal model — `employeeId, cycleId, title, description, status` fields
- Manager ke assigned goals `getManagerAssignedGoals` se fetch hote hain
- Frontend mein `SetGoals.jsx` — Goal form, aur
- `GoalRegistry.jsx` — Saare assigned goals ki list with edit/delete
- `EmployeeList.jsx` — Team ki directory

---

### 7. 📋 Self Evaluation (Employee)
**Kya hai:** Employee apni performance ka self-assessment submit karta hai

**Kaise implement kiya:**
- `Mongoose` Evaluation model — `employeeId, cycleId, selfEvaluation, managerFeedback, rating, status` fields
- `POST /api/evaluations/self-eval` — Employee apna form submit karta hai
- Frontend mein `SelfEvaluation.jsx` — Text form with cycle selection

---

### 8. ⭐ Review & Rating (Manager)
**Kya hai:** Manager employee ki evaluation review karta hai, rating aur feedback deta hai

**Kaise implement kiya:**
- `PUT /api/evaluations/:id/review` — Manager feedback + rating save karta hai, status "Approved" ho jaata hai
- Frontend mein `ReviewEvaluations.jsx` — Table + modal form

---

### 9. 📊 Performance Reports (Admin)
**Kya hai:** Admin saari evaluations dekh sakta hai, CSV export kar sakta hai

**Kaise implement kiya:**
- `GET /api/evaluations/all` — Saari evaluations fetch karta hai
- CSV export: Pure JavaScript se `Blob` + `URL.createObjectURL` se download hota hai (koi external library nahi)
- Frontend mein `Reports.jsx` — Table + detail popup modal

---

### 10. 👀 Employee Dashboard
**Kya hai:** Employee apne goals, evaluations aur feedback dekh sakta hai

**Kaise implement kiya:**
- `GET /api/goals/my-goals` — Apne assigned goals
- `GET /api/evaluations/my-evaluations` — Apni submitted evaluations
- Frontend mein `EmployeeDashboard.jsx`, `EmployeeGoals.jsx`, `EmployeeFeedback.jsx`

---

### 11. 🎨 UI & Animations
**Kya hai:** Premium, smooth, animated interface

**Kaise implement kiya:**
- `Framer Motion` — Page transitions, card animations, staggered list effects, AnimatePresence for mount/unmount
- `Tailwind CSS v4` — Utility-first styling, glassmorphism (`backdrop-blur`, `bg-white/70`), responsive design
- `Lucide React` — Clean icon library (sidebar icons, action buttons)
- `React Icons` — Additional icon sets (Google icon for OAuth button)
- `Outfit` + `Inter` fonts (Google Fonts) — Typography

---

### 12. 🔀 Routing & Layouts
**Kya hai:** Role-based separate dashboards and navigation

**Kaise implement kiya:**
- `react-router-dom v7` — Nested routes with layout components
- `AdminLayout.jsx`, `ManagerLayout.jsx`, `EmployeeLayout.jsx` — Sidebar + Outlet pattern
- `ProtectedRoute.jsx` — Role check, unauthorized access block
- `Navbar.jsx` — Public pages pe common navigation

---

### 13. 🌐 API Communication
**Kya hai:** Frontend ka backend se data lena aur bhejana

**Kaise implement kiya:**
- `Axios` — HTTP client, `axiosConfig.js` mein base URL aur JWT interceptor configured hai
- Har request pe automatically `Authorization: Bearer <token>` header lagta hai

---

## 🗄️ Database Models (MongoDB)

| Model | Fields | Purpose |
|-------|--------|---------|
| **User** | name, email, password, role, resetToken, resetTokenExpiry | Authentication + Role-based access |
| **Cycle** | name, startDate, endDate, isActive | Evaluation periods |
| **Goal** | employeeId, managerId, cycleId, title, description, status | Performance targets |
| **Evaluation** | employeeId, managerId, cycleId, selfEvaluation, managerFeedback, rating, status | Appraisal records |

---

## 📁 Folder Structure

```
PES/
├── backend/
│   ├── config/         → MongoDB connection
│   ├── controllers/    → Business logic (auth, users, goals, cycles, evaluations)
│   ├── middlewares/    → JWT protect + role-based restrictTo
│   ├── models/         → Mongoose schemas
│   ├── routes/         → API route definitions
│   ├── utils/          → sendEmail helper
│   └── server.js       → Express app entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── auth/       → ProtectedRoute
        │   ├── layout/     → Admin/Manager/Employee layouts + Navbar + Footer
        │   └── shared/     → ScrollReveal
        ├── context/        → AuthContext (global auth state)
        ├── pages/
        │   ├── admin/      → AdminDashboard, ManageCycles, ManageUsers, Reports
        │   ├── manager/    → ManagerDashboard, SetGoals, GoalRegistry, EmployeeList, ReviewEvaluations
        │   └── employee/   → EmployeeDashboard, EmployeeGoals, EmployeeFeedback, SelfEvaluation
        ├── utils/          → axiosConfig.js
        └── App.jsx         → All routes defined here



