import api from "@/config/axios";
import { SubscribeRequest, SubscribeResponse } from "@shared/api";

/**
 * Subscribe email to the newsletter
 */
export const subscribeEmail = async (email: string): Promise<SubscribeResponse> => {
  const response = await api.post<SubscribeResponse>('/subscribe', { email } as SubscribeRequest);
  return response.data;
};
