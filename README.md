# Vehicle Rental System – Backend API

A simple and secure backend API for managing a complete vehicle rental system. This project is designed with **role-based authentication** to allow administrators and customers to manage vehicles, users, and bookings efficiently.

---

## Features

- **User Authentication:** Secure authentication using JSON Web Tokens (JWT).
- **Role-Based Access:** Distinct access levels for **Admin** and **Customer** roles.
- **Vehicle Management:** Full CRUD operations (Add, Update, Delete, View) for vehicles.
- **User Management:** Admin controls for all users, plus self-profile updates for all users.
- **Comprehensive Booking System:**
  - Availability checks before booking.
  - Automatic price calculation.
  - Automatic status updates (Booked / Returned / Cancelled).

---

## Technologies Used

| Technology           | Purpose                  |
| :------------------- | :----------------------- |
| **Node.js**          | Runtime Environment      |
| **TypeScript**       | Language for type safety |
| **Express.js**       | Web Framework            |
| **PostgreSQL**       | Database                 |
| `bcryptjs`           | Password Hashing         |
| `jsonwebtoken` (JWT) | Authentication           |
| `dotenv`             | Environment Variables    |

---

## Project Structure

The project follows a modular, feature-based structure:

src/modules

Each module (`auth`, `users`, etc.) is cleanly separated into:

- `routes`
- `controllers`
- `services`

---

## Installation Guide

Follow these steps to set up and run the project locally.

### Clone the repository

1. git clone <your-repo-url>
2. cd vehicle-rental
3. Install dependenciesBash

```
npm install
```

4. Create a file named .env in the root folder and add your configuration details:Code snippet

- `PORT=5000`
- `CONNECTION_SRT=postgresql://your connection credentials`
- `JWT_SECRET=your_jwt_secret`

5. Run the project

```
npm run dev
```

The server will start on: http://localhost:5000

---

## Authentication User Endpoints

- `Register: POST  /api/v1/auth/signup`
- `Login: POST /api/v1/auth/signin`
- `Protected Routes For all protected endpoints, an authorization header is required: Authorization: Bearer <your_token>`

---

## How to Use

- Register a user
- Login to receive a JWT token.
- Use the token in the Authorization header to access protected routes.
- Admin users can manage vehicles and all users.
- Customer users can create and manage their own bookings.

---
