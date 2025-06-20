import { useMutation } from '@tanstack/react-query';
import { signin, signup, logout } from '../api/auth.api';
import { isAxiosError } from 'axios';
import { authStore } from '../store/authStore';

export const useAuth = () => {
  const setCurrUser = authStore((state) => state.setCurrUser);

  // Signup
  const { mutateAsync: doSignup, error: signupError } = useMutation({
    mutationFn: signup,
    onSuccess(data) {
      return data;
    },
    onError(error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data.message);
      }
    },
  });

  // Signin
  const { mutateAsync: doSignin, error: signinError } = useMutation({
    mutationFn: signin,
    onSuccess(data) {
      setCurrUser(data.data!);
      return data;
    },
    onError(error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data.message);
      }
    },
  });

  // Logout
  const { mutateAsync: doLogout } = useMutation({
    mutationFn: logout,
    onSuccess(data) {
      setCurrUser(null);
      return data;
    },
  });

  return { doSignup, signupError, doSignin, signinError, doLogout };
};
