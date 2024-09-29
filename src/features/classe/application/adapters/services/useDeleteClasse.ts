import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { DeleteClasseOptions } from '@/features/classe/domain/classe-types';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

import { classeUsecases } from '../../usecases';

export default function useDeleteClasse() {
  return useMutation({
    mutationKey: QUERY_KEYS.CLASSE.DELETE(),
    mutationFn: async (options: DeleteClasseOptions) => {
      const operationsResults = await classeUsecases.deleteClasse({
        id: options.classeId,
      });
      if (isLeft(operationsResults)) {
        toastWrapper.error('Erreur lors de la suppression de la classe');
      }
    },
  });
}
