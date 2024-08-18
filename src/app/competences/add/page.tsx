import { QUERY_KEYS } from "@/core/query/ query-keys";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import CompetenceForm from "@/features/comp-cat/presentation/views/CompetenceForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";

export default async function Page() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.CATEGORY.GET_ALL(),
    queryFn: () =>
      compCatUsecases.getCategories({
        userId: authUser.right.userId,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CompetenceForm userId={authUser.right.userId} />
    </HydrationBoundary>
  );
}
