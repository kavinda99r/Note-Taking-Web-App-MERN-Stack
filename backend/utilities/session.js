const { randomBytes, createHash } = require("node:crypto");
const Session = require("../models/session.model");
const SESSION_AGE = 365 * 24 * 60 * 60 * 1000;
const productionCookies = () => process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
const cookieName = () => productionCookies() ? "__Host-notesnap_session" : "notesnap_session";
const cookieOptions = () => ({ httpOnly: true, secure: productionCookies(), sameSite: "lax", path: "/" });
const hashToken = (token) => createHash("sha256").update(token).digest("hex");
function readToken(req) {
  const matches = (req.headers.cookie || "").split(";").map((part) => part.trim()).filter((part) => part.startsWith(cookieName() + "="));
  if (matches.length !== 1) return null;
  const token = matches[0].slice(cookieName().length + 1);
  return /^[a-f0-9]{64}$/.test(token) ? token : null;
}
function setSessionCookie(res, token) {
  res.cookie(cookieName(), token, { ...cookieOptions(), maxAge: SESSION_AGE });
  res.set("Cache-Control", "no-store");
}
function clearSessionCookie(res) {
  res.clearCookie(cookieName(), cookieOptions());
  res.set("Cache-Control", "no-store");
}
async function revokeSession(req) {
  const token = readToken(req);
  if (token) await Session.deleteOne({ tokenHash: hashToken(token) });
}
async function createSession(req, res, user) {
  await revokeSession(req);
  const token = randomBytes(32).toString("hex");
  await Session.create({ tokenHash: hashToken(token), userId: String(user._id), tokenVersion: user.tokenVersion || 0, expiresAt: new Date(Date.now() + SESSION_AGE) });
  setSessionCookie(res, token);
}
module.exports = { SESSION_AGE, hashToken, readToken, setSessionCookie, clearSessionCookie, revokeSession, createSession };
