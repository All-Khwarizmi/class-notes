import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { UpdateCompCatOptions } from '@/features/comp-cat/domain/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

import { compCatUsecases } from '../../usecases/comp-cat-usecases';

export const useUpdateCompCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.COMP_CAT.UPDATE()],
    mutationFn: async (options: UpdateCompCatOptions) =>
      compCatUsecases.updateCompCat(options),
    onSuccess: async (either, variables) => {
      if (isLeft(either)) {
        return toastWrapper.error('An error occurred');
      }
      toastWrapper.success(`${variables.type} updated successfully`);
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMP_CAT.GET_ALL(),
      });
    },
  });
};
