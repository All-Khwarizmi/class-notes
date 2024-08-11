import { UpdateEvaluationBaseOptions } from "@/features/evaluation/domain/entities/evaluation-types";
import { useMutation } from "@tanstack/react-query";
import { evaluationUsecases } from "../../usecases/evaluation-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
export default function useUpdateBaseEvaluation() {
  const mutation = useMutation({
    mutationKey: ["updateEvaluation"],
    mutationFn: async (options: UpdateEvaluationBaseOptions) => {
      const eitherEval = await evaluationUsecases.updateEvaluationBase(options);
      if (isLeft(eitherEval)) {
        toast.error(eitherEval.left.message);
        console.error(eitherEval.left);
        throw new Error(eitherEval.left.message);
      }
    },
  });

  return mutation;
}
