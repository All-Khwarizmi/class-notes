import { CreateEvaluationOptions } from '@/features/evaluation/domain/entities/evaluation-types';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import { toast } from 'sonner';

import { evaluationUsecases } from '../../usecases/evaluation-usecases';

export default function useCreateBaseEvaluation() {
  const mutation = useMutation({
    mutationKey: ['createEvaluation'],
    mutationFn: async (options: CreateEvaluationOptions) => {
      const eitherEval = await evaluationUsecases.createEvaluation(options);
      if (isLeft(eitherEval)) {
        toast.error(eitherEval.left.message);
        console.error(eitherEval.left);
        throw new Error(eitherEval.left.message);
      }
    },
  });

  return mutation;
}
