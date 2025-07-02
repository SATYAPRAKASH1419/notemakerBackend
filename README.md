# notemakerBackend

```md
# 📝 Note App Backend (Express + TypeScript + Prisma)

This is the backend for a Note Making App built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, and **Prisma ORM**. It supports user authentication, CRUD for notes, trash management, settings, profile editing, and public sharing of notes.

---

## 📁 Folder Structure


src/
├── constants/             # Common constants (e.g., status codes)
├── controllers/           # Route controller logic
│   ├── auth.controller.ts
│   ├── notes.controller.ts
│   ├── profile.controller.ts
│   ├── settings.controller.ts
│   └── trash.controller.ts
├── middlewares/           # Custom middlewares (auth, error handling)
│   └── auth.middleware.ts
├── routes/                # All route definitions
│   ├── authRouter.ts
│   ├── notesRouter.ts
│   ├── profileRouter.ts
│   ├── rootRouter.ts
│   ├── settingsRouter.ts
│   └── trashRouter.ts
├── schema/                # Zod validation schemas
│   ├── noteCreate.schema.ts
│   ├── noteUpdate.schema.ts
│   ├── profileUpdate.schema.ts
│   ├── register.schema.ts
│   └── signin.schema.ts
├── types/express/         # TypeScript types for extending Express
│   └── index.d.ts
├── utils/                 # Utilities (Prisma client, validators)
│   ├── prisma.ts
│   └── validator.ts
├── index.ts               # App entrypoint


---

## ⚙️ Tech Stack

- **Express.js** – Minimal backend framework
- **TypeScript** – Type safety across the app
- **Prisma** – ORM for PostgreSQL
- **PostgreSQL** – Relational DB for users, notes
- **Zod** – Runtime schema validation
- **JWT Auth** – Auth middleware for protecting private routes

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/SATYAPRAKASH1419/notemakerBackend.git
cd noteappbackend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/your_db"
JWT_SECRET="your_super_secret"
PORT=3000
```

### 4. Setup database with Prisma

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Start development server

```bash
npm run dev
```

---

## 📌 API Overview

### 🔐 Auth Routes

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | Register a new user |
| POST   | /auth/login    | Login and get token |

### 📝 Notes Routes

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | -------------------------- |
| GET    | /allnotes                 | Get all user notes         |
| POST   | /allnotes                 | Create a new note          |
| GET    | /allnotes/\:noteId        | Get note by ID             |
| PUT    | /allnotes/\:noteId        | Update a note              |
| GET    | /allnotes/\:id/download   | Download note as .txt      |
| GET    | /allnotes/search/query?q= | Search notes by query      |
| POST   | /allnotes/share           | Share a note publicly      |
| GET    | /shared/\:publicId        | View public note (no auth) |

### 👤 Profile Routes

| Method | Endpoint | Description      |
| ------ | -------- | ---------------- |
| GET    | /profile | Get user profile |
| POST   | /profile | Update profile   |

### 🗑️ Trash Routes

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| POST   | /trash          | Move note to trash            |
| GET    | /trash          | Get all trashed notes         |
| DELETE | /trash/\:noteId | Permanently delete from trash |

### ⚙️ Settings Route

| Method | Endpoint  | Description          |
| ------ | --------- | -------------------- |
| POST   | /settings | Update user settings |

---

## 📦 Scripts

| Script     | Command             | Description              |
| ---------- | ------------------- | ------------------------ |
| Dev Server | `npm run dev`       | Start dev server with TS |
| Build      | `npm run build`     | Compile TypeScript to JS |
| Start      | `npm start`         | Run compiled code        |
| Prisma     | `npx prisma studio` | Open DB UI               |

---

## 🔐 Auth Middleware

* Implemented in `auth.middleware.ts`
* Validates JWT tokens
* Attach user object to `req.user`

---

## ✅ Future Enhancements

* Password reset with email
* Collaboration / shared editing
* Export to PDF or ZIP
* Note tags and filtering

---

## 🧠 Author

**Satya Prakash Swain**
A Upcoming FullStack Developer🚀

---


---

