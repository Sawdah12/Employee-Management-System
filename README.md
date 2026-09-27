# Employee Management System

A full-stack CRUD application to manage employee records, built with **React**, **Node.js/Express**, and **PostgreSQL**, following a clean 3-tier architecture.

---

## 📌 Overview

This system allows users to **create, view, search, edit, and delete** employee records through a simple, responsive interface. It demonstrates a complete separation of concerns between the presentation layer, business logic layer, and data layer.

---

## 🏗️ 3-Tier Architecture

This project strictly follows a 3-tier architecture:

| Tier | Technology | Responsibility |
|------|-----------|-----------------|
| **Presentation Tier** | React | Renders the UI, handles user input, displays employee data |
| **Business Tier** | Node.js + Express (REST API) | Handles request validation, business logic, and routes data between the frontend and the database |
| **Data Tier** | PostgreSQL | Stores and persists all employee records |

**Request Flow:**

```
Browser (React) → HTTP/REST API (Express) → Business Logic → PostgreSQL Database
```

> ⚠️ **Important:** React never communicates directly with the database. All data operations (Create, Read, Update, Delete) go strictly through the backend REST API.

---

## 🛠️ Tech Stack

**Frontend**
- React
- React Router DOM
- React Bootstrap
- React Toastify (notifications)

**Backend**
- Node.js
- Express.js
- pg (node-postgres)

**Database**
- PostgreSQL

**Deployment**
- Docker & Docker Compose

---

## 📁 Project Structure

```
Employee Management System/
├── backend/
│   ├── server.js          # Express server & REST API routes
│   ├── db.js               # PostgreSQL connection config
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── employee-list.jsx
│   │   │   ├── employee-form.jsx
│   │   │   ├── employee-card.jsx
│   │   │   └── navbar.jsx
│   │   ├── pages/
│   │   │   └── home/
│   │   ├── services/
│   │   │   └── employeeApi.js
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
├── db.sql                  # Database schema
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

---

### Option 1: Run Locally (without Docker)

#### 1. Database Setup

1. Open **pgAdmin** or `psql` and create a database:
   ```sql
   CREATE DATABASE employee_db;
   ```
2. Run the schema from `db.sql` to create the `employees` table:
   ```sql
   CREATE TABLE employees (
       id SERIAL PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100),
       department VARCHAR(100),
       role VARCHAR(100),
       status VARCHAR(50)
   );
   ```
3. Update your credentials in `backend/db.js`:
   ```javascript
   const pool = new Pool({
     user: 'postgres',
     host: 'localhost',
     database: 'employee_db',
     password: 'your_password',
     port: 5432,
   });
   ```

#### 2. Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on → `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on → `http://localhost:5173`

---

### Option 2: Run with Docker

From the project root (where `docker-compose.yml` is located):

```bash
docker-compose up --build
```

This will spin up three containers:
- PostgreSQL database
- Backend API (port `5000`)
- Frontend app (port `5173`)

Access the app at → `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|--------------|
| `GET` | `/api/employees` | Get all employees |
| `GET` | `/api/employees/:id` | Get a single employee by ID |
| `POST` | `/api/employees` | Create a new employee |
| `PUT` | `/api/employees/:id` | Update an existing employee |
| `DELETE` | `/api/employees/:id` | Delete an employee |

**Sample Response** (`GET /api/employees`):
```json
[
  {
    "id": 1,
    "name": "Sara",
    "email": "sara@gmail.com",
    "department": "HR",
    "role": "Junior HR",
    "status": "Active"
  }
]
```

---

## ✨ Features

- ✅ Create new employee records via a form
- ✅ View all employees in a responsive card layout
- ✅ Search/filter employees by name, email, department, or role
- ✅ Edit existing employee details
- ✅ Delete employees with confirmation prompt
- ✅ Toast notifications for success/error feedback
- ✅ Loading and error states for better UX

---

## 📸 Screenshots

> Add your screenshots below (place image files in a `screenshots/` folder in the repo root)

**Employee List**
![Employee List](./screenshots/employee-list.png)

**Create Employee**
![Create Employee](./screenshots/create-employee.png)

**Edit Employee**
![Edit Employee](./screenshots/edit-employee.png)

---

## 👩‍💻 Author

Developed by Sawdah as a personal/academic project to practice full-stack development with React, Express, and PostgreSQL using 3-tier architecture principles.