const { test, beforeEach, after } = require("node:test");
const assert = require("node:assert/strict");
const mongoosePath = require.resolve("mongoose");
const databasePath = require.resolve("../config/database");
const originalUri = process.env.MONGODB_URI;
let calls;
let connect;
let fakeMongoose;
beforeEach(() => {
  calls = 0;
  process.env.MONGODB_URI = "mongodb://test.invalid/notesnap";
  fakeMongoose = { connection: { readyState: 0 }, set() {}, connect: (...args) => { calls++; return connect(...args); } };
  require.cache[mongoosePath] = { id: mongoosePath, filename: mongoosePath, loaded: true, exports: fakeMongoose };
  delete require.cache[databasePath];
});
after(() => { if (originalUri === undefined) delete process.env.MONGODB_URI; else process.env.MONGODB_URI = originalUri; });
test("serverless requests share one pending database connection", async () => {
  let resolve;
  connect = () => new Promise((done) => { resolve = done; });
  const connectDatabase = require("../config/database");
  const first = connectDatabase();
  const second = connectDatabase();
  assert.equal(calls, 1);
  fakeMongoose.connection.readyState = 1;
  resolve(fakeMongoose);
  await Promise.all([first, second]);
  await connectDatabase();
  assert.equal(calls, 1);
});
test("failed connections can be retried and disconnected connections reopen", async () => {
  connect = async () => { throw new Error("test failure"); };
  const connectDatabase = require("../config/database");
  await assert.rejects(connectDatabase());
  connect = async (uri, options) => { assert.equal(options.maxPoolSize, 5); fakeMongoose.connection.readyState = 1; return fakeMongoose; };
  await connectDatabase();
  assert.equal(calls, 2);
  fakeMongoose.connection.readyState = 0;
  await connectDatabase();
  assert.equal(calls, 3);
});
test("missing MongoDB configuration fails before connecting", async () => {
  delete process.env.MONGODB_URI;
  await assert.rejects(require("../config/database")(), /MONGODB_URI/);
  assert.equal(calls, 0);
});
