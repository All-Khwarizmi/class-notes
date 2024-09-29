import { QUERY_KEYS } from '@/core/query/ query-keys';
import { useMutation } from '@tanstack/react-query';
import { fetchMutation } from 'convex/nextjs';

import { api } from '../../../../../convex/_generated/api';

export const useCheckHostnameAvailabilityQuery = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.HOSTNAME.IS_AVAILABLE()],
    mutationFn: ({ hostname, userId }: { hostname: string; userId: string }) =>
      fetchMutation(api.hostname.isHostnameAvailableClient, {
        hostname,
        userId,
      }),
  });
};

export const useCheckHostnameAvailability = () => {
  const { isPending, mutateAsync: checkHostnameAvailability } =
    useCheckHostnameAvailabilityQuery();
  return {
    isLoading: isPending,
    checkHostnameAvailability,
  };
};
