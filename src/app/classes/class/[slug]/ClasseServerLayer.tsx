import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import getStudents from '@/features/classe/application/adapters/actions/get-students';
import { StudentsEvaluationTableView } from '@/features/classe/presentation/components/StudentsEvaluationTableView';
import { coursUsecases } from '@/features/cours-sequence/application/usecases/cours-usecases';
import getEvaluationCompoundList from '@/features/evaluation/application/adapters/actions/get-evaluation-compound-list';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

async function ClasseServerLayer(props: { slug: string }) {
  const { userId } = await checkAuthAndRedirect();

  const queryClient = new QueryClient();

  const queriesBulk = [
    queryClient.prefetchQuery({
      queryKey: ['classe-sequences', props.slug],
      queryFn: () =>
        coursUsecases.getClasseSequences({
          classeId: props.slug,
        }),
    }),

    queryClient.prefetchQuery({
      queryKey: ['compound-evaluations'],
      queryFn: () =>
        getEvaluationCompoundList({
          classeId: props.slug,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: ['students'],
      queryFn: () =>
        getStudents({
          classeId: props.slug,
        }),
    }),
  ];

  await Promise.allSettled(queriesBulk);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudentsEvaluationTableView classeId={props.slug} userId={userId} />
    </HydrationBoundary>
  );
}

export default ClasseServerLayer;
