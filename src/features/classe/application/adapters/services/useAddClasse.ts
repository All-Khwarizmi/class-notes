import { QUERY_KEYS } from "@/core/query/ query-keys";
import { CreateClasseOptions } from "@/features/classe/domain/classe-types";
import { useMutation } from "@tanstack/react-query";
import { classeUsecases } from "../../usecases";
import { isLeft } from "fp-ts/lib/Either";
import { toastWrapper } from "@/core/utils/toast-wrapper";

export default function useAddClasse() {
  return useMutation({
    mutationKey: QUERY_KEYS.CLASSE.CREATE(),
    mutationFn: async (options: CreateClasseOptions) => {
      const operationResult = await classeUsecases.createClasse(options);
      if (isLeft(operationResult)) {
        toastWrapper.error("Could not create classe");
      }
      toastWrapper.success("Classe created successfully");
    },
  });
}
