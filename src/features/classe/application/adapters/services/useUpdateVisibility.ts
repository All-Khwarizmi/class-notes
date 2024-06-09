import { useMutation } from "@tanstack/react-query";
import { classeUsecases } from "../../usecases";
import { useRouter } from "next/router";
export default function useUpdateVisibility() {
  const router = useRouter();
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
      router.reload();
    },
  });
}
