import { useMutation } from "@tanstack/react-query";
import updateGrade from "../actions/update-grade";
import { UpdateGradeOptions } from "@/features/evaluation/domain/entities/evaluation-types";
import { revalidatePath } from "next/cache";

export default function useUpdateGrade() {
  return useMutation({
    mutationKey: ["update-grade"],
    mutationFn: async (options: UpdateGradeOptions) => {
      return updateGrade(options);
    },
    onSuccess: () => {
      //! Revalidate the cache for the classes page
      revalidatePath("/classes");
    },
  });
}
