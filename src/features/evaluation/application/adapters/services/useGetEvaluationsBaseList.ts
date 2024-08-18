import { useQuery } from "@tanstack/react-query";
import getEvaluations from "../actions/get-evaluations";
import { QUERY_KEYS } from "@/core/query/ query-keys";

export default function useGetEvaluationsBaseList(options: { userId: string }) {
  return useQuery({
    queryKey: QUERY_KEYS.EVALUATIONS.BASE_GET_ALL(),
    queryFn: async () => {
      return getEvaluations(options);
    },
  });
}
