import path from "path";
import { fileURLToPath } from 'url';
import { createServer } from "../server/index.js";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express app
const app = createServer();

// In production, serve the built SPA files
const distPath = path.join(__dirname, "../dist/spa");

// Serve static files
app.use(express.static(distPath));

// Handle React Router - serve index.html for all non-API routes
app.use((req, res, next) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api/") || req.path.startsWith("/health")) {
    return res.status(404).json({ error: "API endpoint not found" });
  }

  res.sendFile(path.join(distPath, "index.html"));
});

// Export the Express app as a Vercel serverless function
export default app;