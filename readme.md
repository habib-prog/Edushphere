# 🎓 Edusphere - Student Management System

[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?logo=docker&logoColor=white)](https://www.docker.com/)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2020.0.0-blue.svg)](https://nodejs.org)
[![Express Version](https://img.shields.io/badge/express-v5.2.1-green.svg)](https://expressjs.com/)
[![Database](https://img.shields.io/badge/database-MongoDB-brightgreen.svg)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

**Edusphere** is a robust, **Dockerized**, role-based Student Management System and Educational ERP API designed to streamline academic operations. Leveraging a high-performance **Redis** caching layer for optimal speed, it provides comprehensive portals for **Admins**, **Teachers**, and **Students**, allowing smooth coordination of classes, results, attendance, notices, and user requests.

---

## 🚀 Tech Stack

- **Containerization:** Docker
- **Runtime Environment:** Node.js (ES Modules)
- **Backend Framework:** Express.js (v5)
- **Database:** MongoDB & Mongoose (ODM)
- **Caching & Message Broker:** Redis
- **Authentication & Security:** JWT (JSON Web Tokens) & BcryptJS
- **Validation:** Zod
- **Testing Framework:** Vitest
- **Email Service:** Nodemailer
- **CORS Utility:** CORS for cross-origin resource sharing

---

## 🛠️ System Features

### 🔑 Core Authentication & Communication

- **Notice Board (CRUD):** Create, read, update, and delete announcements. Includes social features:
  - **Likes** on notices
  - **Comments** thread on notices
- **Authentication System:**
  - **Registration** with role definition and secure password hashing using **Bcrypt**
  - **Secure Login** with JWT generation
  - **Logout** session termination
- **Batch Management (CRUD):** Organize students and courses into distinct study batches.
- **Teacher Assignment:** Dynamically assign educators to specific student batches.

---

## 👥 Role-Based Portals & Capabilities

### 🛡️ Admin Dashboard

The Admin portal manages the complete directory of teachers, students, and batch assignments:

- **Student Management:**
  - **Add Student:** Secure creation requiring `{email, phone, password}`.
  - **Student List & Filter:** Fetch list with batch-wise filtering options.
  - **Edit Student Details:** Modify academic or personal details.
  - **Delete Student:** Remove inactive or graduated student records.
  - **Student Search:** Search students by name, email, or registry ID.
- **Approval System:**
  - **Manage Pending Requests:** Review registration requests, with features to **Accept** or **Delete** pending accounts.
- **Teacher Management:**
  - **Add Teacher:** Set up educator profiles.
  - **Teacher Directory:** List all active teachers.
  - **Edit / Delete Teacher:** Manage teaching staff profiles and access levels.
- **Administrative Outputs:**
  - **Student ID Card Generation:** Print-ready template formatting.
  - **Result Sheet Printing:** Generate print-ready transcripts for batches or individuals.
- **Feedback Collection:**
  - **Review Reader:** Read and analyze feedback submitted by students.

---

### 🧑‍🏫 Teacher Dashboard

Features tailored for teachers to evaluate performance and track student progress:

- **Attendance Tracking:**
  - Mark daily/weekly **Student Attendance** for assigned batches.
- **Performance Evaluation:**
  - **Result Sheet Input:** Add, edit, and publish grades and exam scores.
  - **Student Performance Assessment:** Evaluate and comment on student progress.

---

### 🎓 Student Portal

A personalized panel for students to manage their academic life:

- **Profile Management (CRUD):** Keep personal profile details up-to-date.
- **Academic Viewer:**
  - **View Results:** Check grades and download/print official result sheets.
  - **Attendance Analytics:** Interactive visual charts tracking attendance records over semesters.
- **Tuition & Payments:**
  - Online portal integration to track and complete school fee payments.
- **Review & Feedback:**
  - **Feedback Creator:** Create and submit experience reviews/feedback to the administration.
- **Access Control:**
  - Registration & Login with required fields: `{email, phone, password}`.

---

## 📂 Project Structure

```bash
├── server.js               # Entry point of the application
├── package.json            # Dependencies and scripts configuration
├── .gitignore              # Ignored files (node_modules, .env, etc.)
└── src/
    ├── config/             # DB and system configurations
    ├── constant/           # Constants (Roles: student, teacher, admin)
    ├── controllers/        # Request handlers (Auth, Student, Teacher, Admin)
    ├── middlewares/        # Authentication and authorization guards
    ├── models/             # Mongoose schemas (User, Notice, Batch, etc.)
    ├── routes/             # Express API routing
    └── services/           # Business logic layer
```

---

## ⚙️ Installation & Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/habib-prog/edusphere.git
   cd edusphere
   ```

2. **Start Redis with Docker:**

   ```bash
   docker compose up -d redis
   docker compose ps
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Set Up Environment Variables:**
   Create a `.env` file in the root directory:

   ```env
   PORT=8000
   NODE_ENV=development

   DATABASE=mongodb://127.0.0.1:27017/edusphere

   JWT_ACCESS_SECRET=your_access_token_secret
   JWT_REFRESH_SECRET=your_refresh_token_secret
   ACCESS_TOKEN_EXPIRES_IN=15m
   REFRESH_TOKEN_EXPIRES_IN=7d

   REDIS_HOST=127.0.0.1
   REDIS_PORT=6379
   REDIS_PASSWORD=
   REDIS_URL=redis://127.0.0.1:6379

   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   MAIL_FROM=your_email@gmail.com
   ```

   > If you use Docker for Redis, keep `REDIS_HOST=127.0.0.1` and `REDIS_PORT=6379` unless you change the container mapping.

5. **Run the Server:**
   - **Development Mode (auto-reloading):**
     ```bash
     npm run dev
     ```
   - **Production Mode:**
     ```bash
     npm start
     ```

6. **Stop Docker Services (optional):**
   ```bash
   docker compose down
   ```

### ✅ Validation with Zod

Request payloads for signup, login, and OTP verification are validated using Zod schemas from [src/helpers/validator/auth.validator.js](src/helpers/validator/auth.validator.js).

---

## 🛡️ License

This project is licensed under the **ISC License**.
