/**
 * Request type for /api/subscribe
 */
export interface SubscribeRequest {
  email: string;
}

/**
 * Response type for /api/subscribe
 */
export interface SubscribeResponse {
  success: boolean;
  message: string;
}
