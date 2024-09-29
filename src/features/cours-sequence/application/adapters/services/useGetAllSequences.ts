import { QUERY_KEYS } from '@/core/query/ query-keys';
import { useQuery } from '@tanstack/react-query';

import { coursUsecases } from '../../usecases/cours-usecases';

export default function useGetAllSequences(userId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.SEQUENCE.GET_ALL(),
    queryFn: async () => {
      return coursUsecases.getAllSequences({
        userId,
      });
    },
  });
}
