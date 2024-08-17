import React from "react";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import SequencesListView from "@/features/cours-sequence/presentation/views/SequencesListView";
import ErrorDialog from "@/core/components/common/ErrorDialog";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/core/query/ query-keys";

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

  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.SEQUENCE.GET_ALL()],
    queryFn: async () => {
      return coursUsecases.getAllSequences({
        userId: authUser.right.userId,
      });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SequencesListView
        userId={authUser.right.userId}
        sequenceType={type as "template" | "sequence"}
        sequenceId={params.slug}
      />
    </HydrationBoundary>
  );
}

export default SequencesServerLayer;
