const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { installSessionStore } = require("./helpers/mockSession");
const store = installSessionStore();
const databasePath = require.resolve("../config/database");
let databaseCalls = 0;
let failDatabase = false;
require.cache[databasePath] = { id: databasePath, filename: databasePath, loaded: true, exports: async () => { databaseCalls++; if (failDatabase) throw new Error("private connection details"); } };
const userPath = require.resolve("../models/user.model");
require.cache[userPath] = { id: userPath, filename: userPath, loaded: true, exports: { findOne: async (filter) => filter._id ? { _id: filter._id, tokenVersion: 0, fullName: "Test User" } : null } };
let searchFilter;
const notePath = require.resolve("../models/note.model");
require.cache[notePath] = { id: notePath, filename: notePath, loaded: true, exports: { find: async (filter) => { searchFilter = filter; return []; } } };
let server;
let base;
before(async () => {
  process.env.VERCEL = "1";
  process.env.FRONTEND_ORIGIN = "http://localhost:5173";
  server = http.createServer(require("../app"));
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));
beforeEach(() => { failDatabase = false; databaseCalls = 0; });
test("Vercel Express backend connects before responding to health checks", async () => {
  for (const route of ["/health", "/health"]) {
    const response = await fetch(base + route);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: "ok" });
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
  assert.equal(databaseCalls, 2);
});
test("Express backend retains proxied search parameters and authenticated cookies", async () => {
  const response = await fetch(base + "/search-notes?query=needle", { headers: { Cookie: store.seed("owner") } });
  assert.equal(response.status, 200);
  assert.equal(searchFilter.userId, "owner");
  assert.equal(searchFilter.$or[0].title.$regex.source, "needle");
});
test("database outage returns a safe retryable response", async () => {
  failDatabase = true;
  const response = await fetch(base + "/health");
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(JSON.stringify(await response.json()).includes("private"), false);
});
test("CORS preflight does not open a database connection", async () => {
  const response = await fetch(base + "/login", { method: "OPTIONS", headers: { Origin: "http://localhost:5173", "Access-Control-Request-Method": "POST" } });
  assert.equal(response.status, 204);
  assert.equal(databaseCalls, 0);
});
test("Vercel origin allowlist trusts exact deployment hosts, never arbitrary origins", () => {
  const previous = { VERCEL: process.env.VERCEL, VERCEL_URL: process.env.VERCEL_URL, VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL, FRONTEND_ORIGIN: process.env.FRONTEND_ORIGIN };
  try {
    process.env.VERCEL = "1";
    process.env.VERCEL_URL = "preview-example.vercel.app";
    process.env.VERCEL_PROJECT_PRODUCTION_URL = "notes-example.vercel.app";
    process.env.FRONTEND_ORIGIN = "https://notes.example.com/";
    const origins = require("../middleware/protectRequests").allowedOrigins();
    assert.ok(origins.includes("https://preview-example.vercel.app"));
    assert.ok(origins.includes("https://notes-example.vercel.app"));
    assert.ok(origins.includes("https://notes.example.com"));
    assert.equal(origins.includes("http://localhost:5173"), false);
    assert.equal(origins.includes("https://evil.vercel.app"), false);
  } finally { for (const [name, value] of Object.entries(previous)) { if (value === undefined) delete process.env[name]; else process.env[name] = value; } }
});

test("backend entrypoint exports Express without opening a local port on Vercel", () => {
  const app = require("../index");
  assert.equal(typeof app, "function");
  assert.equal(typeof app.listen, "function");
});
