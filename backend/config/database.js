const mongoose = require("mongoose");

let pendingConnection;
mongoose.set("bufferCommands", false);

module.exports = async () => {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is required");
  if (mongoose.connection.readyState === 1) return mongoose;
  if (!pendingConnection) {
    pendingConnection = mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 5,
      minPoolSize: 0,
      maxIdleTimeMS: 60000,
      serverSelectionTimeoutMS: 5000,
    });
  }
  const attempt = pendingConnection;
  try {
    return await attempt;
  } finally {
    if (pendingConnection === attempt) pendingConnection = undefined;
  }
};
