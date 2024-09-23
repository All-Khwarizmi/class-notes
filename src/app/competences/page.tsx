import { QUERY_KEYS } from "@/core/query/ query-keys";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import CompetencesTable from "@/features/comp-cat/presentation/views/CompetencesTable";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Page() {
  const { userId } = await checkAuthAndRedirect();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.COMP_CAT.GET_ALL(),
    queryFn: () =>
      compCatUsecases.getCategoriesAndCompetences({
        userId,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompetencesTable userId={userId} />
    </HydrationBoundary>
  );
}
