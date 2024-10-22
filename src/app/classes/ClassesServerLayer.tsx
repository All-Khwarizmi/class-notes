import { QUERY_KEYS } from '@/core/query/ query-keys';
import checkAuthAndRedirect from '@/data-access/auth/check-and-redirect';
import { classeUsecases } from '@/features/classe/application/usecases/classe-usecases';
import ClassesTable from '@/features/classe/presentation/components/ClassesTable';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

async function ClassesServerLayer() {
  const { userId } = await checkAuthAndRedirect();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.CLASSE.GET_ALL(),
    queryFn: () =>
      classeUsecases.getClasses({
        id: userId,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClassesTable userId={userId} />
    </HydrationBoundary>
  );
}

export default ClassesServerLayer;
