import { QUERY_KEYS } from "@/core/query/ query-keys";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { classeUsecases } from "@/features/classe/application";
import DashboardGrid from "@/features/dashboard/presentation/views/DashboardGrid";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

async function DashboardServerLayer() {
  const { userId } = await checkAuthAndRedirect();
  const queryClient = new QueryClient();

  const queryBulk = [
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.VISIBILITY.GET_ALL()],
      queryFn: async () => {
        return classeUsecases.getVisibility({ userId });
      },
    }),
  ];

  await Promise.all(queryBulk);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardGrid userId={userId} />
    </HydrationBoundary>
  );
}

export default DashboardServerLayer;
