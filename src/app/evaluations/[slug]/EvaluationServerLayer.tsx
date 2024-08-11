import ErrorDialog from "@/core/components/common/ErrorDialog";
import { authUseCases } from "@/features/auth/application/usecases/auth-usecases";
import getEvaluation from "@/features/evaluation/application/adapters/actions/get-evaluation";
import EvaluationBaseForm from "@/features/evaluation/presentation/views/EvaluationBaseForm";
import { isLeft } from "fp-ts/lib/Either";
import { redirect } from "next/navigation";
import React from "react";

async function EvaluationServerLayer(props: { evaluationId: string }) {
  const authUser = await authUseCases.getUserAuth();
  if (isLeft(authUser)) {
    redirect("/login");
  }
  const eitherEval = await getEvaluation({
    evaluationId: props.evaluationId,
  });
  if (isLeft(eitherEval)) {
    return (
      <ErrorDialog
        message={eitherEval.left.message}
        code={eitherEval.left.code}
      />
    );
  }
  return (
    <EvaluationBaseForm
      evaluation={eitherEval.right}
      userId={authUser.right.userId}
    />
  );
}

export default EvaluationServerLayer;
