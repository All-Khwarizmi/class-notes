import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { DeleteEvaluationBase } from '@/features/evaluation/domain/entities/evaluation-types';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

import { evaluationUsecases } from '../../usecases/evaluation-usecases';

export default function useDeleteEvaluationBase() {
  return useMutation({
    mutationKey: QUERY_KEYS.EVALUATIONS.DELETE_EVALUATION_BASE(),
    mutationFn: async (options: DeleteEvaluationBase) => {
      const operationResult =
        await evaluationUsecases.deleteEvaluationBase(options);
      if (isLeft(operationResult)) {
        return toastWrapper.error(
          'An error occurred while deleting the evaluation'
        );
      }
      toastWrapper.success('Evaluation base deleted successfully');
    },
  });
}
