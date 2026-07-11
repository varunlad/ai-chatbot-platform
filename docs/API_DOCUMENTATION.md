# AI Chatbot Platform - API Documentation

## Base URL

```
http://localhost:5000/api
```

---

# Authentication

The application uses:

- JWT Authentication
- HttpOnly Cookies
- Cookie-based sessions

After login, every protected endpoint automatically uses the authentication cookie.

---

# Response Format

## Success

```json
{
  "success": true,
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# Authentication APIs

---

# 1. User Signup

### Endpoint

```
POST /auth/signup
```

### Description

Registers a new user.

### Request

```json
{
  "name": "Varun Lad",
  "email": "varun@test.com",
  "password": "Password@123"
}
```

### Success Response

**Status Code**

```
201 Created
```

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "cmxxxx",
    "name": "Varun Lad",
    "email": "varun@test.com",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Possible Errors

| Status | Description |
|---------|-------------|
|400|Validation Failed|
|409|Email already exists|

---

# 2. Login

### Endpoint

```
POST /auth/login
```

### Description

Authenticates the user.

Creates HttpOnly Cookie.

### Request

```json
{
  "email": "varun@test.com",
  "password": "Password@123"
}
```

### Success Response

Status

```
200 OK
```

```json
{
  "success": true,
  "data": {
    "userId": "cmxxxx",
    "email": "varun@test.com"
  }
}
```

### Cookies Set

```
token=JWT_TOKEN
```

HttpOnly

Secure (Production)

SameSite=Lax

---

# 3. Logout

### Endpoint

```
POST /auth/logout
```

### Description

Clears authentication cookie.

### Request

No Body

### Response

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

# Conversation APIs

---

# 4. Create Conversation

### Endpoint

```
POST /conversations
```

### Authentication

Required

### Request

No Body

### Success Response

```json
{
  "success": true,
  "data": {
    "id": "cmxxxx",
    "title": "New Chat",
    "userId": "cmuser",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

# 5. Get User Conversations

### Endpoint

```
GET /conversations
```

### Authentication

Required

### Request

No Body

### Success Response

```json
{
  "success": true,
  "data": [
    {
      "id": "cmxxxx",
      "title": "New Chat",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

# Chat APIs

---

# 6. Send Chat Message

### Endpoint

```
POST /chat
```

### Authentication

Required

### Request

```json
{
  "conversationId": "cmconversationid",
  "message": "What is React?"
}
```

### Processing

The backend performs:

1. Verify user owns conversation

2. Save USER message

3. Load conversation history

4. Convert messages

5. Call OpenRouter AI

6. Save AI response

7. Return response

---

### Success Response

```json
{
  "success": true,
  "data": {
    "conversationId": "cmconversationid",
    "messageId": "cmmessageid",
    "response": "React is a JavaScript library..."
  }
}
```

### Validation Errors

Missing conversation

```json
{
    "message":"Conversation ID is required"
}
```

Empty message

```json
{
    "message":"Message cannot be empty"
}
```

Conversation not found

```json
{
    "message":"Conversation not found."
}
```

---

# Health API

---

# 7. Health Check

### Endpoint

```
GET /health
```

### Request

None

### Success Response

```json
{
  "status": "OK"
}
```

---

# Authentication Flow

```text
Signup
   │
   ▼
Login
   │
   ▼
Cookie Created
   │
   ▼
Create Conversation
   │
   ▼
Send Message
   │
   ▼
AI Response
```

---

# Chat Flow

```text
Client

│

▼

POST /chat

│

▼

Authentication

│

▼

Chat Controller

│

▼

Chat Service

│

├── Conversation Service

├── Message Service

├── AI Service

└── Message Mapper

│

▼

OpenRouter

│

▼

Database

│

▼

Client
```

---

# Database Tables

## User

| Column | Type |
|----------|--------|
|id|String|
|name|String|
|email|String|
|password|String|

---

## Conversation

| Column | Type |
|----------|--------|
|id|String|
|title|String|
|userId|String|

---

## Message

| Column | Type |
|----------|--------|
|id|String|
|content|String|
|role|USER / AI|
|conversationId|String|

---

# Current Features

- User Signup

- User Login

- User Logout

- JWT Authentication

- HttpOnly Cookies

- Protected Routes

- Conversation Management

- Persistent Messages

- OpenRouter Integration

- NVIDIA Nemotron 3 Super

- Conversation Context

- Prisma ORM

- PostgreSQL

- Zod Validation

- Global Error Handling

---

# Upcoming Features

- AI Generated Conversation Titles

- Rename Conversation

- Delete Conversation

- Get Conversation Messages

- Streaming Responses

- Markdown Rendering

- Rate Limiting

- Logging

- Production Deployment