const User = require("../models/user.model");
const Session = require("../models/session.model");
const { SESSION_AGE, readToken, hashToken, clearSessionCookie, setSessionCookie } = require("../utilities/session");
async function authenticateSession(req, res, next) {
  res.set("Cache-Control", "no-store");
  const token = readToken(req);
  if (!token) return res.sendStatus(401);
  try {
    const session = await Session.findOne({ tokenHash: hashToken(token), expiresAt: { $gt: new Date() } });
    if (!session) { clearSessionCookie(res); return res.sendStatus(401); }
    const user = await User.findOne({ _id: session.userId });
    if (!user || session.tokenVersion !== (user.tokenVersion || 0)) {
      await Session.deleteOne({ tokenHash: session.tokenHash });
      clearSessionCookie(res);
      return res.sendStatus(401);
    }
    // Refresh long-lived sessions during normal use, without requiring another login.
    if (new Date(session.expiresAt).getTime() - Date.now() < SESSION_AGE - 24 * 60 * 60 * 1000) {
      const result = await Session.updateOne({ tokenHash: session.tokenHash }, { $set: { expiresAt: new Date(Date.now() + SESSION_AGE) } });
      if (!result.matchedCount) { clearSessionCookie(res); return res.sendStatus(401); }
    }
    setSessionCookie(res, token);
    req.user = { user: { _id: String(user._id) } };
    next();
  } catch (error) { next(error); }
}
module.exports = { authenticateSession };
