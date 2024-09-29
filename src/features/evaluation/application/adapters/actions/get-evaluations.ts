'use server';

import Failure from '@/core/failures/failures';
import { EvaluationBaseType } from '@/features/evaluation/domain/entities/evaluation-schema';
import { Either, isLeft } from 'fp-ts/lib/Either';

import { evaluationUsecases } from '../../usecases/evaluation-usecases';

async function getEvaluations(options: {
  userId: string;
}): Promise<Either<Failure<string>, EvaluationBaseType[]>> {
  return evaluationUsecases.getEvaluationBaseList({
    createdBy: options.userId,
  });
}

export default getEvaluations;
