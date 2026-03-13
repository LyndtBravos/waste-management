
---

````markdown
# 🌱 Enviro365 Waste Management System

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![H2 Database](https://img.shields.io/badge/H2-InMemory-orange)
![JWT](https://img.shields.io/badge/JWT-Security-red)
![Swagger](https://img.shields.io/badge/Swagger-Documentation-blueviolet)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Setup Instructions](#setup-instructions)
- [Authentication](#authentication)
  - [Register User](#register-user)
  - [Login User](#login-user)
- [Waste Tracking Endpoints](#waste-tracking-endpoints-apiwaste)
- [Recycling Bin Endpoints](#recycling-bin-endpoints-apibins)
- [Pickup Scheduling Endpoints](#pickup-scheduling-endpoints-apipickups)
- [Analytics Endpoints](#analytics-endpoints-apianalytics)
- [Seed Data](#seed-data)
- [Notes](#notes)
- [Technology Stack](#technology-stack)

---

## Project Overview

The Enviro365 Waste Management System is a **full-stack application** to manage waste disposal, recycling bins, and pickup scheduling.  
The backend is implemented with **Spring Boot**, exposing a REST API. An **Angular frontend** will consume these APIs and display data visually with charts.

**Features:**

- Waste tracking
- Recycling bin locations
- Pickup scheduling
- Analytics for charts
- JWT-based authentication
- Preloaded seed data for testing

---

## Setup Instructions

1. Clone repository:

```bash
git clone https://github.com/LyndtBravos/enviro365-assessment.git
cd enviro365-assessment
````

2. Build and run backend:

```bash
mvn clean spring-boot:run
```

3. Access **Swagger UI**:

```
http://localhost:8080/swagger-ui/index.html
```

4. H2 Console (optional):

```
http://localhost:8080/h2-console
```

* JDBC URL: `jdbc:h2:mem:testdb`
* User: `sa`
* Password: *(leave blank)*

---

## Authentication

### Register User

```
POST /api/auth/register
```

**Request Body:**

```json
{
  "username": "brian",
  "password": "password123"
}
```

**Response:**

```
User registered successfully
```

---

### Login User

```
POST /api/auth/login
```

**Request Body:**

```json
{
  "username": "brian",
  "password": "password123"
}
```

**Response:**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> Use this JWT token in the `Authorization` header:
> `Authorization: Bearer <JWT_TOKEN>` for all protected endpoints.

---

## Waste Tracking Endpoints (`/api/waste`)

| Method | Endpoint          | Description             | Sample Input                                                                             | Sample Output                                                                                           |
| ------ | ----------------- | ----------------------- |------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| POST   | `/api/waste`      | Create new waste record | `json {"wasteType":"Plastic","weight":5,"disposalDate":"2026-03-07","notes":"Bottles"} ` | `json {"id":1,"wasteType":"Plastic","weight":5,"date":"2026-03-07","quantity": 6.5, notes":"Bottles"} ` |
| GET    | `/api/waste`      | Retrieve all records    | N/A                                                                                      | `json [{"id":1,"wasteType":"Plastic","weight":5,"date":"2026-03-07","notes":"Bottles"}]`                |
| GET    | `/api/waste/{id}` | Retrieve record by ID   | N/A                                                                                      | `json {"id":1,"wasteType":"Plastic","weight":5,"date":"2026-03-07","notes":"Bottles"} `                 |
| DELETE | `/api/waste/{id}` | Delete record by ID     | N/A                                                                                      | HTTP 204 No Content                                                                                     |

---

## Recycling Bin Endpoints (`/api/bins`)

| Method | Endpoint         | Description        | Sample Input                                                                                                                                 | Sample Output                                                                                                                               |
| ------ | ---------------- | ------------------ |----------------------------------------------------------------------------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/bins`      | Create bin         | `json {"locationName":"Melrose Arch","address":"1 Melrose Blvd","latitude":-26.132,"longitude":28.068,"acceptedWasteTypes":"Glass, Metal"} ` | `json {"id":3,"name":"Melrose Arch","address":"1 Melrose Blvd","latitude":-26.132,"longitude":28.068,"wasteTypes":"Glass, Metal"} `         |
| GET    | `/api/bins`      | Retrieve all bins  | N/A                                                                                                                                          | `json [{"id":1,"name":"Rosebank Mall","address":"50 Bath Ave","latitude":-26.146,"longitude":28.042,"wasteTypes":"Plastic, Glass, Metal"}]` |
| GET    | `/api/bins/{id}` | Retrieve bin by ID | N/A                                                                                                                                          | `json {"id":1,"name":"Rosebank Mall","address":"50 Bath Ave","latitude":-26.146,"longitude":28.042,"wasteTypes":"Plastic, Glass, Metal"} `  |
| DELETE | `/api/bins/{id}` | Delete bin         | N/A                                                                                                                                          | HTTP 204 No Content                                                                                                                         |

---

## Pickup Scheduling Endpoints (`/api/pickups`)

| Method | Endpoint                                    | Description           | Sample Input                                                                                              | Sample Output                                                                                                                         |
| ------ | ------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/api/pickups`                              | Create pickup request | `json {"wasteType":"Plastic","pickupDate":"2026-03-08","address":"123 Main St","notes":"Leave at gate"} ` | `json {"id":1,"wasteType":"Plastic","pickupDate":"2026-03-08","address":"123 Main St","notes":"Leave at gate","status":"PENDING"} `   |
| GET    | `/api/pickups`                              | Retrieve all pickups  | N/A                                                                                                       | `json [{"id":1,"wasteType":"Plastic","pickupDate":"2026-03-08","address":"123 Main St","notes":"Leave at gate","status":"PENDING"}]`  |
| GET    | `/api/pickups/{id}`                         | Retrieve pickup by ID | N/A                                                                                                       | `json {"id":1,"wasteType":"Plastic","pickupDate":"2026-03-08","address":"123 Main St","notes":"Leave at gate","status":"PENDING"} `   |
| PUT    | `/api/pickups/{id}/status?status=SCHEDULED` | Update status         | N/A                                                                                                       | `json {"id":1,"wasteType":"Plastic","pickupDate":"2026-03-08","address":"123 Main St","notes":"Leave at gate","status":"SCHEDULED"} ` |
| DELETE | `/api/pickups/{id}`                         | Delete pickup         | N/A                                                                                                       | HTTP 204 No Content                                                                                                                   |

---

## Analytics Endpoints (`/api/analytics`)

| Method | Endpoint                         | Description                     | Sample Output                                     |
| ------ |----------------------------------| ------------------------------- | ------------------------------------------------- |
| GET    | `/api/analytics/waste-by-type`   | Count of waste records by type  | `json {"Plastic":12,"Glass":7,"Metal":5} `        |
| GET    | `/api/analytics/waste-by-date`   | Count of waste records per date | `json {"2026-03-07":5,"2026-03-08":8} `           |
| GET    | `/api/analytics/waste-by-status` | Count of pickups by status      | `json {"PENDING":3,"SCHEDULED":2,"COMPLETED":5} ` |

> These endpoints feed **Chart.js graphs** in the frontend.

---

## Seed Data

**Recycling bins preloaded on startup:**

| ID | Name          | Address                | Latitude | Longitude | Waste Types           |
| -- | ------------- | ---------------------- | -------- | --------- | --------------------- |
| 1  | Rosebank Mall | 50 Bath Ave, Rosebank  | -26.146  | 28.042    | Plastic, Glass, Metal |
| 2  | Sandton City  | 83 Rivonia Rd, Sandton | -26.107  | 28.056    | Plastic, Paper        |
| 3  | Melrose Arch  | 1 Melrose Blvd, Birnam | -26.132  | 28.068    | Glass, Metal          |

---

## Notes

* JWT token required for `/api/waste`, `/api/bins`, `/api/pickups`, `/api/analytics`
* Swagger UI fully documents endpoints with `@Operation` annotations
* H2 database is **in-memory**; data resets on restart
* Exceptions handled via `EntityNotFoundException`

---

## Technology Stack

| Layer          | Technology                  |
| -------------- | --------------------------- |
| Backend        | Spring Boot, Java 17        |
| Frontend       | Angular (planned)           |
| Database       | H2 in-memory                |
| Authentication | Spring Security + JWT       |
| Documentation  | Swagger (Springdoc OpenAPI) |
| Build Tool     | Maven                       |

---