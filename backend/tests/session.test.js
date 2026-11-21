const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { installSessionStore } = require("./helpers/mockSession");
const store = installSessionStore();
const { SESSION_AGE, hashToken } = require("../utilities/session");
const users = new Map();
const userPath = require.resolve("../models/user.model");
class User {
  constructor(data) { Object.assign(this, data, { _id: "new-user", tokenVersion: 0 }); }
  async save() { users.set(this._id, { ...this }); }
  static async findOne(filter) { return [...users.values()].find((user) => filter._id ? user._id === filter._id : user.email === filter.email) || null; }
}
require.cache[userPath] = { id: userPath, filename: userPath, loaded: true, exports: User };
const app = require("../app");
let server;
let base;
const request = (path, method = "GET", body, cookie, extra = {}) => fetch(base + path, {
  method, headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest", ...(cookie ? { Cookie: cookie } : {}), ...extra },
  ...(body ? { body: JSON.stringify(body) } : {}),
});
const login = (cookie) => request("/login", "POST", { email: "test@example.com", password: "test-password" }, cookie);
const cookieFrom = (response) => response.headers.get("set-cookie").split(";")[0];
before(async () => {
  server = await new Promise((resolve) => { const listener = app.listen(0, "127.0.0.1", () => resolve(listener)); });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));
beforeEach(() => { delete process.env.NODE_ENV; store.sessions.clear(); users.clear(); users.set("owner", { _id: "owner", email: "test@example.com", password: "test-password", fullName: "Test User", tokenVersion: 0 }); });

test("login sets a persistent HttpOnly SameSite cookie and never returns credentials", async () => {
  const response = await login();
  assert.equal(response.status, 200);
  const cookie = response.headers.get("set-cookie");
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Lax/);
  assert.match(cookie, /Max-Age=31536000/);
  assert.equal(response.headers.get("cache-control"), "no-store");
  const body = await response.json();
  assert.equal(body.accessToken, undefined);
  assert.equal(body.user.password, undefined);
  const raw = cookieFrom(response).split("=")[1];
  assert.ok(store.sessions.has(hashToken(raw)));
  assert.equal(JSON.stringify([...store.sessions.values()]).includes(raw), false);
  // A fresh request/client can restore the session using only the persistent cookie.
  assert.equal((await request("/get-user", "GET", undefined, cookieFrom(response))).status, 200);
});
test("signup establishes the same persistent session", async () => {
  const response = await request("/create-account", "POST", { email: "new@example.com", fullName: "New User", password: "new-password" });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).user.password, undefined);
  const authenticated = await request("/get-user", "GET", undefined, cookieFrom(response));
  assert.equal((await authenticated.json()).user.email, "new@example.com");
});
test("logout revokes the session in storage and prevents cookie replay", async () => {
  const cookie = cookieFrom(await login());
  assert.equal((await request("/logout", "POST", {}, cookie)).status, 200);
  assert.equal(store.sessions.size, 0);
  assert.equal((await request("/get-user", "GET", undefined, cookie)).status, 401);
  const again = await request("/logout", "POST", {});
  assert.equal(again.status, 200);
});
test("signing in again replaces the old cookie session", async () => {
  const previous = cookieFrom(await login());
  const next = cookieFrom(await login(previous));
  assert.notEqual(previous, next);
  assert.equal((await request("/get-user", "GET", undefined, previous)).status, 401);
  assert.equal((await request("/get-user", "GET", undefined, next)).status, 200);
});
test("active sessions renew automatically and expired sessions are rejected", async () => {
  const oldExpiry = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000);
  const cookie = store.seed("owner", 0, oldExpiry);
  const response = await request("/get-user", "GET", undefined, cookie);
  assert.equal(response.status, 200);
  assert.ok([...store.sessions.values()][0].expiresAt > new Date(Date.now() + SESSION_AGE - 5000));
  const expired = store.seed("owner", 0, new Date(Date.now() - 1000));
  assert.equal((await request("/get-user", "GET", undefined, expired)).status, 401);
});
test("cross-site mutations and cookie requests without verification are rejected", async () => {
  const cookie = cookieFrom(await login());
  assert.equal((await request("/logout", "POST", {}, cookie, { Origin: "https://untrusted.example" })).status, 403);
  assert.equal((await request("/logout", "POST", {}, cookie, { "X-Requested-With": "" })).status, 403);
  assert.equal((await request("/get-user", "GET", undefined, cookie)).status, 200);
});
test("credentialed CORS is limited to configured frontend origins", async () => {
  const allowed = await request("/", "GET", undefined, undefined, { Origin: "http://localhost:5173" });
  assert.equal(allowed.headers.get("access-control-allow-origin"), "http://localhost:5173");
  assert.equal(allowed.headers.get("access-control-allow-credentials"), "true");
  const denied = await request("/", "GET", undefined, undefined, { Origin: "https://untrusted.example" });
  assert.equal(denied.headers.get("access-control-allow-origin"), null);
});
test("production cookies are Secure and use the host-only prefix", async () => {
  process.env.NODE_ENV = "production";
  try {
    const response = await login();
    assert.match(response.headers.get("set-cookie"), /^__Host-notesnap_session=/);
    assert.match(response.headers.get("set-cookie"), /; Secure/);
    assert.doesNotMatch(response.headers.get("set-cookie"), /Domain=/);
  } finally { delete process.env.NODE_ENV; }
});
