import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleHello } from "./routes/hello";
import { errorHandler } from "./middleware/errorHandler";
import { corsConfig } from "./config/cors";
import { expressConfig } from "./config/express";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors(corsConfig));
  app.use(express.json(expressConfig.json));
  app.use(express.urlencoded(expressConfig.urlencoded));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/hello", handleHello);

  // Global error handling middleware (must be last)
  app.use(errorHandler);

  return app;
}
