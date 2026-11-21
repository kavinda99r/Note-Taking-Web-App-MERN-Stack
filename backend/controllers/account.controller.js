const { clearSessionCookie } = require("../utilities/session");
const mongoose = require("mongoose");
const User = require("../models/user.model");
const Note = require("../models/note.model");
const { hashPassword, verifyPassword } = require("../utilities/password");

exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (typeof currentPassword !== "string" || typeof newPassword !== "string" || newPassword.length < 8 || Buffer.byteLength(newPassword) > 1024) return res.status(400).json({ error: true, message: "Use a new password of at least 8 characters and at most 1024 bytes" });
  const user = await User.findOne({ _id: req.user.user._id });
  if (!user) return res.sendStatus(401);
  if (!(await verifyPassword(currentPassword, user.password))) return res.status(400).json({ error: true, message: "Current password is incorrect" });
  if (currentPassword === newPassword) return res.status(400).json({ error: true, message: "Choose a different password" });
  // Compare-and-set prevents simultaneous changes from overwriting a newer password.
  const result = await User.updateOne({ _id: user._id, password: user.password }, { $set: { password: await hashPassword(newPassword) }, $inc: { tokenVersion: 1 } });
  if (!result.modifiedCount) return res.status(409).json({ error: true, message: "Your account changed. Sign in and try again" });
  clearSessionCookie(res);
  return res.json({ error: false, message: "Password changed. Please sign in again" });
};

exports.deleteAccount = async (req, res) => {
  const { currentPassword } = req.body;
  if (typeof currentPassword !== "string" || !currentPassword) return res.status(400).json({ error: true, message: "Current password is required" });
  const user = await User.findOne({ _id: req.user.user._id });
  if (!user) return res.sendStatus(401);
  if (!(await verifyPassword(currentPassword, user.password))) return res.status(400).json({ error: true, message: "Current password is incorrect" });
  // Both collections are changed atomically; a failure leaves the account intact.
  await mongoose.connection.transaction(async (session) => {
    const deleted = await User.deleteOne({ _id: user._id, password: user.password }, { session });
    if (!deleted.deletedCount) { const error = new Error("Your account changed. Please try again"); error.status = 409; throw error; }
    await Note.deleteMany({ userId: String(user._id) }, { session });
  });
  clearSessionCookie(res);
  return res.json({ error: false, message: "Account and notes deleted" });
};
