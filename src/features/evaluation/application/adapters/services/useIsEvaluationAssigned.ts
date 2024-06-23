import { useMutation } from "@tanstack/react-query";
import { evaluationUsecases } from "../../usecases/evaluation-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { IsEvaluationAssigned } from "@/features/evaluation/domain/entities/evaluation-types";

export default function useIsEvaluationAssigned() {
  return useMutation({
    mutationKey: ["is-evaluation-assigned"],
    mutationFn: async (options: IsEvaluationAssigned) => {
      return evaluationUsecases.isEvaluationAssigned(options);
    },
  });
}
