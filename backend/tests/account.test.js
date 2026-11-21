const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const { installSessionStore } = require("./helpers/mockSession");
const sessionStore = installSessionStore();
const cookies = new Map();
const mongoose = require("mongoose");
const { verifyPassword } = require("../utilities/password");
let user;
let notes;
let failDelete;
let transactions;
const initialUser = () => ({ _id: "account-owner", fullName: "Test User", email: "test@example.com", password: "legacy-password", tokenVersion: 0 });
const userPath = require.resolve("../models/user.model");
const notePath = require.resolve("../models/note.model");
require.cache[userPath] = { id: userPath, filename: userPath, loaded: true, exports: {
  findOne: async (filter) => user && ((filter._id && filter._id === user._id) || filter.email === user.email) ? { ...user } : null,
  updateOne: async (filter, update) => {
    if (!user || filter._id !== user._id || filter.password !== user.password) return { modifiedCount: 0 };
    user.password = update.$set.password;
    user.tokenVersion += update.$inc.tokenVersion;
    return { modifiedCount: 1 };
  },
  deleteOne: async (filter, options) => {
    assert.ok(options.session);
    if (!user || user._id !== filter._id || user.password !== filter.password) return { deletedCount: 0 };
    user = null;
    return { deletedCount: 1 };
  },
} };
require.cache[notePath] = { id: notePath, filename: notePath, loaded: true, exports: {
  deleteMany: async (filter, options) => {
    assert.ok(options.session);
    if (failDelete) throw new Error("simulated database failure");
    notes = notes.filter((note) => note.userId !== filter.userId);
  },
} };
mongoose.connection.transaction = async (callback) => {
  transactions++;
  const snapshot = { user: structuredClone(user), notes: structuredClone(notes) };
  try { await callback({ testSession: true }); }
  catch (error) { user = snapshot.user; notes = snapshot.notes; throw error; }
};
const app = require("../app");
let server;
let base;
const request = (path, method = "GET", body, version = 0) => fetch(base + path, { method, headers: { Cookie: cookies.get(version), "X-Requested-With": "XMLHttpRequest", "Content-Type": "application/json" }, ...(body ? { body: JSON.stringify(body) } : {}) });
before(async () => {
  server = await new Promise((resolve) => { const listener = app.listen(0, "127.0.0.1", () => resolve(listener)); });
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));
beforeEach(() => { sessionStore.sessions.clear(); cookies.clear(); cookies.set(0, sessionStore.seed("account-owner")); user = initialUser(); notes = [{ userId: "account-owner" }, { userId: "someone-else" }]; failDelete = false; transactions = 0; });

test("account actions require authentication", async () => {
  for (const [path, method] of [["/account/password", "PUT"], ["/account", "DELETE"]]) assert.equal((await fetch(base + path, { method })).status, 401);
});
test("wrong current password leaves account unchanged", async () => {
  const before = { ...user };
  const response = await request("/account/password", "PUT", { currentPassword: "wrong", newPassword: "a-new-password" });
  assert.equal(response.status, 400);
  assert.deepEqual(user, before);
});
test("password change hashes the replacement, revokes old sessions and permits login", async () => {
  assert.equal((await request("/account/password", "PUT", { currentPassword: "legacy-password", newPassword: "a-new-password" })).status, 200);
  assert.ok(user.password.startsWith("scrypt$"));
  assert.equal(await verifyPassword("a-new-password", user.password), true);
  assert.equal(await verifyPassword("legacy-password", user.password), false);
  assert.equal((await request("/get-user")).status, 401);
  const response = await fetch(base + "/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: user.email, password: "a-new-password" }) });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.accessToken, undefined);
  assert.equal(body.user.password, undefined);
  cookies.set(1, response.headers.get("set-cookie").split(";")[0]);
  assert.equal((await request("/get-user", "GET", undefined, 1)).status, 200);
});
test("deletion rejects a wrong password without starting a transaction", async () => {
  assert.equal((await request("/account", "DELETE", { currentPassword: "wrong" })).status, 400);
  assert.ok(user);
  assert.equal(transactions, 0);
  assert.equal(notes.length, 2);
});
test("deletion removes only the owner and their notes and blocks their session", async () => {
  assert.equal((await request("/account", "DELETE", { currentPassword: "legacy-password" })).status, 200);
  assert.equal(transactions, 1);
  assert.equal(user, null);
  assert.deepEqual(notes, [{ userId: "someone-else" }]);
  assert.equal((await request("/get-user")).status, 401);
});
test("deletion uses a transaction so a failed note deletion rolls back the account", async () => {
  failDelete = true;
  assert.equal((await request("/account", "DELETE", { currentPassword: "legacy-password" })).status, 500);
  assert.deepEqual(user, initialUser());
  assert.equal(notes.length, 2);
});
test("login rejects MongoDB operators before querying", async () => {
  const response = await fetch(base + "/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: { $ne: null }, password: "legacy-password" }) });
  assert.equal(response.status, 400);
});
