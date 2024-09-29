import { QUERY_KEYS } from '@/core/query/ query-keys';
import { UpdateVisibilityOptions } from '@/features/visibility/domain/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { classeUsecases } from '../../usecases';

export default function useUpdateVisibility() {
  return useMutation({
    mutationKey: [QUERY_KEYS.VISIBILITY.UPDATE()],

    mutationFn: async (options: UpdateVisibilityOptions) => {
      return classeUsecases.updateVisibility(options);
    },
  });
}
