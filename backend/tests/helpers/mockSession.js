const { randomBytes } = require("node:crypto");
function installSessionStore() {
  const sessions = new Map();
  const sessionPath = require.resolve("../../models/session.model");
  const model = {
    create: async (data) => { sessions.set(data.tokenHash, { ...data }); return data; },
    findOne: async (filter) => {
      const session = sessions.get(filter.tokenHash);
      return session && (!filter.expiresAt || session.expiresAt > filter.expiresAt.$gt) ? { ...session } : null;
    },
    updateOne: async (filter, update) => {
      const session = sessions.get(filter.tokenHash);
      if (!session) return { matchedCount: 0 };
      Object.assign(session, update.$set);
      return { matchedCount: 1 };
    },
    deleteOne: async (filter) => ({ deletedCount: Number(sessions.delete(filter.tokenHash)) }),
  };
  require.cache[sessionPath] = { id: sessionPath, filename: sessionPath, loaded: true, exports: model };
  const { SESSION_AGE, hashToken } = require("../../utilities/session");
  const seed = (userId, version = 0, expiresAt = new Date(Date.now() + SESSION_AGE)) => {
    const token = randomBytes(32).toString("hex");
    sessions.set(hashToken(token), { tokenHash: hashToken(token), userId, tokenVersion: version, expiresAt });
    return `${(process.env.NODE_ENV === "production" || process.env.VERCEL === "1") ? "__Host-" : ""}notesnap_session=${token}`;
  };
  return { sessions, seed, model };
}
module.exports = { installSessionStore };
