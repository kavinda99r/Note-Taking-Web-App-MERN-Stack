# NoteSnap

A note-taking app built with React, Express and MongoDB. Create, edit, search, delete and pin notes.

## Setup

Use Node.js 22.x. Install dependencies in each app:

```powershell
cd backend
npm ci
cd ../frontend
npm ci
```

## Backend configuration

For a fresh checkout, copy `backend/.env.example` to `backend/.env`. Set:

- `MONGODB_URI`: your MongoDB connection URL.
- `FRONTEND_ORIGIN`: the exact frontend origin, such as `http://localhost:5173`. Comma-separated origins are supported. Set this to your deployed frontend URL for Vercel; the backend’s own Vercel URLs are also recognized automatically.
- `PORT`: optional; defaults to 8000.

The server loads the environment file relative to its own folder and connects to MongoDB before accepting requests. Keep credentials in the ignored local `.env` file. Previously committed credentials remain in Git history and should be rotated separately.

From `backend`, run `npm run dev` for development or `npm start` for normal startup.

## Frontend

From `frontend`, run `npm run dev`. The API URL defaults to `/api`. Vite proxies `/api` to `http://localhost:8000` locally. In production, `frontend/vercel.json` proxies it to your deployed backend. Keep `VITE_API_BASE_URL` unset when using this setup.

UI icons use the locally installed Bootstrap Icons font through the shared `Icon` component. Tailwind provides the layout and styles.

## Frontend styling

- `src/index.css` contains Tailwind directives, typography and base browser styles.
- `src/theme.css` contains shared color tokens, button variants, input fields, validation messages and common tags/modal actions.
- Page and component styles, including responsive rules, live in their owning JSX file through a local `styles` constant and a style element. The external Bootstrap Icons font stylesheet remains a package dependency.

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

For production, set `NODE_ENV=production` and `FRONTEND_ORIGIN=https://notes.example.com`, serve both apps over HTTPS, and use the same site (for example, frontend `notes.example.com` and API `api.example.com`) or proxy the API through the frontend origin. Production cookies use the `__Host-` prefix and Secure flag. For Vercel, keep `VITE_API_BASE_URL` unset and use the frontend `/api` rewrite described below. For local development, use the same hostname for both apps, such as `localhost` on ports 5173 and 8000.

Credentialed CORS is restricted to configured frontend origins. Cookie-authenticated mutations require the custom request header supplied by the Axios client and reject untrusted origins. The homepage/login/signup screens automatically redirect to the dashboard when a valid session already exists.

## Deploy to Vercel

Deploy this repository as **two Vercel projects**: one rooted at `backend`, one at `frontend`. There is no separate API folder. Vercel’s native Express support runs the exported backend app, while the frontend serves the React build and proxies `/api/*` to the backend.

### 1. Prepare MongoDB Atlas

Use an existing Atlas cluster or create one. Create a database user with read/write permission for the NoteSnap database, then copy its driver connection string with the database name included:

```text
mongodb+srv://DB_USER:ENCODED_PASSWORD@YOUR_CLUSTER.mongodb.net/notesnap?retryWrites=true&w=majority
```

Use your real values only in Vercel environment variables, never in committed code. URL-encode special characters in the password. Atlas supports the transactions used by account deletion.

In Atlas Network Access, allow your deployment’s outbound IP addresses. With Vercel’s default dynamic egress, a common setup is `0.0.0.0/0`; that permits network connections from anywhere, so use a strong password and a database user restricted to this app’s database. If your Vercel plan provides static egress, restrict Atlas to those IPs instead. Your laptop’s IP entry alone will not allow Vercel to connect.

### 2. Push the source changes

Commit and push the changes to your Git provider. Keep `backend/.env` ignored. Both folder-specific `vercel.json` files and package lockfiles must be included in the commit.

### 3. Deploy the backend project first

In Vercel, choose Add New → Project and import this repository.

- Project name: choose a backend name, for example `notesnap-backend`.
- Root Directory: `backend`.
- Framework Preset: Express (also declared in `backend/vercel.json`).
- Node.js version: 22.x.
- Leave build/output settings at the Express defaults. Do not configure a `dist` output for the backend.
- Add `MONGODB_URI` with the Atlas connection string for Production. Use a separate database if enabling Preview deployments.
- Production uses secure cookies automatically on Vercel; no JWT secret or PORT setting is needed.

