import { axiosInstance } from '../lib/axiosConfig';
import type { ApiResponse, ChatHistoryProps, User } from '../types';

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  const res = await axiosInstance.get('/api/v1/user');

  return res.data;
};

export const getMessages = async (
  selectedUserId: string
): Promise<ApiResponse<ChatHistoryProps[]>> => {
  const res = await axiosInstance.get('/api/v1/message', {
    params: { userId: selectedUserId },
  });

  return res.data;
};

export const getChattedUsers = async (): Promise<ApiResponse<User[]>> => {
  const res = await axiosInstance.get('/api/v1/user/chatted-users');

  return res.data;
};
