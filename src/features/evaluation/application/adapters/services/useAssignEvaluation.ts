import { AssignEvaluationOptions } from '@/features/evaluation/domain/entities/evaluation-types';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';
import { toast } from 'sonner';

import assignEvaluation from '../actions/assign-evaluation';

export default function useAssignEvaluation() {
  return useMutation({
    mutationKey: ['assignEvaluation'],
    mutationFn: async (options: {
      options: AssignEvaluationOptions;
      refetchCompoundEvaluations: () => void;
    }) => {
      const operationResult = await assignEvaluation({
        evaluationId: options.options.evaluationId,
        classeId: options.options.classeId,
      });
      if (isLeft(operationResult)) {
        toast.error('An error occurred while assiging the evaluation', {
          duration: 3000,
        });
        return;
      }
      toast.success('Evaluation assigned successfully', { duration: 3000 });

      return;
    },
    onSuccess: (_, { refetchCompoundEvaluations }) => {
      refetchCompoundEvaluations();
    },
  });
}
