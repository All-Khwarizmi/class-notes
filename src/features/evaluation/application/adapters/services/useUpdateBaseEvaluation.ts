import { UpdateEvaluationBaseOptions } from '@/features/evaluation/domain/entities/evaluation-types';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import { revalidatePath } from 'next/cache';
import { toast } from 'sonner';

import { evaluationUsecases } from '../../usecases/evaluation-usecases';

export default function useUpdateBaseEvaluation() {
  const mutation = useMutation({
    mutationKey: ['updateEvaluation'],
    mutationFn: async (options: UpdateEvaluationBaseOptions) => {
      const eitherEval = await evaluationUsecases.updateEvaluationBase(options);
      if (isLeft(eitherEval)) {
        toast.error(eitherEval.left.message);
        console.error(eitherEval.left);
        throw new Error(eitherEval.left.message);
      }
    },
  });

  return mutation;
}
