import { QUERY_KEYS } from "@/core/query/ query-keys";
import { toastWrapper } from "@/core/utils/toast-wrapper";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import { DeleteCompCatOptions } from "@/features/comp-cat/domain/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";

export const useDeleteCompCat = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.COMP_CAT.DELETE(),
    mutationFn: async (options: DeleteCompCatOptions) => {
      return compCatUsecases.deleteCompCat(options);
    },
    onSuccess: async (either, variables) => {
      if (isLeft(either)) {
        return toastWrapper.error("An error occurred");
      }
      toastWrapper.success(`${variables.type} deleted successfully`);
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMP_CAT.GET_ALL(),
      });
    },
  });
};
