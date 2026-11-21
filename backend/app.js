const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const { allowedOrigins, protectRequests } = require("./middleware/protectRequests");
app.use(cors({ origin: (origin, callback) => callback(null, !origin || allowedOrigins().includes(origin)), credentials: true }));
app.use(protectRequests);
app.use(express.json());
app.use(async (req, res, next) => {
  if (process.env.VERCEL !== "1") return next();
  try {
    await require("./config/database")();
    next();
  } catch {
    res.set("Cache-Control", "no-store");
    res.status(503).json({ error: true, message: "Database unavailable. Please try again shortly." });
  }
});
app.get("/", (req, res) => res.json({ data: "hello" }));
app.get("/health", (req, res) => {
  res.set("Cache-Control", "no-store");
  res.json({ status: "ok" });
});
app.use(authRoutes);
app.use(require("./routes/account.routes"));
app.use(noteRoutes);
app.use((req, res) => res.status(404).json({ error: true, message: "Route not found" }));
app.use(errorHandler);

module.exports = app;
