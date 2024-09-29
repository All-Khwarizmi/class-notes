'use server';

import Failure from '@/core/failures/failures';
import { AssignEvaluationOptions } from '@/features/evaluation/domain/entities/evaluation-types';
import { Either } from 'fp-ts/lib/Either';

import { evaluationUsecases } from '../../usecases/evaluation-usecases';

export default async function assignEvaluation(
  options: AssignEvaluationOptions
): Promise<Either<Failure<string>, string>> {
  return evaluationUsecases.assignEvaluation(options);
}
