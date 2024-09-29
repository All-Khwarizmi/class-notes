import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { DeleteStudentOptions } from '@/features/student/domain/entities/student-types';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

import { studentUsecases } from '../../usecases/student-usecases';

export default function useDeleteStudent() {
  return useMutation({
    mutationKey: QUERY_KEYS.STUDENT.DELETE(),
    mutationFn: async (options: DeleteStudentOptions) => {
      const operationResult = await studentUsecases.deleteStudent(options);
      if (isLeft(operationResult)) {
        toastWrapper.error('An error occured while deleting the student');
      }
    },
  });
}
