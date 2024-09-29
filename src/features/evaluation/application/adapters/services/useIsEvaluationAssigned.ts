import { IsEvaluationAssigned } from '@/features/evaluation/domain/entities/evaluation-types';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

import { evaluationUsecases } from '../../usecases/evaluation-usecases';

export default function useIsEvaluationAssigned() {
  return useMutation({
    mutationKey: ['is-evaluation-assigned'],
    mutationFn: async (options: IsEvaluationAssigned) => {
      return evaluationUsecases.isEvaluationAssigned(options);
    },
  });
}
