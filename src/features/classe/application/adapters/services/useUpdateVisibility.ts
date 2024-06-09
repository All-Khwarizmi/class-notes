import { useMutation, useQueryClient } from "@tanstack/react-query";
import { classeUsecases } from "../../usecases";
export default function useUpdateVisibility() {
  const queryCLient = useQueryClient();
  return useMutation({
    mutationKey: ["updateVisibility"],

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
    onSuccess: () => {
      // queryCLient.refetchQueries({ queryKey: ["getVisibility"] });
        queryCLient.invalidateQueries({ queryKey: ["getVisibility"] });
    },
  });
}
