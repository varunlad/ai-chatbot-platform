# Local Setup

## Clone Repository

```bash
git clone <repository-url>
```

---

# Backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

---

Create

```
.env
```

```env
PORT=5000

DATABASE_URL=YOUR_DATABASE_URL

JWT_SECRET=YOUR_SECRET

JWT_EXPIRES_IN=7d

OPENROUTER_API_KEY=YOUR_KEY

AI_MODEL=nvidia/nemotron-3-super-120b-a12b:free
```

---

Generate Prisma Client

```bash
npx prisma generate
```

---

Run Migrations

```bash
npx prisma migrate dev
```

---

Start Backend

```bash
npm run dev
```

Backend

```
http://localhost:5000
```

---

# Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend

```
http://localhost:3000
```