# Authentication Module

## Overview

This project uses JWT (JSON Web Token) based authentication with HttpOnly Cookies.

Instead of storing tokens in localStorage or sessionStorage, the JWT is stored inside a secure HttpOnly cookie, which provides better protection against XSS attacks.

Authentication Flow:

User Signup
→ Password Hashing (bcrypt)
→ Store User in PostgreSQL

User Login
→ Verify Password
→ Generate JWT
→ Store JWT in HttpOnly Cookie

Protected Route
→ Browser sends Cookie automatically
→ Middleware verifies JWT
→ User information attached to req.user

Logout
→ Clear HttpOnly Cookie
→ User Session Ends

---

# Technology Used

## Authentication

* JWT (jsonwebtoken)
* HttpOnly Cookies
* cookie-parser

## Security

* bcryptjs (Password Hashing)
* Zod (Validation)
* Custom Error Handling
* Protected Routes Middleware

## Database

* PostgreSQL (Neon)
* Prisma ORM

---

# Why HttpOnly Cookies?

Traditional applications often store JWTs in localStorage.

Example:

```javascript
localStorage.setItem("token", token);
```

This approach is vulnerable to XSS attacks because any malicious JavaScript running in the browser can access the token.

Our application uses:

```http
Set-Cookie: accessToken=JWT_TOKEN
HttpOnly
```

Benefits:

* JavaScript cannot access the token
* Better security
* Industry-standard approach
* Browser automatically sends cookie with requests

---

# Authentication Architecture

Login Request
↓
Validate Input
↓
Verify User Credentials
↓
Generate JWT
↓
Store JWT in HttpOnly Cookie
↓
Return User Information

Protected Request
↓
Read Cookie
↓
Verify JWT
↓
Extract User ID
↓
Attach User to Request
↓
Allow Access

---

# Database Schema

User Model

Fields:

* id
* name
* email
* password
* createdAt
* updatedAt

Password is always stored in hashed form.

Plain text passwords are never stored in the database.

---

# JWT Payload

Current Payload:

```json
{
  "userId": "USER_ID",
  "email": "user@example.com"
}
```

Future Improvement:

```json
{
  "userId": "USER_ID"
}
```

JWT should contain only the minimum information required to identify the user.

---

# Middleware

## Authentication Middleware

Location:

src/middleware/auth.middleware.ts

Responsibilities:

* Read accessToken cookie
* Verify JWT
* Extract user information
* Attach user information to req.user
* Allow request to continue

Example:

```ts
req.user = {
  userId: decoded.userId,
  email: decoded.email,
};
```

---

# API Endpoints

## Health Check

Endpoint:

GET /api/health

Response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Signup

Endpoint:

POST /api/auth/signup

Request:

```json
{
  "name": "Varun",
  "email": "varun@test.com",
  "password": "password123"
}
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "...",
    "name": "Varun",
    "email": "varun@test.com"
  }
}
```

Validation Rules:

* Name required
* Email required
* Valid email format
* Password minimum length validation

---

## Login

Endpoint:

POST /api/auth/login

Request:

```json
{
  "email": "varun@test.com",
  "password": "password123"
}
```

Process:

1. Validate input
2. Find user by email
3. Compare password using bcrypt
4. Generate JWT
5. Set HttpOnly Cookie
6. Return user information

Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "...",
      "name": "Varun",
      "email": "varun@test.com"
    }
  }
}
```

Cookie Created:

```text
accessToken
```

---

## Get Current User

Protected Route

Endpoint:

GET /api/auth/me

Authentication Required:

Yes

Cookie Required:

```text
accessToken
```

Response:

```json
{
  "success": true,
  "data": {
    "id": "...",
    "name": "Varun",
    "email": "varun@test.com",
    "createdAt": "..."
  }
}
```

Purpose:

Returns the currently authenticated user.

---

## Logout

Endpoint:

POST /api/auth/logout

Authentication Required:

No

Process:

1. Clear accessToken cookie
2. End current session

Response:

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

After logout:

GET /api/auth/me

returns:

```json
{
  "success": false,
  "message": "Authentication required"
}
```

---

# Validation Layer

Validation is implemented using Zod.

Location:

src/validations

Responsibilities:

* Validate request body
* Validate email format
* Validate password requirements
* Prevent invalid data from reaching services

Example:

```ts
signupSchema.parse(req.body);
```

---

# Error Handling

A centralized error middleware handles:

* Zod Validation Errors
* Prisma Errors
* JWT Errors
* Custom Application Errors
* Unexpected Errors

Location:

src/middleware/error.middleware.ts

Benefits:

* Consistent API responses
* Cleaner controllers
* Easier debugging

---

# Folder Structure

Authentication Related Files

src/

controllers/

* auth.controller.ts

services/

* auth.service.ts

routes/

* auth.routes.ts

middleware/

* auth.middleware.ts
* error.middleware.ts

validations/

* auth.validation.ts

utils/

* jwt.ts
* AppError.ts
* asyncHandler.ts

types/

* express.d.ts

---

# Environment Variables

Required Variables

```env
PORT=5000

DATABASE_URL=YOUR_DATABASE_URL

JWT_SECRET=YOUR_SECRET_KEY

JWT_EXPIRES_IN=7d

COOKIE_EXPIRES_IN=7
```

Important:

Never commit .env files to GitHub.

---

# Security Measures Implemented

* Password hashing using bcrypt
* JWT Authentication
* HttpOnly Cookies
* Input validation using Zod
* Centralized error handling
* Protected routes
* Environment variable management

---

# Future Improvements

Authentication Roadmap

Phase 2

* Refresh Tokens
* Access Token Rotation
* Forgot Password
* Reset Password
* Email Verification
* Role-Based Access Control (RBAC)

Phase 3

* Google OAuth
* GitHub OAuth
* Multi-Factor Authentication (MFA)
* Session Management Dashboard

---

# Current Authentication Status

Completed Features:

✓ User Signup

✓ User Login

✓ Password Hashing

✓ JWT Generation

✓ HttpOnly Cookie Authentication

✓ Protected Routes

✓ Current User Endpoint

✓ Logout Endpoint

✓ Validation Layer

✓ Error Handling

Authentication Module Version:

v0.4-auth-cookie-based
