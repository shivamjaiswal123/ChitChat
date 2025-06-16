import { axiosInstance } from '../lib/axiosConfig';
import type {
  ApiResponse,
  SigninFormData,
  SignupFormData,
  User,
} from '../types';

export const signup = async (
  formData: SignupFormData
): Promise<ApiResponse> => {
  const res = await axiosInstance.post('api/v1/auth/signup', formData);

  return res.data;
};

export const signin = async (
  formData: SigninFormData
): Promise<ApiResponse<User>> => {
  const res = await axiosInstance.post('api/v1/auth/signin', formData);

  return res.data;
};

export const me = async (): Promise<ApiResponse<User>> => {
  const res = await axiosInstance.get('api/v1/auth/me');

  return res.data;
};
