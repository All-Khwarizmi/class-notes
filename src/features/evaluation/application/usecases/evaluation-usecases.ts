import { Either, isLeft, left, right } from "fp-ts/lib/Either";
import {
  CreateEvaluationOptions,
  GetEvaluationBaseOptions,
  GetEvaluationBasesOptions,
  UpdateEvaluationBaseOptions,
} from "../../domain/entities/evaluation-types";
import EvaluatioRepository, {
  evaluatioRepository,
} from "../repositories/evaluation-repository";
import {
  EvaluationBaseSchema,
  EvaluationBaseType,
} from "../../domain/entities/evaluation-schema";
import Failure from "@/core/failures/failures";
import { id } from "fp-ts/lib/Refinement";

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
    const eitherEval = await this._evaluationRepository.getEvaluationBase(
      options
    );
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
          message: "Invalid Evaluation Base",
          invalidValue: eitherEval.right,
          code: "APP203",
        })
      );
    }

    return right(validatedEval.data);
  }

  async getEvaluationBases(options: GetEvaluationBasesOptions) {
    return await this._evaluationRepository.getEvaluationBases(options);
  }

  async updateEvaluationBase(options: UpdateEvaluationBaseOptions) {
    return await this._evaluationRepository.updateEvaluationBase(options);
  }
}

export const evaluationUsecases = new EvaluationUsecases(evaluatioRepository);
