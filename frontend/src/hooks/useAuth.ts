import { useMutation } from '@tanstack/react-query';
import { signin, signup } from '../api/auth.api';
import { isAxiosError } from 'axios';

export const useAuth = () => {
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
      return data;
    },
    onError(error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data.message);
      }
    },
  });

  return { doSignup, signupError, doSignin, signinError };
};
