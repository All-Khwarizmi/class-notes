'use server ';

import { DeleteEvaluationWithGradesOptions } from '@/features/evaluation/domain/entities/evaluation-types';

import { evaluationUsecases } from '../../usecases/evaluation-usecases';

export default async function deleteEvaluationWithGrades(
  options: DeleteEvaluationWithGradesOptions
) {
  return evaluationUsecases.deleteEvaluationWithGrades(options);
}
