# 🌍 Enviro365 Waste Management Analytics Dashboard

A **full-stack waste management analytics application** built with **Spring Boot (Java)** and **Angular**.
The system allows authenticated users to view waste collection analytics through interactive charts and dashboard metrics.

This project demonstrates **REST API design, JWT authentication, asynchronous data handling, and data visualization**.

---

# 🧰 Technology Stack

## Backend

* Java 17
* Spring Boot 3
* Spring Security
* JWT Authentication
* Maven
* H2 Database (default) / MySQL compatible
* Swagger / OpenAPI Documentation

## Frontend

* Angular (Standalone Components)
* Angular Material
* Chart.js
* RxJS (`forkJoin` for async API calls)
* TypeScript

## Tools

* Git / GitHub
* Postman (API testing)
* Swagger UI
* VS Code / IntelliJ

---

# 📂 Project Structure

```
wastemanagement/
│
├── backend/                 # Spring Boot REST API
│   ├── src/main/java
│   ├── src/main/resources
│   ├── pom.xml
│   └── application.properties
│
├── frontend/                # Angular Dashboard
│   ├── src/app
│   │   ├── components
│   │   ├── services
│   │   └── dashboard
│   ├── angular.json
│   └── package.json
│
└── README.md
```

The backend and frontend are separated for clarity while still being part of a **single full-stack repository**.

---

# ⚡ Features

## Backend Features

* User registration and login
* JWT authentication
* Protected API endpoints
* Waste analytics aggregation endpoints
* Swagger API documentation
* Error handling
* CORS configuration for frontend access

---

## Frontend Features

Dashboard analytics displaying:

| Feature               | Description                                  |
| --------------------- | -------------------------------------------- |
| Waste by Type         | Bar chart showing quantities per waste type  |
| Waste by Date         | Bar chart showing daily collection           |
| Waste by Status       | Pie chart showing distribution by status     |
| Total Waste Collected | Doughnut chart showing total kg              |
| Breakdown List        | Waste type breakdown under doughnut chart    |
| Loading Spinner       | Prevents rendering before API calls complete |

Charts are built using **Chart.js** and populated through **parallel API calls using RxJS forkJoin**.

---

# 🚀 Running the Application

## 1️⃣ Clone the Repository

```
git clone https://github.com/<your-username>/wastemanagement.git
cd wastemanagement
```

---

# ▶ Backend Setup (Spring Boot)

Navigate to backend folder:

```
cd backend
```

Build and run:

```
mvn clean install
mvn spring-boot:run
```

Backend will start on:

```
http://localhost:8080
```

---

# ▶ Frontend Setup (Angular)

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Run Angular dev server:

```
npm start
```

Open browser:

```
http://localhost:4200
```

The frontend communicates with the backend via REST API.

---

# 📖 Swagger API Documentation

Swagger UI is available for testing and exploring the API.

Open:

```
http://localhost:8080/swagger-ui.html
```

Swagger provides:

* API endpoint documentation
* Request/response schemas
* Built-in testing interface
* Authentication support

---

# 🔐 API Security

The application uses **JWT (JSON Web Tokens)** for authentication.

## Public Endpoints

These do **not require authentication**:

| Endpoint         | Description                 |
| ---------------- | --------------------------- |
| `/auth/register` | Register a new user         |
| `/auth/login`    | Login and receive JWT token |

---

## Secured Endpoints

These require a valid JWT token:

| Endpoint                     | Description                         |
| ---------------------------- | ----------------------------------- |
| `/analytics/waste-by-type`   | Waste quantities grouped by type    |
| `/analytics/waste-by-date`   | Waste collected by date             |
| `/analytics/waste-by-status` | Waste distribution by status        |
| `/analytics/waste-sum`       | Total waste collected and breakdown |

---

# 🧪 Testing the API with Postman

### Step 1 – Register a user

POST

```
/auth/register
```

Body example:

```json
{
  "username": "testuser",
  "password": "password123"
}
```

---

### Step 2 – Login

POST

```
/auth/login
```

Response:

```json
{
  "token": "JWT_TOKEN_HERE"
}
```

Copy the token.

---

### Step 3 – Access secured endpoints

Add header:

```
Authorization: Bearer <JWT_TOKEN>
```

Example request:

```
GET /analytics/waste-by-type
```

You should receive waste analytics data.

---

# 📊 Dashboard Overview

The Angular dashboard displays the following analytics:

| Widget                | Description                      |
| --------------------- | -------------------------------- |
| Total Waste Types     | Number of distinct waste types   |
| Total Waste Collected | Total kilograms collected        |
| Waste by Type         | Bar chart visualization          |
| Waste by Date         | Time-based waste data            |
| Waste by Status       | Pie chart distribution           |
| Total Waste Chart     | Doughnut chart with center total |

Charts load **only after all API requests complete** to avoid partial rendering.

---

# ⚠️ Known Issues

| Issue                                       | Notes                                                          |
| ------------------------------------------- | -------------------------------------------------------------- |
| ExpressionChangedAfterItHasBeenCheckedError | Occurs when computing derived dashboard metrics asynchronously |
| Initial Waste Type Count                    | May briefly display 0 before API response completes            |
| Chart Rendering Timing                      | Angular lifecycle may cause minor rendering warnings           |

These issues are documented and would be addressed in future refactoring using **reactive state management or Angular signals**.

---

# 🔮 Future Improvements

Planned enhancements include:

* Role-based access control (Admin / User)
* Unit tests (Spring Boot + Angular)
* Dockerized deployment
* Dashboard filtering (date ranges)
* Export analytics reports (CSV/PDF)

---

# 🎯 Learning Goals

This project demonstrates:

* Secure REST API design
* JWT authentication flows
* Angular standalone architecture
* Asynchronous API aggregation
* Data visualization with Chart.js
* Frontend-backend integration

---

# 👨‍💻 Author

Brian Mthembu

Full-Stack Developer (Java / Angular)

---
