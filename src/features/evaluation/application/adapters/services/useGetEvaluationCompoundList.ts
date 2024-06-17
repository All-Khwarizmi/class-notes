import { useQuery } from "@tanstack/react-query";
import getEvaluationCompoundList from "../actions/get-evaluation-compound-list";

export default function useGetEvaluationCompoundList(options: {
  classeId: string;
}) {
  return useQuery({
    queryKey: ["evaluation-compound-list"],
    queryFn: async () => {
      return await getEvaluationCompoundList(options);
    },
  });
}
