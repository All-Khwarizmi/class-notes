import { DeleteEvaluationWithGradesOptions } from "@/features/evaluation/domain/entities/evaluation-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";
import deleteEvaluationWithGrades from "../actions/delete-evaluation-with-grades";
import { evaluationUsecases } from "../../usecases/evaluation-usecases";

export default function useDeleteEvaluationWithGrades() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteEvaluationWithGrades"],
    mutationFn: async (options: {
      options: DeleteEvaluationWithGradesOptions;
      refetchCompoundEvaluations: () => void;
      refetchAlreadyAssignedEvaluations: () => void;
      classeId: string;
    }) => {
      const operationResult =
        await evaluationUsecases.deleteEvaluationWithGrades(options.options);
      if (isLeft(operationResult)) {
        toast.error("An error occurred while removing the evaluation", {
          duration: 3000,
        });

        return;
      }
      toast.success("Evaluation removed successfully", { duration: 3000 });
      return;
    },
    onSuccess: (
      _,
      {
        refetchCompoundEvaluations,
        refetchAlreadyAssignedEvaluations,
        classeId,
      }
    ) => {
      // Invalidate and refetch relevant queries after successful deletion
      queryClient.invalidateQueries({ queryKey: ["getEvaluationsBaseList"] });
      queryClient.invalidateQueries({
        queryKey: ["compound-evaluations"],
      });
    },
  });
}
