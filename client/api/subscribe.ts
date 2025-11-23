import api from "@/config/axios";
import { SubscribeRequest, SubscribeResponse, SubscriberCountResponse } from "@shared/api";

/**
 * Subscribe email to the newsletter
 */
export const subscribeEmail = async (email: string): Promise<SubscribeResponse> => {
  const response = await api.post<SubscribeResponse>('/subscribe', { email } as SubscribeRequest);
  return response.data;
};

/**
 * Get the current subscriber count
 */
export const getSubscriberCount = async (): Promise<SubscriberCountResponse> => {
  const response = await api.get<SubscriberCountResponse>('/subscribers/count');
  return response.data;
};
