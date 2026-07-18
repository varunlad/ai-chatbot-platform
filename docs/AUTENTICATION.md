# Authentication Module

## Overview

Authentication is implemented using JWT stored inside HttpOnly Cookies.

The frontend never handles JWT tokens.

The browser automatically sends the cookie with every request.

---

# Authentication Flow

```
Signup

↓

Password Hashing

↓

Store User

↓

Login

↓

Verify Password

↓

Generate JWT

↓

Store JWT in HttpOnly Cookie

↓

Protected APIs

↓

Middleware validates JWT

↓

User attached to req.user
```

---

# Security

- bcrypt Password Hashing
- JWT Authentication
- HttpOnly Cookies
- Zod Validation
- Protected Routes
- Centralized Error Handling

---

# Endpoints

POST /auth/signup

POST /auth/login

GET /auth/me

POST /auth/logout

---

# Notes

JWT is never returned to the frontend.

The frontend only sends requests.

The browser handles authentication automatically.