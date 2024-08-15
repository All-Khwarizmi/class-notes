import { QUERY_KEYS } from "@/core/query/ query-keys";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { classeUsecases } from "@/features/classe/application";
import DashboardGrid from "@/features/dashboard/presentation/views/DashboardGrid";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function DashboardServerLayer() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const queryClient = new QueryClient();

  const queryBulk = [
    queryClient.prefetchQuery({
      queryKey: [QUERY_KEYS.VISIBILITY.GET_ALL()],
      queryFn: async () => {
        return classeUsecases.getVisibility({ userId: authUser.right.userId });
      },
    }),
  ];

  await Promise.all(queryBulk);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardGrid userId={authUser.right.userId} />
    </HydrationBoundary>
  );
}

export default DashboardServerLayer;
