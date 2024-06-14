"use server";

import { Either, isLeft } from "fp-ts/lib/Either";
import { evaluationUsecases } from "../../../usecases/evaluation-usecases";
import Failure from "@/core/failures/failures";
import { EvaluationBaseType } from "@/features/evaluation/domain/entities/evaluation-schema";

async function getEvaluations(options: {
  userId: string;
}): Promise<Either<Failure<string>, EvaluationBaseType[]>> {
  return evaluationUsecases.getEvaluationBases({
    createdBy: options.userId,
  });
}

export default getEvaluations;
