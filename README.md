# NoteSnap

A note-taking app built with React, Express and MongoDB. Create, edit, search, delete and pin notes.

## Setup

Use Node.js 20 or newer. Install dependencies in each app:

```powershell
cd backend
npm ci
cd ../frontend/note-app
npm ci
```

## Backend configuration

For a fresh checkout, copy `backend/.env.example` to `backend/.env`. Set:

- `MONGODB_URI`: your MongoDB connection URL.
- `ACCESS_TOKEN_SECRET`: a long random JWT signing secret.
- `PORT`: optional; defaults to 8000.

The server loads the environment file relative to its own folder and connects to MongoDB before accepting requests. Keep credentials in the ignored local `.env` file. Previously committed credentials remain in Git history and should be rotated separately.

From `backend`, run `npm run dev` for development or `npm start` for normal startup.

## Frontend

From `frontend/note-app`, run `npm run dev`. The API URL is configured in `src/utils/constants.js` and defaults to `http://localhost:8000`.

UI icons use the locally installed Bootstrap Icons font through the shared `Icon` component. Tailwind provides the layout and styles.

## Backend layout

```text
backend/
  app.js                        Express setup and route mounting
  index.js                      Environment loading and server startup
  config/database.js            MongoDB connection
  controllers/                  Authentication and note request handlers
  middleware/                   Token checks, async wrapper and error responses
  models/                       Mongoose schemas
  routes/                       Authentication and note endpoints
  tests/                        HTTP integration tests with mocked models
```

Existing endpoints are preserved: `/create-account`, `/login`, `/get-user`, `/add-note`, `/edit-note/:noteId`, `/get-all-notes`, `/delete-notes/:noteId`, `/update-note-pinned/:noteId` and `/search-notes`.

## Verification

- Backend: `npm test` (does not connect to MongoDB).
- Frontend: `npm run lint` and `npm run build`.

## Outstanding security work

Password hashing, password removal from JWTs/signup responses, credential rotation and dependency vulnerability remediation require approval. The structural refactor preserves the existing authentication behavior.
