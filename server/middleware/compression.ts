import compression from "compression";

/**
 * Response compression middleware
 * Compresses response bodies for all requests
 */

/**
 * Compression configuration
 * - Compresses all responses over 1KB
 * - Uses gzip compression
 * - Improves bandwidth and response times
 */
export const compressionMiddleware = compression({
  // Only compress responses larger than 1KB
  threshold: 1024,
  // Compression level (0-9, 6 is default balance)
  level: 6,
  // Filter function to determine what to compress
  filter: (req, res) => {
    // Don't compress if client doesn't accept encoding
    if (req.headers["x-no-compression"]) {
      return false;
    }
    // Use compression's default filter
    return compression.filter(req, res);
  },
});