Deploy, then copy the stable production URL assigned to the backend, for example `https://notesnap-backend.vercel.app`. Open `/health` on that URL: it should return `{"status":"ok"}` after a successful database connection. A 503 means the connection failed; check Atlas credentials, network access and deployment logs.

### 4. Set the frontend API proxy

In `frontend/vercel.json`, replace the placeholder destination:

```json
{ "source": "/api/:path*", "destination": "https://YOUR-BACKEND-PROJECT.vercel.app/:path*" }
```

Use the actual backend production host from step 3 and keep `/:path*` on the end. Do not add `/api` to the backend destination: its Express endpoints are `/login`, `/get-user`, etc. Commit and push this change.

This is an internal rewrite, not a redirect. The browser uses the frontend’s own `/api` URL, so its HttpOnly cookies stay on the frontend domain.

### 5. Deploy the frontend project

Create another Vercel project from the same repository:

- Root Directory: `frontend`.
- Framework Preset: Vite.
- Node.js version: 22.x.
- Install Command: `npm ci --include=dev`.
- Build Command: `npm run build`.
- Output Directory: `dist`.

The install/build/output values are already declared in `frontend/vercel.json`. Keep `VITE_API_BASE_URL` unset so the app uses `/api`; do not put database secrets in any `VITE_` variable. Deploy and copy the stable frontend production URL.

### 6. Allow the frontend origin on the backend

In the **backend project**, open Settings → Environment Variables and set:

```text
FRONTEND_ORIGIN=https://YOUR-FRONTEND-PROJECT.vercel.app
```

Use the exact frontend origin, with HTTPS and no path. Redeploy the backend so the value takes effect. If using a custom frontend domain, include it too, comma-separated. Do not add a wildcard for all `vercel.app` sites. Without this setting, the backend intentionally rejects login and other mutations from the other Vercel project.

Ensure the backend’s production URL is publicly reachable by the frontend proxy: Deployment Protection must not require an interactive Vercel login for that URL. Keep Preview protection as appropriate for your workflow.

### 7. Check the deployed application

Open the **frontend URL** and verify:

1. `/api/health` returns `{"status":"ok"}`.
2. Signup/login opens the dashboard.
3. Refreshing `/dashboard` or `/account` does not produce a Vercel 404.
4. Create, edit, view, pin, search and delete a test note.
5. Close/reopen the browser and confirm the session persists.
6. Log out and confirm protected pages require sign-in again.

Password change and account deletion invalidate sessions as designed. Test destructive account actions only with a disposable account.

### 8. Later deployments and previews

Pushing commits redeploys the projects. Redeploy after changing environment variables. If you create a new frontend domain, add its exact origin to the backend allowlist. The proxy uses the stable backend production URL; changing projects/domains requires updating `frontend/vercel.json`.

For isolated previews, use a separate backend project/database, point that preview branch’s frontend rewrite to it, and allow only the intended frontend preview origins there. Do not point unreviewed previews at your production data.

### Troubleshooting

| Symptom | Check |
| --- | --- |
| Health returns 503 | `MONGODB_URI`, password escaping, Atlas IP access list, backend logs. |
| Login returns 403 | Exact `FRONTEND_ORIGIN` on the backend, then redeploy. |
| API responds with HTML | Proxy destination placeholder, backend Deployment Protection, correct frontend Root Directory. |
| Login succeeds but session disappears | Keep browser requests at frontend `/api`; remove an external `VITE_API_BASE_URL`; use HTTPS. |
| Page refresh returns 404 | Frontend Root Directory is `frontend` and its SPA rewrite is committed. |
| Build fails installing packages | Node 22.x, committed lockfiles and correct project Root Directory. |

References: [Vercel Express](https://vercel.com/docs/frameworks/backend/express), [Vite SPA routing](https://vercel.com/docs/frameworks/frontend/vite), [rewrites](https://vercel.com/docs/routing/rewrites), [Atlas network access](https://www.mongodb.com/docs/atlas/security/ip-access-list/).

## Outstanding security work

Bulk migration of remaining legacy plaintext passwords, credential rotation and dependency vulnerability remediation remain pending approval.
