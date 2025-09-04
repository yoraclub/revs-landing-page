import api from "@/config/axios";
import { PingResponse } from "@shared/api";

/**
 * Ping the server to check connectivity
 */
export const pingServer = async (): Promise<PingResponse> => {
  const response = await api.get<PingResponse>('/ping');
  return response.data;
};