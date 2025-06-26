import { useQuery } from '@tanstack/react-query';
import { getAllUsers, getChattedUsers } from '../api/user.api';

export const useUser = () => {
  const { data: allUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  const { data: chattedUsers } = useQuery({
    queryKey: ['chatted-users'],
    queryFn: getChattedUsers,
  });

  return { allUsers, chattedUsers };
};
