import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { classeUsecases } from '@/features/classe/application/usecases/classe-usecases';
import { GetClasseListOptions } from '@/features/classe/domain/classe-types';
import { useQuery } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

export default function useGetClasses(options: GetClasseListOptions) {
  return useQuery({
    queryKey: QUERY_KEYS.CLASSE.GET_ALL(),
    queryFn: async () => {
      const operationResult = await classeUsecases.getClasses({
        id: options.userId,
      });
      if (isLeft(operationResult)) {
        console.log('An error occurred while fetching classes');
        toastWrapper.error(
          'Une erreur est survenue lors du chargement des classes'
        );
        throw new Error(operationResult.left.message);
      }

      return operationResult;
    },
  });
}
