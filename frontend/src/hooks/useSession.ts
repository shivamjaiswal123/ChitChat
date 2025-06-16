import { useQuery } from '@tanstack/react-query';
import { me } from '../api/auth.api';

export const useSession = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: me,
    retry: false,
  });
};
