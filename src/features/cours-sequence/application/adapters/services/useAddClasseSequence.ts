import { coursUsecases } from "../../usecases/cours-usecases";

import { useMutation } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/core/query/ query-keys";

function useAddClasseSequence() {
  return useMutation({
    mutationKey: [QUERY_KEYS.CLASSE.CLASSE_SEQUENCE_ADD()],
    mutationFn: async (options: {
      classeId: string;
      sequenceId: string;
      userId: string;
    }) => coursUsecases.addClassSequence(options),
  });
}

export default useAddClasseSequence;
