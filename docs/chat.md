# AI Chat Module

## Overview

The Chat Module is responsible for handling all chatbot-related functionality.

It acts as the bridge between:

- Authenticated users
- PostgreSQL (conversation history)
- OpenRouter AI API

The goal is to provide persistent AI conversations where the chatbot remembers previous messages by loading conversation history from the database before every AI request.

---

# Current Progress

## Completed

- OpenRouter AI integration
- AI service
- Conversation CRUD
- Message service
- Prisma models
- MessageRole enum
- Authentication using JWT (HttpOnly Cookie)

## Upcoming

- Chat orchestration service
- Persistent conversation memory
- Conversation history retrieval
- AI response persistence
- Streaming AI responses
- Conversation title generation

---

# Database Models

## User

Represents an authenticated user.

Relationship:

User
└── Conversations

---

## Conversation

Represents a single chat session.

Example:

Conversation
├── React Interview
├── JavaScript Questions
└── Resume Review

Relationship:

Conversation
└── Messages

---

## Message

Represents a single message inside a conversation.

Each message contains:

- content
- role
- conversationId
- timestamps

Roles are stored using the MessageRole enum.

Example:

USER
AI

---

# Chat Flow

Every chat request follows the same lifecycle.

User
↓

Authentication

↓

Validate Request

↓

Verify Conversation Ownership

↓

Save User Message

↓

Load Previous Messages

↓

Convert Messages to AI Format

↓

Call OpenRouter API

↓

Receive AI Response

↓

Save AI Response

↓

Return Response

---

# Why Conversation History is Needed

Large Language Models (LLMs) are stateless.

This means they do not remember previous requests.

Instead of remembering, our backend sends the entire conversation on every request.

Example:

User:
Hello

Assistant:
Hi!

User:
What is React?

Assistant:
React is...

User:
Explain it simply.

Before sending the final request, the backend sends:

[
  {
    "role": "user",
    "content": "Hello"
  },
  {
    "role": "assistant",
    "content": "Hi!"
  },
  {
    "role": "user",
    "content": "What is React?"
  },
  {
    "role": "assistant",
    "content": "React is..."
  },
  {
    "role": "user",
    "content": "Explain it simply."
  }
]

This gives the AI enough context to answer correctly.

---

# Message Roles

The project uses Prisma enums.

enum MessageRole {
    USER
    AI
}

Benefits

- Type safety
- Prevent invalid values
- Better autocomplete
- Easier querying
- Cleaner architecture

---

# AI Provider

Current Provider

OpenRouter

Current Model

nvidia/nemotron-3-super-120b-a12b:free

The provider can be changed in the future without affecting the database because provider-specific formatting will be isolated from the business logic.

---

# Current Folder Structure

src/

controllers/
auth.controller.ts
conversation.controller.ts
user.controller.ts

services/
ai.service.ts
auth.service.ts
conversation.service.ts
message.service.ts

middleware/
auth.middleware.ts
error.middleware.ts

routes/

config/
prisma.ts

utils/

---

# Architecture

Controller

↓

Service Layer

↓

Prisma

↓

Database

The AI service is treated as an external dependency and remains isolated from the business logic.

---

# Future Improvements

- Chat orchestration service
- Conversation title generation using AI
- Streaming responses
- Message pagination
- Conversation search
- Conversation deletion
- Soft delete support
- Multiple AI models
- AI model selection
- Token usage tracking
- Rate limiting
- Conversation export
- Markdown rendering
- Image generation support
- File upload support
- Vector database integration
- Retrieval-Augmented Generation (RAG)

---

# Learning Notes

Important concepts learned so far:

• LLMs are stateless.

• The backend is responsible for maintaining memory.

• Every AI request includes the previous conversation.

• Conversation history is stored in PostgreSQL.

• Messages are differentiated using the MessageRole enum.

• The AI provider should remain isolated from the application logic.

• Services should perform business logic while controllers only handle HTTP requests.

---

# Next Milestone

Implement the Chat Orchestrator.

Responsibilities:

- Authenticate user
- Validate conversation
- Store user message
- Load conversation history
- Prepare AI request
- Call OpenRouter
- Store AI response
- Return response

This service will become the heart of the chatbot backend.