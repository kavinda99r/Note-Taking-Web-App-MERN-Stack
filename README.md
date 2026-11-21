# NoteSnap

NoteSnap is a simple note-taking web application for capturing ideas, reminders, and everyday thoughts. Keep your notes organized and access them from a responsive interface.

## Features

- Sign up, log in, and stay signed in across visits.
- Create, view, edit, and delete notes.
- Search notes, add tags, and pin important notes.
- View account details, change your password, log out, or delete your account.
- Responsive layouts for desktop and mobile.

## Tech Stack

- **Frontend:** React, Vite, React Router, Tailwind CSS, Bootstrap Icons, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB
- **Authentication:** Persistent cookie-based sessions and scrypt password hashing

## Installation

Install **Node.js 22.x** and have a local MongoDB server or MongoDB Atlas connection ready. Atlas or a MongoDB replica set is needed for account deletion.

1. Clone the repository and open its folder:

   ```bash
   git clone https://github.com/kavinda99r/Note-Taking-Web-App-MERN-Stack.git
   cd Note-Taking-Web-App-MERN-Stack
   ```

2. Install backend and frontend dependencies:

   ```bash
   npm --prefix backend ci
   npm --prefix frontend ci
   ```

3. Copy `backend/.env.example` to `backend/.env` and set your MongoDB connection URL:

   ```env
   PORT=8000
   MONGODB_URI=mongodb://127.0.0.1:27017/notesnap
   FRONTEND_ORIGIN=http://localhost:5173
   ```

   If using Atlas, replace `MONGODB_URI` with your Atlas connection string. Keep `.env` private.

## Run Locally

From the repository folder, start the backend in one terminal:

```bash
npm --prefix backend run dev
```

Open another terminal in the same folder and start the frontend:

```bash
npm --prefix frontend run dev
```

Open [http://localhost:5173](http://localhost:5173). The backend runs on port **8000**, and the frontend forwards API requests to it automatically.
