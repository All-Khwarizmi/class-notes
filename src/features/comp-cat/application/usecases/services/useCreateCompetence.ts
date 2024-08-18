import { compCatUsecases } from "../comp-cat-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/core/query/ query-keys";
import { CreateCompetenceOptions } from "@/features/comp-cat/domain/types";
import { toastWrapper } from "@/core/utils/toast-wrapper";

export default function useCreateCompetence() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationKey: QUERY_KEYS.COMPETENCES.CREATE(),
    mutationFn: async (options: CreateCompetenceOptions) => {
      return compCatUsecases.addCompetence(options);
    },
    onSuccess: async (either) => {
      if (isLeft(either)) {
        toastWrapper.error("Failed to add competence");
        return;
      }
      toastWrapper.success("Competence added");
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMP_CAT.GET_ALL(),
      });
      router.push("/competences");
    },
  });
}
