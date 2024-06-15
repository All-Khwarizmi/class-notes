import { useQuery } from "@tanstack/react-query";
import getEvaluations from "../actions/get-evaluations";

export default function useGetEvaluationsBaseList(options: { userId: string }) {
  return useQuery({
    queryKey: ["getEvaluationsBaseList"],
    queryFn: async () => {
      return await getEvaluations(options);
    },
  });
}
