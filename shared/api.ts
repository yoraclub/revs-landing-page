/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Response type for /api/hello
 */
export interface HelloResponse {
  message: string;
}

/**
 * Response type for /api/ping
 */
export interface PingResponse {
  message: string;
}
