import morgan from "morgan";

/**
 * Request logging middleware using Morgan
 * Logs HTTP requests with clean, readable formats
 */

// Skip logging for static assets to reduce noise
const skipStaticAssets = (req: any, res: any) => {
  // Skip logging for these paths
  const staticPaths = [
    "/assets/",
    "/favicon",
    "/.well-known/",
    ".css",
    ".js",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".ico",
    ".woff",
    ".woff2",
    ".ttf",
  ];

  return staticPaths.some((path) => req.url.includes(path));
};

// Custom format for clean, readable logs
morgan.token("status-colored", (req, res) => {
  const status = res.statusCode;
  if (status >= 500) return `\x1b[31m${status}\x1b[0m`; // Red
  if (status >= 400) return `\x1b[33m${status}\x1b[0m`; // Yellow
  if (status >= 300) return `\x1b[36m${status}\x1b[0m`; // Cyan
  if (status >= 200) return `\x1b[32m${status}\x1b[0m`; // Green
  return status.toString();
});

/**
 * Logger configuration
 * - Development: Colored, concise format with all requests
 * - Production: Clean format, skips static assets
 */
export const logger =
  process.env.NODE_ENV === "production"
    ? morgan(
        ":method :url :status-colored :response-time ms - :res[content-length]",
        {
          skip: skipStaticAssets,
        }
      )
    : morgan("dev");
