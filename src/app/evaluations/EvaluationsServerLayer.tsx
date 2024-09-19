import { QUERY_KEYS } from "@/core/query/ query-keys";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import getEvaluations from "@/features/evaluation/application/adapters/actions/get-evaluations";
import EvaluationTableView from "@/features/evaluation/presentation/views/EvaluationTableView";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function EvaluationsServerLayer() {
  const queryClient = new QueryClient();
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/");
  }
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.EVALUATIONS.BASE_GET_ALL(),
    queryFn: async () => {
      return getEvaluations({ userId: authUser.right.userId });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EvaluationTableView userId={authUser.right.userId} />;
    </HydrationBoundary>
  );
}

export default EvaluationsServerLayer;
