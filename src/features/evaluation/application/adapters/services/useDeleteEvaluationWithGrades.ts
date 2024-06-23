import { DeleteEvaluationWithGradesOptions } from "@/features/evaluation/domain/entities/evaluation-types";
import { useMutation } from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";
import { evaluationUsecases } from "../../usecases/evaluation-usecases";
export default function useDeleteEvaluationWithGrades() {
  return useMutation({
    mutationKey: ["deleteEvaluationWithGrades"],
    mutationFn: async (options: DeleteEvaluationWithGradesOptions) => {
      const operationResult =
        await evaluationUsecases.deleteEvaluationWithGrades(options);
      if (isLeft(operationResult)) {
        toast.error("An error occurred while removing the evaluation", {
          duration: 3000,
        });
        throw new Error("An error occurred while removing the evaluation");
      }
      toast.success("Evaluation removed successfully", { duration: 3000 });
      window.location.reload();
      return;
    },
  });
}
