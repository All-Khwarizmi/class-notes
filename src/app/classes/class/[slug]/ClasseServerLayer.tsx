import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import getStudents from "@/features/classe/application/adapters/actions/get-students";
import { StudentsEvaluationTableView } from "@/features/classe/presentation/components/StudentsEvaluationTableView";
import { coursUsecases } from "@/features/cours-sequence/application/usecases/cours-usecases";
import getEvaluationCompoundList from "@/features/evaluation/application/adapters/actions/get-evaluation-compound-list";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
async function ClasseServerLayer(props: { slug: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }

  const queryClient = new QueryClient();

  const queriesBulk = [
    queryClient.prefetchQuery({
      queryKey: ["classe-sequences", props.slug],
      queryFn: () =>
        coursUsecases.getClasseSequences({
          classeId: props.slug,
        }),
    }),

    queryClient.prefetchQuery({
      queryKey: ["compound-evaluations",],
      queryFn: () =>
        getEvaluationCompoundList({
          classeId: props.slug,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["students", props.slug],
      queryFn: () =>
        getStudents({
          classeId: props.slug,
        }),
    }),
  ];

  await Promise.allSettled(queriesBulk);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudentsEvaluationTableView
        classeId={props.slug}
        userId={authUser.right.userId}
      />
    </HydrationBoundary>
  );
}

export default ClasseServerLayer;
