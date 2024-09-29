import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { CreateCompetenceOptions } from '@/features/comp-cat/domain/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import { useRouter } from 'next/navigation';

import { compCatUsecases } from '../comp-cat-usecases';

export default function useCreateCompetence() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: QUERY_KEYS.COMPETENCES.CREATE(),
    mutationFn: async (options: CreateCompetenceOptions) => {
      return compCatUsecases.addCompetence(options);
    },
    onSuccess: async (either) => {
      if (isLeft(either)) {
        toastWrapper.error('Une erreur est survenue lors de la création');
        return;
      }
      toastWrapper.success('Compétence créée avec succès');

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMP_CAT.GET_ALL(),
      });
    },
  });
}
