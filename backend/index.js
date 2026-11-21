const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = require("./app");
const connectDatabase = require("./config/database");

async function start() {
  try {
    if (process.env.NODE_ENV === "production" && !process.env.FRONTEND_ORIGIN) throw new Error("FRONTEND_ORIGIN is required in production");
    await connectDatabase();
    const port = process.env.PORT || 8000;
    return app.listen(port, () => console.log(`Server listening on port ${port}`));
  } catch (error) {
    console.error("Server startup failed. Check database and environment configuration.");
    process.exitCode = 1;
  }
}

if (require.main === module) start();
module.exports = { app, start };
