import { QUERY_KEYS } from "@/core/query/ query-keys";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import EvaluationBaseForm from "@/features/evaluation/presentation/views/EvaluationBaseForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function AddEvaluationBaseServerLayer() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.COMP_CAT.GET_ALL(),
    queryFn: () =>
      compCatUsecases.getCategoriesAndCompetences({
        userId: authUser.right.userId,
      }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EvaluationBaseForm userId={authUser.right.userId} />
    </HydrationBoundary>
  );
}

export default AddEvaluationBaseServerLayer;
