const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const app = require("./app");
const connectDatabase = require("./config/database");

async function start() {
  try {
    if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is required");
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
