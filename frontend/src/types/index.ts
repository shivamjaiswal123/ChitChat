export const signupInitialState = { name: '', email: '', password: '' };

export const signinInitialState = { email: '', password: '' };

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

export interface SigninFormData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export type ApiResponse<T = undefined> = {
  success: boolean;
  message?: string;
  data?: T;
};

export interface ContentProps {
  senderId: string;
  receiverId: string;
  content: string;
}
