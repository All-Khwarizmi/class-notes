import { QUERY_KEYS } from '@/core/query/ query-keys';
import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import { getCurrentUser } from '@/data-access/user/get-current-user';
import { classeUsecases } from '@/features/classe/application/usecases/classe-usecases';
import { coursUsecases } from '@/features/cours-sequence/application/usecases/cours-usecases';
import { evaluationUsecases } from '@/features/evaluation/application/usecases/evaluation-usecases';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { isNone } from 'fp-ts/lib/Option';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';

import Layout from './ExperimentalLayout';
import LoaderPage from './LoaderPage';

async function LayoutServerLayer({ children }: { children: React.ReactNode }) {
  const { userId } = await checkAuthAndRedirect();
  const user = await getCurrentUser(userId);
  if (isNone(user)) {
    return redirect('/');
  }
  //! TODO: @DATA-ACCESS
  const queryClient = new QueryClient();
  const batch = [
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.CLASSE.GET_ALL(),
      queryFn: () =>
        classeUsecases.getClasses({
          id: userId,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.SEQUENCE.GET_ALL(),
      queryFn: () =>
        coursUsecases.getAllSequences({
          userId,
        }),
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.EVALUATIONS.BASE_GET_ALL(),
      queryFn: () =>
        evaluationUsecases.getEvaluationBaseList({
          createdBy: userId,
        }),
    }),
  ];
  // Since the prefetchQuery method does not throw an error, we no need to handle it here by using allSettled or try/catch
  await Promise.allSettled(batch);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoaderPage />}>
        <Layout userId={userId} hostname={user.value.hostname}>
          {children}
        </Layout>
      </Suspense>
    </HydrationBoundary>
  );
}

export default LayoutServerLayer;
