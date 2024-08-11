import { QUERY_KEYS } from "@/core/query/ query-keys";
import { toastWrapper } from "@/core/utils/toast-wrapper";
import { useMutation } from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { studentUsecases } from "../../usecases/student-usecases";
import { UpdateStudentOptions } from "@/features/student/domain/entities/student-types";

export default function useUpdateStudent() {
  return useMutation({
    mutationKey: QUERY_KEYS.STUDENT.UPDATE(),
    mutationFn: async (options: UpdateStudentOptions) => {
      const operationResult = await studentUsecases.updateStudent(options);
      if (isLeft(operationResult)) {
        toastWrapper.error("An error occured while updating the student");
      }
    },
  });
}
