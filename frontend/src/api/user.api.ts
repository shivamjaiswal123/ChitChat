import { axiosInstance } from '../lib/axiosConfig';
import type { ApiResponse, User } from '../types';

export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
  const res = await axiosInstance('/api/v1/user');

  return res.data;
};
