import { useQuery } from '@tanstack/react-query';
import { me } from '../api/auth.api';
import { useEffect } from 'react';
import { authStore } from '../store/authStore';

export const useSession = () => {
  const setCurrUser = authStore((state) => state.setCurrUser);

  const { data: session, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: me,
    retry: false,
  });

  useEffect(() => {
    if (session?.data) {
      setCurrUser(session.data);
    }
  }, [session]);

  return { session, isLoading };
};
