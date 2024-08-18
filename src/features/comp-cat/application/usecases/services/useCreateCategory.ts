import { compCatUsecases } from "../comp-cat-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/core/query/ query-keys";
import { CreateCategoryOptions } from "@/features/comp-cat/domain/types";
import { toastWrapper } from "@/core/utils/toast-wrapper";

export default function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: QUERY_KEYS.CATEGORY.CREATE(),
    mutationFn: async (options: CreateCategoryOptions) => {
      return compCatUsecases.addCategory({
        userId: options.createdBy,
        category: {
          name: options.name,
          description: options.description,
          createdBy: options.createdBy,
        },
      });
    },
    onSuccess: async (either) => {
      if (isLeft(either)) {
        toastWrapper.error("Failed to add category");
        return;
      }
      toastWrapper.success("Category added");
      await queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.COMP_CAT.GET_ALL(),
          QUERY_KEYS.CATEGORY.GET_ALL(),
        ],
        type: "all",
      });
    },
  });
}
