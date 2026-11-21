const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
  tokenHash: { type: String, required: true, unique: true },
  userId: { type: String, required: true, index: true },
  tokenVersion: { type: Number, required: true, default: 0 },
  expiresAt: { type: Date, required: true, expires: 0 },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Session", sessionSchema);
