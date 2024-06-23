import { useMutation } from "@tanstack/react-query";
import updateGrade from "../actions/update-grade";
import { UpdateGradeOptions } from "@/features/evaluation/domain/entities/evaluation-types";

export default function useUpdateGrade() {
  return useMutation({
    mutationKey: ["update-grade"],
    mutationFn: async (options: {
      options: UpdateGradeOptions;
      classeId: string;
    }) => {
      return updateGrade(options.options);
    },
  });
}
