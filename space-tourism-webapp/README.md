# 🌌 Space Tourism Mission Management System

A full-stack, role-based web application for managing space tourism missions. It supports different user roles like Admin, Trip Coordinator, Certified Space Guide, and Traveler, each with customized functionalities such as mission creation, assignment, instruction updates, and booking management.

---

## 🧠 Project Overview

This platform enables users with different roles to interact with space missions:

- **Admin**: Manage users and view all missions.
- **Trip Coordinator**: Create missions, assign guides, and manage seats.
- **Certified Space Guide**: View assigned missions, post instructions, complete or cancel missions.
- **Traveler**: Browse trips, make bookings, view booking history.

---

## 🧩 System Entities & Functionalities

### 1. 👤 User

| Field      | Type    | Description                                            |
|------------|---------|--------------------------------------------------------|
| username   | String  | User’s name                                            |
| email      | String  | Unique user email                                     |
| password   | String  | Encrypted password                                     |
| role       | Enum    | Admin, TripCoordinator, CertifiedSpaceGuide, Traveler |

---

### 2. 🚀 Mission

| Field           | Type      | Description                                                 |
|-----------------|-----------|-------------------------------------------------------------|
| title           | String    | Title of the mission                                        |
| tripName        | String    | Display name of the mission trip                            |
| destination     | String    | Travel destination like Moon, Mars                          |
| status          | Enum      | Scheduled, assigned, completed, cancelled                   |
| launchDate      | Date      | Launch date                                                 |
| startDate       | Date      | Start date of the mission                                   |
| endDate         | Date      | End date of the mission                                     |
| instructions    | String    | Notes/instructions from the guide                           |
| seatCapacity    | Number    | Total available seats                                       |
| guideId         | ObjectId  | Certified Guide assigned to the mission                     |
| travellerId     | ObjectId  | Traveler booking the mission                                |
| coordinatorId   | ObjectId  | Trip Coordinator responsible for the mission                |

---

## ⚙️ Backend - `/backend`

### Tech Stack

- Node.js
- Express
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt for password hashing

### Key Features

- User authentication & authorization
- Role-based access control
- CRUD operations on missions
- Status updates: assign, complete, cancel
- Guide-specific instruction submission

### API Endpoints

| Method | Endpoint                                     | Access                  | Description                          |
|--------|----------------------------------------------|--------------------------|--------------------------------------|
| POST   | `/api/auth/login`                            | Public                   | Login and get JWT                    |
| GET    | `/api/users`                                 | Admin                    | View all users                       |
| POST   | `/api/users`                                 | Admin                    | Create a user                        |
| GET    | `/api/missions`                              | Admin/Coordinator        | View all missions                    |
| POST   | `/api/missions`                              | Admin/Coordinator        | Create new mission                   |
| PUT    | `/api/missions/:id/status`                   | Admin/Coordinator        | Update mission status                |
| PATCH  | `/api/guide/missions/:id/instructions`       | CertifiedSpaceGuide      | Add/update mission instructions      |
| PATCH  | `/api/guide/missions/:id/complete`           | CertifiedSpaceGuide      | Mark mission as completed            |
| PATCH  | `/api/guide/missions/:id/cancel`             | CertifiedSpaceGuide      | Cancel a mission                     |

---

## 💻 Frontend - `/frontend`

### Tech Stack

- React.js
- React Router DOM
- Bootstrap
- Vanilla CSS
- Fetch API

### Role-Based Pages

| Path               | Role                 | Description                                    |
|--------------------|----------------------|------------------------------------------------|
| `/login`           | All                  | Login page                                     |
| `/home`            | Traveler             | Book available trips                           |
| `/trips/:slug`     | Traveler             | Trip detail page                               |
| `/admin`           | Admin                | View/manage users and trips                    |
| `/coordinator`     | Trip Coordinator     | Create/manage missions                         |
| `/guide`           | CertifiedSpaceGuide  | View and manage assigned missions              |

---

## ✅ Features

- Role-based route protection using JWT
- Filter missions by status (Assigned, Completed, Cancelled)
- Guide-exclusive features:
  - Post instructions
  - Cancel or complete mission
- Admin features:
  - Create and manage users
- Coordinator features:
  - Assign guide to mission
  - Adjust seat capacity
- Responsive design and modern UI

---

## 🛠️ Running the App Locally

### Backend Setup

```bash
cd backend
npm install
npm run dev


## 🌐 Tech Stack

| Layer     | Technology        |
|-----------|-------------------|
| Frontend  | React.js, Bootstrap |
| Backend   | Node.js, Express.js |
| Database  | MongoDB with Mongoose |
| Auth      | JWT (Token-based) |
| Others    | Stripe (Payments), Role-based access, REST APIs |

---

## 🎭 User Roles & Functionalities

| Role                  | Functionalities                                                                 |
|-----------------------|----------------------------------------------------------------------------------|
| **Admin**             | - Manage users and trips<br/>- Create/edit/delete trips                         |
| **Trip Coordinator**  | - Create missions<br/>- Assign guides<br/>- Update seat capacity, status        |
| **Certified Space Guide** | - View assigned missions<br/>- Update instructions<br/>- Mark missions completed/cancelled |
| **Traveller**         | - View and book trips<br/>- View bookings                                       |

---

## 🧩 Core Entities

### 🧑 User

- Fields: `username`, `email`, `password`, `role`
- Roles: `Admin`, `TripCoordinator`, `CertifiedSpaceGuide`, `Traveller`, `Trainee`
- JWT Token issued on login

### 🛰️ Mission

- Fields:
  - `title`, `tripName`, `destination`, `launchDate`, `startDate`, `endDate`
  - `status`: `Scheduled`, `Delayed`, `assigned`, `cancelled`, `Completed`
  - `instructions`, `seatCapacity`
- Relations:
  - `guideId`, `assignedGuide`, `travellerId`, `coordinatorId`

### 🛸 Trip

- Describes public trips available to book

### 📅 Booking

- Links travelers to booked trips

---

## 🔧 Backend Setup

### 📁 Folder: `/backend`

### ▶️ Getting Started

```bash
cd backend
npm install
npm run dev
