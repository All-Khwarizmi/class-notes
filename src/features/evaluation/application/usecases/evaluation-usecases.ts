import Failure from '@/core/failures/failures';
import { CompoundEvaluationType } from '@/features/classe/domain/class-schema';
import { Either, isLeft, isRight, left, right } from 'fp-ts/lib/Either';

import {
  EvaluationBaseSchema,
  EvaluationBaseType,
} from '../../domain/entities/evaluation-schema';
import {
  AssignEvaluationOptions,
  CreateEvaluationOptions,
  DeleteEvaluationBase,
  GetEvaluationBaseOptions,
  GetEvaluationBasesOptions,
  GetEvaluationOptions,
  GetEvaluationsListOptions,
  GetEvaluationsWithGradesByEvalauationBaseIdOptions,
  UpdateEvaluationBaseOptions,
  UpdateGradeOptions,
} from '../../domain/entities/evaluation-types';
import { EvaluationWithGradeSchema } from '../../domain/entities/evaluation-with-grades-schema';
import EvaluatioRepository, {
  evaluatioRepository,
} from '../repositories/evaluation-repository';

export default class EvaluationUsecases {
  private readonly _evaluationRepository: EvaluatioRepository;

  constructor(evaluationRepository: EvaluatioRepository) {
    this._evaluationRepository = evaluationRepository;
  }

  async createEvaluation(options: CreateEvaluationOptions) {
    return await this._evaluationRepository.createEvaluation(options);
  }

  async getEvaluationBase(
    options: GetEvaluationBaseOptions
  ): Promise<Either<Failure<string>, EvaluationBaseType>> {
    const eitherEval =
      await this._evaluationRepository.getEvaluationBase(options);
    if (isLeft(eitherEval)) {
      return eitherEval;
    }

    const validatedEval = EvaluationBaseSchema.safeParse({
      ...eitherEval.right,
      id: eitherEval.right._id,
    });
    if (!validatedEval.success) {
      return left(
        Failure.invalidValue({
          message: 'Invalid Evaluation Base',
          invalidValue: eitherEval.right,
          code: 'APP203',
        })
      );
    }

    return right(validatedEval.data);
  }

  async getEvaluationBaseList(
    options: GetEvaluationBasesOptions
  ): Promise<Either<Failure<string>, EvaluationBaseType[]>> {
    const eitherEvals =
      await this._evaluationRepository.getEvaluationBases(options);

    if (isLeft(eitherEvals)) {
      return eitherEvals;
    }

    const validatedEvals: EvaluationBaseType[] = [];
    for (const evaluation of eitherEvals.right) {
      const validatedEval = EvaluationBaseSchema.safeParse({
        ...evaluation,
        id: evaluation._id,
      });

      if (validatedEval.success === false) {
        return left(
          Failure.invalidValue({
            message: 'Invalid Evaluation Base',
            invalidValue: evaluation,
            code: 'APP203',
          })
        );
      }
      validatedEvals.push(validatedEval.data);
    }

    return right(validatedEvals);
  }

  async updateEvaluationBase(options: UpdateEvaluationBaseOptions) {
    return await this._evaluationRepository.updateEvaluationBase(options);
  }

  async assignEvaluation(options: AssignEvaluationOptions) {
    return await this._evaluationRepository.assignEvaluation(options);
  }

  async deleteEvaluationBase(
    options: DeleteEvaluationBase
  ): Promise<Either<Failure<string>, void>> {
    const isEvalAssgined = await this.isEvaluationAssigned({
      evaluationId: options.evaluationId,
    });
    if (isLeft(isEvalAssgined)) {
      return isEvalAssgined;
    }
    if (isEvalAssgined.right === true) {
      const assignedEvals =
        await this.getEvaluationsWithGradesByEvaluationBaseId({
          evaluationBaseId: options.evaluationId,
        });
      if (isLeft(assignedEvals)) {
        return assignedEvals;
      }
      const assignedEvalsToDelete = assignedEvals.right.map((evaluation) =>
        this.deleteEvaluationWithGrades({ evaluationId: evaluation._id })
      );
      const assignedEvalDeletions = await Promise.allSettled(
        assignedEvalsToDelete
      );
      const isAlldeleted = assignedEvalDeletions.every(
        (deletion) => deletion.status === 'fulfilled' && isRight(deletion.value)
      );
      if (!isAlldeleted) {
        return left(
          Failure.invalidValue({
            message: 'Failed to delete assigned evaluations',
            invalidValue: assignedEvalDeletions,
            code: 'APP203',
          })
        );
      }
    }
    return await this._evaluationRepository.deleteEvaluationBase(options);
  }

  async deleteEvaluationWithGrades(options: DeleteEvaluationBase) {
    return await this._evaluationRepository.deleteEvaluationWithGrades(options);
  }

  async getEvaluationsWithGradesByEvaluationBaseId(
    options: GetEvaluationsWithGradesByEvalauationBaseIdOptions
  ) {
    return await this._evaluationRepository.getEvaluationsWithGradesByEvaluationBaseId(
      options
    );
  }

  async isEvaluationAssigned(options: { evaluationId: string }) {
    return await this._evaluationRepository.isEvaluationAssigned(options);
  }

  async updateGrade(options: UpdateGradeOptions) {
    return await this._evaluationRepository.updateGrade(options);
  }

  async getEvaluation(options: GetEvaluationOptions) {
    const eitherEval = await this._evaluationRepository.getEvaluation(options);
    if (isLeft(eitherEval)) {
      return eitherEval;
    }
    const validateEval = EvaluationWithGradeSchema.safeParse({
      ...eitherEval.right,
      id: eitherEval.right._id,
    });

    if (!validateEval.success) {
      return left(
        Failure.invalidValue({
          message: 'Invalid Evaluation',
          invalidValue: eitherEval.right,
          code: 'APP203',
        })
      );
    }

    return right(validateEval.data);
  }

  async getEvaluationWithGradeList(
    options: GetEvaluationsListOptions
  ): Promise<Either<Failure<string>, CompoundEvaluationType[]>> {
    const eitherEvals =
      await this._evaluationRepository.getEvaluationsList(options);

    if (isLeft(eitherEvals)) {
      return eitherEvals;
    }
    const validatedEvals: CompoundEvaluationType[] = [];

    for (const evaluation of eitherEvals.right) {
      const validatedEval = EvaluationWithGradeSchema.safeParse({
        ...evaluation,
        id: evaluation._id,
      });

      if (validatedEval.success === false) {
        return left(
          Failure.invalidValue({
            message: 'Invalid Evaluation',
            invalidValue: evaluation,
            code: 'APP203',
          })
        );
      }
      const eitherEvalBase = await this.getEvaluationBase({
        evaluationId: evaluation.evaluationBaseId,
      });
      if (isLeft(eitherEvalBase)) {
        return eitherEvalBase;
      }
      const compoundEval: CompoundEvaluationType = {
        grade: validatedEval.data,
        base: eitherEvalBase.right,
      };

      validatedEvals.push(compoundEval);
    }

    return right(validatedEvals);
  }
}

export const evaluationUsecases = new EvaluationUsecases(evaluatioRepository);
