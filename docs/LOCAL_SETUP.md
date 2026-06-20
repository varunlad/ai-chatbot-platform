# AI Chatbot Platform - Local Setup Guide

## Overview

This project is an AI Chatbot Platform built using:

### Frontend

* Next.js (App Router)
* React
* TypeScript
* SCSS

### Backend

* Node.js
* Express.js
* TypeScript

### Database

* PostgreSQL (Neon)

### ORM

* Prisma

---

# Project Structure

```text
ai-chatbot-platform/
│
├── frontend/
├── backend/
└── docs/
```

---

# Prerequisites

Install:

* Node.js 20+
* Git
* VS Code

Verify installation:

```bash
node -v
npm -v
git --version
```

---

# Clone Repository

```bash
git clone <repository-url>
cd ai-chatbot-platform
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm run dev
```

Frontend will run on:

```text
http://localhost:3000
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create .env file:

```env
PORT=5000

DATABASE_URL="YOUR_DATABASE_URL"
```

---

# Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Open Prisma Studio:

```bash
npx prisma studio
```

Prisma Studio:

```text
http://localhost:5555
```

---

# Run Backend

```bash
npm run dev
```

Backend will run on:

```text
http://localhost:5000
```

---

# Available Commands

## Frontend

Start development server:

```bash
npm run dev
```

Build project:

```bash
npm run build
```

Run production build:

```bash
npm start
```

---

## Backend

Start development server:

```bash
npm run dev
```

Build TypeScript:

```bash
npm run build
```

Run production build:

```bash
npm start
```

---

# Database Tables

Current database structure:

## User

Stores application users.

## Conversation

Stores chat sessions.

## Message

Stores user and AI messages.

---

# Notes

* Never commit .env files.
* Never commit node_modules.
* Keep DATABASE_URL secret.
* Run migrations whenever schema changes.
* Commit migration files to Git.
