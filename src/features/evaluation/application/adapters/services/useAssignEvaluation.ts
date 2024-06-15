import { AssignEvaluationOptions } from "@/features/evaluation/domain/entities/evaluation-types";
import { useMutation } from "@tanstack/react-query";
import assignEvaluation from "../actions/assign-evaluation";

export default function useAssignEvaluation() {
  return useMutation({
    mutationKey: ["assignEvaluation"],
    mutationFn: async (options: AssignEvaluationOptions) => {
        return assignEvaluation(options);
    },
  });
}
