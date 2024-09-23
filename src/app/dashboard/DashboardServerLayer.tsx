import { QUERY_KEYS } from "@/core/query/ query-keys";
import checkAuthAndRedirect from "@/data-access/auth/check-and-redirect";
import { getCurrentUser } from "@/data-access/user/get-current-user";
import { classeUsecases } from "@/features/classe/application";
import DashboardGrid from "@/features/dashboard/presentation/views/DashboardGrid";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { isNone } from "fp-ts/lib/Option";
import { redirect } from "next/navigation";
import React from "react";
import OnboardingProcess from "./OboardingForm";

async function DashboardServerLayer() {
  const { userId } = await checkAuthAndRedirect();
  const queryClient = new QueryClient();
  const userOption = await getCurrentUser(userId);
  if (isNone(userOption)) {
    return redirect("/");
  }
  const userOnboarding = userOption.value.onboarding;
  if (!userOnboarding) {
    return <OnboardingProcess user={userOption.value} />;
  }
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
