import { QUERY_KEYS } from "@/core/query/ query-keys";
import { useQuery } from "@tanstack/react-query";
import { coursUsecases } from "../../application/usecases/cours-usecases";

export const useGetAllClasseSequences = (options: { classeId: string }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CLASSE.CLASSE_SEQUENCES_GET_ALL()],
    queryFn: async () => {
      return coursUsecases.getClasseSequences({
        classeId: options.classeId,
      });
    },
  });
};
