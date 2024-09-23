import { QUERY_KEYS } from "@/core/query/ query-keys";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
import getEvaluations from "@/features/evaluation/application/adapters/actions/get-evaluations";
import EvaluationTableView from "@/features/evaluation/presentation/views/EvaluationTableView";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

async function EvaluationsServerLayer() {
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.EVALUATIONS.BASE_GET_ALL(),
    queryFn: async () => {
      return getEvaluations({ userId });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <EvaluationTableView userId={userId} />;
    </HydrationBoundary>
  );
}

export default EvaluationsServerLayer;
