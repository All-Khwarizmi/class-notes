import { useQuery } from "@tanstack/react-query";
import { classeUsecases } from "../../usecases/classe-usecases";
import { QUERY_KEYS } from "@/core/query/ query-keys";

export default function useGetVisibility({ userId }: { userId: string }) {
  return useQuery({
    queryKey: [QUERY_KEYS.VISIBILITY.GET_ALL()],
    queryFn: async () => {
      return classeUsecases.getVisibility({
        userId: userId,
      });
    },
  });
}
