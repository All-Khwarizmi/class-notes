import { DeleteEvaluationBase } from "@/features/evaluation/domain/entities/evaluation-types";
import { useMutation } from "@tanstack/react-query";
import { evaluationUsecases } from "../../usecases/evaluation-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";

export default function useDeleteEvaluationBase() {
  return useMutation({
    mutationKey: ["delete-evaluation-base"],
    mutationFn: async (options: DeleteEvaluationBase) => {
      const operationResult = await evaluationUsecases.deleteEvaluationBase(
        options
      );
      if (isLeft(operationResult)) {
        toast.error("An error occurred while deleting the evaluation base", {
          position: "top-center",
          duration: 3000,
        });
      } else {
        toast.success("Evaluation base deleted successfully", {
          position: "top-center",
          duration: 3000,
        });
        window.location.reload();
      }
    },
  });
}
