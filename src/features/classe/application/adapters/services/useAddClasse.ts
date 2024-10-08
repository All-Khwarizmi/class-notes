import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { CreateClasseOptions } from '@/features/classe/domain/classe-types';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

import { classeUsecases } from '../../usecases';

export default function useAddClasse() {
  return useMutation({
    mutationKey: QUERY_KEYS.CLASSE.CREATE(),
    mutationFn: async (options: CreateClasseOptions) => {
      const operationResult = await classeUsecases.createClasse(options);
      if (isLeft(operationResult)) {
        return toastWrapper.error("La classe n'a pas pu être créée");
      }
      toastWrapper.success('La classe a été créée');
    },
  });
}
