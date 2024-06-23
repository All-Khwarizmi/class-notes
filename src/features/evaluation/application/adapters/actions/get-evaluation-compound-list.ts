"use server";

import { evaluationUsecases } from "../../usecases/evaluation-usecases";

export default async function getEvaluationCompoundList(options: {
  classeId: string;
}) {
  return evaluationUsecases.getEvaluationWithGradeList({
    classeId: options.classeId,
  });
}
