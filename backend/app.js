const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const noteRoutes = require("./routes/note.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.json({ data: "hello" }));
app.use(authRoutes);
app.use(noteRoutes);
app.use((req, res) => res.status(404).json({ error: true, message: "Route not found" }));
app.use(errorHandler);

module.exports = app;
