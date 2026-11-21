const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const jwt = require("jsonwebtoken");

process.env.ACCESS_TOKEN_SECRET = "test-only-secret";
let noteFilter;
let saved;
const userPath = require.resolve("../models/user.model");
const notePath = require.resolve("../models/note.model");
require.cache[userPath] = {
  id: userPath, filename: userPath, loaded: true,
  exports: { findOne: async () => { throw new Error("private database details"); } },
};
require.cache[notePath] = {
  id: notePath, filename: notePath, loaded: true,
  exports: {
    findOne: async (filter) => {
      noteFilter = filter;
      return { isPinned: true, save: async function () { saved = this.isPinned; } };
    },
  },
};

const app = require("../app");
let server;
let baseUrl;
before(async () => {
  server = await new Promise((resolve) => {
    const listener = app.listen(0, "127.0.0.1", () => resolve(listener));
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));

test("all note routes require authentication", async () => {
  for (const [method, path] of [
    ["POST", "/add-note"], ["PUT", "/edit-note/123"],
    ["GET", "/get-all-notes"], ["DELETE", "/delete-notes/123"],
    ["PUT", "/update-note-pinned/123"], ["GET", "/search-notes?query=test"],
  ]) {
    const response = await fetch(baseUrl + path, { method });
    assert.equal(response.status, 401, path);
  }
});

test("edit route supports unpinning and scopes lookup to the signed-in user", async () => {
  const token = jwt.sign({ user: { _id: "owner" } }, process.env.ACCESS_TOKEN_SECRET);
  const response = await fetch(baseUrl + "/edit-note/note-id", {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ isPinned: false }),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(noteFilter, { _id: "note-id", userId: "owner" });
  assert.equal(saved, false);
});

test("rejected auth operations return a safe JSON error", async () => {
  const response = await fetch(baseUrl + "/login", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", password: "test" }),
  });
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), { error: true, message: "Internal server error" });
});

test("malformed JSON is handled without exposing parser details", async () => {
  const response = await fetch(baseUrl + "/login", {
    method: "POST", headers: { "Content-Type": "application/json" }, body: "{",
  });
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: true, message: "Invalid JSON body" });
});
