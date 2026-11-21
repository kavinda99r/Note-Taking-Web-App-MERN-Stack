# NoteSnap

A note-taking app built with React, Express and MongoDB. Create, edit, search, delete and pin notes.

## Setup

Use Node.js 20 or newer. Install dependencies in each app:

```powershell
cd backend
npm ci
cd ../frontend
npm ci
```

## Backend configuration

For a fresh checkout, copy `backend/.env.example` to `backend/.env`. Set:

- `MONGODB_URI`: your MongoDB connection URL.
- `FRONTEND_ORIGIN`: the exact frontend origin, such as `http://localhost:5173`. Comma-separated origins are supported. Required in production.
- `PORT`: optional; defaults to 8000.

The server loads the environment file relative to its own folder and connects to MongoDB before accepting requests. Keep credentials in the ignored local `.env` file. Previously committed credentials remain in Git history and should be rotated separately.

From `backend`, run `npm run dev` for development or `npm start` for normal startup.

## Frontend

From `frontend`, run `npm run dev`. The API URL defaults to `http://localhost:8000`; override it with `VITE_API_BASE_URL` in the frontend environment.

UI icons use the locally installed Bootstrap Icons font through the shared `Icon` component. Tailwind provides the layout and styles.

## Backend layout

```text
backend/
  app.js                        Express setup and route mounting
  index.js                      Environment loading and server startup
  config/database.js            MongoDB connection
  controllers/                  Authentication and note request handlers
  middleware/                   Session checks, request verification and error responses
  models/                       User, note and persistent session schemas
  routes/                       Authentication and note endpoints
  tests/                        HTTP integration tests with mocked models
```

Existing endpoints are preserved: `/create-account`, `/login`, `/get-user`, `/add-note`, `/edit-note/:noteId`, `/get-all-notes`, `/delete-notes/:noteId`, `/update-note-pinned/:noteId` and `/search-notes`.

## Verification

- Backend: `npm test` (does not connect to MongoDB).
- Frontend: `npm run lint` and `npm run build`.

## Account settings

Open the profile circle on the dashboard to visit `/account`. The page shows the account name and email, supports password changes, logout and permanent account deletion.

- `PUT /account/password` requires the current password and a new password of at least 8 characters. Changing it invalidates existing sessions and requires signing in again.
- `DELETE /account` requires the current password and deletes the user and their notes in one transaction. MongoDB Atlas or a replica set is required for transactions; a standalone MongoDB server cannot perform this operation.
- New and changed passwords use salted scrypt hashes. Existing plaintext passwords remain compatible until changed. Passwords are excluded from session and signup responses.

## Persistent sign-in

Login and signup create a MongoDB-backed session. The browser stores only a random 256-bit session ID in an HttpOnly, host-only, SameSite=Lax cookie; MongoDB stores its SHA-256 hash. Credentials are never returned as browser-readable tokens or stored in localStorage. Existing browser tokens are discarded, so users need one fresh sign-in after upgrading from the previous implementation.

Sessions survive browser and server restarts. The persistent cookie lasts one year and is renewed during authenticated use; the server expiry is refreshed during use as well. Logging out calls `POST /logout` and revokes the session before clearing the cookie. A password change invalidates all existing sessions, and deleted accounts cannot authenticate. Cleared cookies or a year of inactivity require another sign-in.

For production, set `NODE_ENV=production` and `FRONTEND_ORIGIN=https://notes.example.com`, serve both apps over HTTPS, and use the same site (for example, frontend `notes.example.com` and API `api.example.com`) or proxy the API through the frontend origin. Production cookies use the `__Host-` prefix and Secure flag. Set `VITE_API_BASE_URL` to the API address before building the frontend. For local development, use the same hostname for both apps, such as `localhost` on ports 5173 and 8000.

Credentialed CORS is restricted to configured frontend origins. Cookie-authenticated mutations require the custom request header supplied by the Axios client and reject untrusted origins. New browser sessions automatically skip the homepage/login/signup screens when a valid session already exists.

## Outstanding security work

Bulk migration of remaining legacy plaintext passwords, credential rotation and dependency vulnerability remediation remain pending approval.
