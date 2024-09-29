'use server';

import Failure from '@/core/failures/failures';
import { EvaluationBaseType } from '@/features/evaluation/domain/entities/evaluation-schema';
import { Either } from 'fp-ts/lib/Either';

import { evaluationUsecases } from '../../usecases/evaluation-usecases';

async function getEvaluation(options: {
  evaluationId: string;
}): Promise<Either<Failure<string>, EvaluationBaseType>> {
  return evaluationUsecases.getEvaluationBase({
    evaluationId: options.evaluationId,
  });
}

export default getEvaluation;
