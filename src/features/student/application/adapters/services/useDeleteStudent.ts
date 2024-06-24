import { QUERY_KEYS } from "@/core/query/ query-keys";
import { DeleteStudentOptions } from "@/features/student/domain/entities/student-types";
import { useMutation } from "@tanstack/react-query";
import { studentUsecases } from "../../usecases/student-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { toastWrapper } from "@/core/utils/toast-wrapper";

export default function useDeleteStudent() {
  return useMutation({
    mutationKey: QUERY_KEYS.STUDENT.DELETE(),
    mutationFn: async (options: DeleteStudentOptions) => {
      const operationResult = await studentUsecases.deleteStudent(options);
      if (isLeft(operationResult)) {
        toastWrapper.error("An error occured while deleting the student");
      }
      
    },
  });
}
