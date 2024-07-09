import React, { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { classeUsecases } from "@/features/classe/application/usecases/classe-usecases";

import { QUERY_KEYS } from "@/core/query/ query-keys";
import Layout from "./ExperimentalLayout";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { Loader } from "lucide-react";
async function LayoutServerLayer({ children }: { children: React.ReactNode }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.CLASSE.GET_ALL(),
    queryFn: () =>
      classeUsecases.getClasses({
        id: authUser.right.userId,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loader className="animate-spin" />}>
        <Layout userId={authUser.right.userId}>{children}</Layout>
      </Suspense>
    </HydrationBoundary>
  );
}

export default LayoutServerLayer;
