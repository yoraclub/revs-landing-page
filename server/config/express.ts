/**
 * Express middleware configuration
 * Request body size limits and parsing options
 */
export const expressConfig = {
  json: {
    limit: "10mb",
  },
  urlencoded: {
    extended: true,
    limit: "10mb",
  },
};
