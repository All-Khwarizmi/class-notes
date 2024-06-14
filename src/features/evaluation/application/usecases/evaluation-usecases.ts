import {
  CreateEvaluationOptions,
  GetEvaluationBaseOptions,
  GetEvaluationBasesOptions,
  UpdateEvaluationBaseOptions,
} from "../../domain/entities/evaluation-types";
import EvaluatioRepository, {
  evaluatioRepository,
} from "../repositories/evaluation-repository";

export default class EvaluationUsecases {
  private readonly _evaluationRepository: EvaluatioRepository;

  constructor(evaluationRepository: EvaluatioRepository) {
    this._evaluationRepository = evaluationRepository;
  }

  async createEvaluation(options: CreateEvaluationOptions) {
    return await this._evaluationRepository.createEvaluation(options);
  }

  async getEvaluationBase(options: GetEvaluationBaseOptions) {
    return await this._evaluationRepository.getEvaluationBase(options);
  }

  async getEvaluationBases(options: GetEvaluationBasesOptions) {
    return await this._evaluationRepository.getEvaluationBases(options);
  }

  async updateEvaluationBase(options: UpdateEvaluationBaseOptions) {
    return await this._evaluationRepository.updateEvaluationBase(options);
  }
}

export const evaluationUsecases = new EvaluationUsecases(evaluatioRepository);
