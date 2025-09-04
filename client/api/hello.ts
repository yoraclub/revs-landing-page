import api from "@/config/axios";
import { HelloResponse } from "@shared/api";

/**
 * Get hello message from server
 */
export const getHelloMessage = async (): Promise<HelloResponse> => {
  const response = await api.get<HelloResponse>('/hello');
  return response.data;
};