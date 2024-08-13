import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";
import ClassesTable from "@/features/classe/presentation/components/ClassesTable";
import { classeUsecases } from "@/features/classe/application/usecases/classe-usecases";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { QUERY_KEYS } from "@/core/query/ query-keys";
import LayoutServerLayer from "@/core/components/layout/LayoutServerLayer";
async function ClassesServerLayer(props: { slug: string }) {
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
        <ClassesTable userId={authUser.right.userId} />
    </HydrationBoundary>
  );
}

export default ClassesServerLayer;
