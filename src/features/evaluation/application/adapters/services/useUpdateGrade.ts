import { UpdateGradeOptions } from '@/features/evaluation/domain/entities/evaluation-types';
import { useMutation } from '@tanstack/react-query';

import updateGrade from '../actions/update-grade';

export default function useUpdateGrade() {
  return useMutation({
    mutationKey: ['update-grade'],
    mutationFn: async (options: {
      options: UpdateGradeOptions;
      classeId: string;
    }) => {
      return updateGrade(options.options);
    },
  });
}
