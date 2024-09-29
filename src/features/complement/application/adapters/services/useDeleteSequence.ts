import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { coursUsecases } from '@/features/cours-sequence/application/usecases/cours-usecases';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

export default function useDeleteSequence() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.SEQUENCE.DELETE()],
    mutationFn: async (options: {
      sequenceId: string;
      type: 'template' | 'sequence';
      userId: string;
    }) => {
      const deletionResult = await coursUsecases.deleteSequence(options);
      if (isLeft(deletionResult)) {
        toastWrapper.error('Failed to delete sequence');
        return;
      }
      toastWrapper.success('Sequence deleted successfully');
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SEQUENCE.GET_ALL(),
      });
    },
  });
}
