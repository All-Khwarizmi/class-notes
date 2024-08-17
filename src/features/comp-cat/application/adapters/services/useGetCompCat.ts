import { QUERY_KEYS } from "@/core/query/ query-keys";
import { useQuery } from "@tanstack/react-query";
import { compCatUsecases } from "../../usecases/comp-cat-usecases";

export const useGetCompCat = ({ userId }: { userId: string }) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMP_CAT.GET_ALL(),
    queryFn: () =>
      compCatUsecases.getCategoriesAndCompetences({
        userId,
      }),
  });
};
