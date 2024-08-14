import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import DashboardGrid from "@/features/dashboard/presentation/views/DashboardGrid";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function DashboardServerLayer() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  return <DashboardGrid userId={authUser.right.userId} />;
}

export default DashboardServerLayer;
