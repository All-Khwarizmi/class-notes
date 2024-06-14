import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import EvaluationBaseForm from "@/features/evaluation/presentation/views/AddBaseEvaluationForm";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function AddEvaluationBaseServerLayer() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  return <EvaluationBaseForm userId={authUser.right.userId} />;
}

export default AddEvaluationBaseServerLayer;
