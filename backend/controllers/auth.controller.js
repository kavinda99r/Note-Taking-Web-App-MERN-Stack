const User = require("../models/user.model");
const { createSession, revokeSession, clearSessionCookie } = require("../utilities/session");
const { hashPassword, verifyPassword } = require("../utilities/password");
const publicUser = (user) => ({ _id: user._id, fullName: user.fullName, email: user.email, createOn: user.createOn });
const validPassword = (password) => typeof password === "string" && password.length > 0 && Buffer.byteLength(password) <= 1024;
exports.createAccount = async (req, res) => {
  const { fullName, email, password } = req.body;
  if (typeof fullName !== "string" || !fullName.trim()) return res.status(400).json({ error: true, message: "Full name is required" });
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: true, message: "A valid email is required" });
  if (!validPassword(password)) return res.status(400).json({ error: true, message: "Password is required and must be at most 1024 bytes" });
  if (await User.findOne({ email })) return res.status(409).json({ error: true, message: "An account already exists with this email" });
  const user = new User({ fullName: fullName.trim(), email, password: await hashPassword(password) });
  await user.save();
  await createSession(req, res, user);
  return res.json({ error: false, user: publicUser(user), message: "Registration successful" });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (typeof email !== "string" || !email || !validPassword(password)) return res.status(400).json({ error: true, message: "Email and password are required" });
  const user = await User.findOne({ email });
  if (!user || !(await verifyPassword(password, user.password))) return res.status(400).json({ error: true, message: "Invalid credentials" });
  await createSession(req, res, user);
  return res.json({ error: false, user: publicUser(user), message: "Login successful" });
};
exports.getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.user._id });
  if (!user) return res.sendStatus(401);
  return res.json({ user: publicUser(user), message: "" });
};

exports.logout = async (req, res) => {
  await revokeSession(req);
  clearSessionCookie(res);
  return res.json({ error: false, message: "Logged out" });
};
