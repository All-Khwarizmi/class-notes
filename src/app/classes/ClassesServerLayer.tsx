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
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
async function ClassesServerLayer(props: { slug: string }) {
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
