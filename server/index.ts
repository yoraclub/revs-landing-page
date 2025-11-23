import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleHello } from "./routes/hello";
import { handleSubscribe, handleSubscriberCount } from "./routes/subscribe";
import { errorHandler } from "./middleware/errorHandler";
import { corsConfig } from "./config/cors";
import { expressConfig } from "./config/express";
import { logger } from "./middleware/logger";
import { compressionMiddleware } from "./middleware/compression";
import { apiLimiter } from "./middleware/rateLimit";

export function createServer() {
  const app = express();

  // Request logging (first, to log all requests)
  app.use(logger);

  // Response compression (early, to compress all responses)
  app.use(compressionMiddleware);

  // CORS configuration
  app.use(cors(corsConfig));

  // Body parsing middleware
  app.use(express.json(expressConfig.json));
  app.use(express.urlencoded(expressConfig.urlencoded));

  // Rate limiting for API routes
  app.use("/api/", apiLimiter);

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/hello", handleHello);

  app.post("/api/subscribe", handleSubscribe);
  app.get("/api/subscribers/count", handleSubscriberCount);

  // Global error handling middleware (must be last)
  app.use(errorHandler);

  return app;
}
