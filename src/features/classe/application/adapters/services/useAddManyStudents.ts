import { useMutation } from "@tanstack/react-query";
import { studentUsecases } from "@/features/student/application/usecases/student-usecases";
import {
  CreateManyStudentsOptions,
} from "@/features/student/domain/entities/student-types";
import { QUERY_KEYS } from "@/core/query/ query-keys";
import { isLeft } from "fp-ts/lib/Either";
import { toastWrapper } from "@/core/utils/toast-wrapper";

export default function useAddManyStudents() {
  return useMutation({
    mutationKey: QUERY_KEYS.STUDENT.ADD(),
    mutationFn: async (options: CreateManyStudentsOptions) => {
      const operationResult = await studentUsecases.addManyStudents(options);
      if (isLeft(operationResult)) {
        toastWrapper.error("Error adding students");
        return;
      }
      toastWrapper.success("Students added successfully");
    },
  });
}
