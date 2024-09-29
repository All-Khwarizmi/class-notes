import { QUERY_KEYS } from '@/core/query/ query-keys';
import { useQuery } from '@tanstack/react-query';

import { compCatUsecases } from '../comp-cat-usecases';

export const useGetCategories = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: QUERY_KEYS.CATEGORY.GET_ALL(),
    queryFn: () => compCatUsecases.getCategories({ userId }),
  });
};
