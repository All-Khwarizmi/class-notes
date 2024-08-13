import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import AddClassForm from "@/features/classe/presentation/components/AddClassForm";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  return <AddClassForm userId={authUser.right.userId} />;
}

export default Page;
