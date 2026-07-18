# Developer Guide

## Project Goal

Build a production-ready AI Chatbot Platform using modern backend architecture.

---

# Technology Stack

Backend

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- OpenRouter

Frontend

- Next.js
- React
- TypeScript
- SCSS

---

# Folder Structure

```
src

controllers/

services/

routes/

middleware/

config/

utils/

validations/

prompts/

types/

generated/
```

---

# Backend Architecture

```
Route

↓

Controller

↓

Validation

↓

Service

↓

Prisma

↓

Database

↓

Response
```

---

# AI Request Flow

```
User

↓

Authentication

↓

Conversation Validation

↓

Store User Message

↓

Load History

↓

Read Assistant Type

↓

Prompt Factory

↓

OpenRouter

↓

Store AI Response

↓

Return Response
```

---

# Assistant System

Every conversation has one assistant type.

```
Conversation

↓

assistantType

↓

Prompt Factory

↓

System Prompt

↓

OpenRouter
```

This keeps prompts centralized and makes adding new assistants easy.

---

# Database Models

## User

Stores user information.

---

## Conversation

Stores

- title
- assistantType
- userId

---

## Message

Stores

- content
- role
- conversationId

---

# Development Roadmap

## Completed

- Authentication
- JWT Cookies
- Prisma
- Conversation APIs
- Chat APIs
- Prompt Factory
- Assistant Types
- AI Integration
- Auto Conversation Titles

---

## Next

- Rename Conversation
- Delete Conversation
- Pin Conversation
- Frontend Development

---

# Coding Standards

- Business logic inside Services
- Controllers remain thin
- Validation using Zod
- Database access only through Prisma
- Reusable utility functions
- Clear folder separation

---

# Git Workflow

```
Feature

↓

Develop

↓

Commit

↓

Push

↓

Merge
```

Commit messages should be meaningful.

Example

```
feat: add assistant type support

fix: resolve conversation validation

refactor: improve prompt factory
```

---

# Notes

This guide is intended to help quickly understand the project structure even after a long break. Reading this document should be enough to recall the architecture, request flow, folder organization, and upcoming roadmap.