'use server';

import Failure from '@/core/failures/failures';
import { UpdateGradeOptions } from '@/features/evaluation/domain/entities/evaluation-types';
import { Either } from 'fp-ts/lib/Either';

import { evaluationUsecases } from '../../usecases/evaluation-usecases';

export default async function updateGrade(
  options: UpdateGradeOptions
): Promise<Either<Failure<string>, void>> {
  return evaluationUsecases.updateGrade(options);
}
