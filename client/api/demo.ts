import api from "@/config/axios";
import { DemoResponse } from "@shared/api";

/**
 * Get demo message from server
 */
export const getDemoMessage = async (): Promise<DemoResponse> => {
  const response = await api.get<DemoResponse>('/demo');
  return response.data;
};