import { AssignEvaluationOptions } from "@/features/evaluation/domain/entities/evaluation-types";
import { useMutation } from "@tanstack/react-query";
import assignEvaluation from "../actions/assign-evaluation";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function useAssignEvaluation() {
  const { fetchQuery } = useQueryClient();
  return useMutation({
    mutationKey: ["assignEvaluation"],
    mutationFn: async (options: AssignEvaluationOptions) => {
      const operationResult = await assignEvaluation(options);
      if (isLeft(operationResult)) {
        toast.error("An error occurred while assiging the evaluation", {
          duration: 3000,
        });
        return;
      }
      toast.success("Evaluation assigned successfully", { duration: 3000 });
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
}
