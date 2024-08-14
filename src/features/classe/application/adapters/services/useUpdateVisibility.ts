import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classeUsecases } from "../../usecases";
import { QUERY_KEYS } from "@/core/query/ query-keys";
export default function useUpdateVisibility() {
  return useMutation({
    mutationKey: [QUERY_KEYS.VISIBILITY.UPDATE()],

    mutationFn: async (options: {
      userId: string;
      type: "classe" | "sequence" | "cours" | "complement";
      typeId: string;
      publish: boolean;
    }) => {
      return classeUsecases.updateVisibility({
        userId: options.userId,
        type: options.type,
        typeId: options.typeId,
        publish: options.publish,
      });
    },
  });
}
