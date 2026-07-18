# Chat Module

## Overview

The Chat Module is responsible for handling conversations between users and AI.

Conversation history is stored in PostgreSQL and loaded before every AI request.

---

# Current Flow

```
User

↓

Create Conversation

↓

Select Assistant Type

↓

Send Message

↓

Save User Message

↓

Load Conversation History

↓

Load Assistant Prompt

↓

Generate AI Response

↓

Save AI Response

↓

Return Response
```

---

# Assistant Types

- GENERAL
- CODING
- EDUCATION
- WRITING
- BUSINESS
- RESEARCH
- CREATIVE
- PRODUCTIVITY
- ANALYSIS
- HEALTH
- FINANCE
- TRAVEL

---

# Architecture

Controller

↓

Service

↓

Prisma

↓

Database

↓

Prompt Factory

↓

AI Service

↓

OpenRouter

---

# Current Features

- Conversation Management
- Message History
- Prompt Factory
- Multiple Assistant Types
- AI Responses
- Persistent Storage

---

# Next Features

- Rename Conversation
- Delete Conversation
- Pin Conversation
- Search
- Streaming Responses
- File Upload
- Image Upload