import React from "react";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import SequencesListView from "@/features/cours-sequence/presentation/views/SequencesListView";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/core/query/ query-keys";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";

async function SequencesServerLayer({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key in string]: string };
}) {
  const { type } = searchParams;
  if (!type || (type !== "template" && type !== "sequence")) {
    return (
      <ErrorDialog
        message="Invalid params"
        code="PRE301"
        description="Invalid params"
      />
    );
  }
  const { userId } = await checkAuthAndRedirect();

  //! TODO: @DATA-ACCESS
  const queryClient = new QueryClient();
  if (type === "sequence" && !params.slug) {
    return (
      <ErrorDialog
        message="Invalid params"
        code="PRE301"
        description="Invalid params"
      />
    );
  }

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.SEQUENCE.GET_ALL()],
    queryFn: async () => {
      return coursUsecases.getAllSequences({
        userId,
      });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SequencesListView
        userId={userId}
        sequenceType={type as "template" | "sequence"}
        sequenceId={params.slug}
      />
    </HydrationBoundary>
  );
}

export default SequencesServerLayer;
