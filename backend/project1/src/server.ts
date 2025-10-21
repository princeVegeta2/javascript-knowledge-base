import app from "./app";

/**
 * server.ts
 * ----------
 * This file is responsible for *starting* the HTTP server.
 * It imports the configured Express app and tells it to listen
 * on a specific port.
 */

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// When your server startup depends on other async operations (e.g., DB connection)
/*
import app from "./app";
import { connectDB } from "./db";

const PORT = process.env.PORT || 8080;

async function startServer() {
  try {
    await connectDB(); // ⏳ Wait for DB to connect
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
*/