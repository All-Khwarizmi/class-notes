import { QUERY_KEYS } from "@/core/query/ query-keys";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
import { compCatUsecases } from "@/features/comp-cat/application/usecases/comp-cat-usecases";
import EvaluationBaseForm from "@/features/evaluation/presentation/views/EvaluationBaseForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

async function AddEvaluationBaseServerLayer() {
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS
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
      <EvaluationBaseForm userId={userId} />
    </HydrationBoundary>
  );
}

export default AddEvaluationBaseServerLayer;
