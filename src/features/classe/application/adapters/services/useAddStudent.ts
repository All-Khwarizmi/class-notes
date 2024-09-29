import { QUERY_KEYS } from '@/core/query/ query-keys';
import { toastWrapper } from '@/core/utils/toast-wrapper';
import { studentUsecases } from '@/features/student/application/usecases/student-usecases';
import { CreateStudentOptions } from '@/features/student/domain/entities/student-types';
import { useMutation } from '@tanstack/react-query';
import { isLeft } from 'fp-ts/lib/Either';

export default function useAddStudent() {
  return useMutation({
    mutationKey: QUERY_KEYS.STUDENT.ADD(),
    mutationFn: async (options: CreateStudentOptions) => {
      const operationResult = await studentUsecases.addStudent(options);
      if (isLeft(operationResult)) {
        toastWrapper.error('Error adding student');
        return;
      }
      toastWrapper.success('Student added successfully');
    },
  });
}
