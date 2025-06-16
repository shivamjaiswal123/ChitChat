import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../api/user.api';

export const useUser = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });
};
