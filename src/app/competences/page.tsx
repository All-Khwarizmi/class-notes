import { QUERY_KEYS } from "@/core/query/ query-keys";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import CompetencesTable from "@/features/comp-cat/presentation/views/CompetencesTable";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";

export default async function Page() {
  const queryClient = new QueryClient();
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.COMP_CAT.GET_ALL(),
    queryFn: () =>
      compCatUsecases.getCategoriesAndCompetences({
        userId: authUser.right.userId,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompetencesTable userId={authUser.right.userId} />
    </HydrationBoundary>
  );
}
