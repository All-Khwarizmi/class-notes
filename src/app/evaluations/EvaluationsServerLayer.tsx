import ErrorDialog from "@/core/components/common/ErrorDialog";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import getEvaluations from "@/features/evaluation/application/adapters/actions/get-evaluations";
import EvaluationTableView from "@/features/evaluation/presentation/views/EvaluationTableView";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function EvaluationsServerLayer() {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherEvals = await getEvaluations({
    userId: authUser.right.userId,
  });
  if (isLeft(eitherEvals)) {
    return (
      <ErrorDialog
        message={eitherEvals.left.message}
        code={eitherEvals.left.code}
      />
    );
  }
  return <EvaluationTableView evaluations={eitherEvals.right} />;
}

export default EvaluationsServerLayer;
