import { CorsOptions } from "cors";

/**
 * CORS configuration
 * Allows cross-origin requests from specified origins
 */
export const corsConfig: CorsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
