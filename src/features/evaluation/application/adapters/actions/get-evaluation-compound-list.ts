"use server";

import { evaluationUsecases } from "../../usecases/evaluation-usecases";

export default async function getEvaluationCompoundList(options: {
  classeId: string;
}) {
  return evaluationUsecases.getEvaluationsList({
    classeId: options.classeId,
  });
}
