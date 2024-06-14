import { useQuery } from "@tanstack/react-query";
import { classeUsecases } from "../../usecases/classe-usecases";

export default function useGetVisibility({ userId }: { userId: string }) {
  return useQuery({
    queryKey: ["getVisibility"],
    queryFn: async () => {
      return classeUsecases.getVisibility({
        userId: userId,
      });
    },
  });
}
