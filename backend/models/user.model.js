const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: { type: String },
  email: { type: String },
  password: { type: String },
  tokenVersion: { type: Number, default: 0 },
  createOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
