import { QUERY_KEYS } from "@/core/query/ query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { compCatUsecases } from "../../usecases/comp-cat-usecases";
import { UpdateCompCatOptions } from "@/features/comp-cat/domain/types";
import { isLeft } from "fp-ts/lib/Either";
import { toastWrapper } from "@/core/utils/toast-wrapper";

export const useUpdateCompCat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.COMP_CAT.UPDATE()],
    mutationFn: async (options: UpdateCompCatOptions) =>
      compCatUsecases.updateCompCat(options),
    onSuccess: (either, variables) => {
      if (isLeft(either)) {
        return toastWrapper.error("An error occurred");
      }
      toastWrapper.success(`${variables.type} updated successfully`);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMP_CAT.GET_ALL(),
      });
    },
  });
};
