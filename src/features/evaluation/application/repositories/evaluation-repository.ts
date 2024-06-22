import { convexDatabase } from "@/core/data/convex/convex-impl";
import IDatabase from "@/core/data/idatabase";
import {
  AssignEvaluationOptions,
  CreateEvaluationOptions,
  DeleteEvaluationBase,
  GetEvaluationBaseOptions,
  GetEvaluationBasesOptions,
  GetEvaluationOptions,
  GetEvaluationsListOptions,
  UpdateEvaluationBaseOptions,
  UpdateGradeOptions,
} from "../../domain/entities/evaluation-types";

export default class EvaluatioRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async createEvaluation(options: CreateEvaluationOptions) {
    return await this._db.createEvaluationBase(options);
  }

  async getEvaluationBase(options: GetEvaluationBaseOptions) {
    return await this._db.getEvaluationBase(options);
  }

  async getEvaluationBases(options: GetEvaluationBasesOptions) {
    return await this._db.getEvaluationBases(options);
  }

  async updateEvaluationBase(options: UpdateEvaluationBaseOptions) {
    return await this._db.updateEvaluationBase(options);
  }

  async assignEvaluation(options: AssignEvaluationOptions) {
    return await this._db.assignEvaluationBaseToClasse(options);
  }

  async deleteEvaluationBase(options: DeleteEvaluationBase) {
    return await this._db.deleteEvaluationBase(options);
  }
  async updateGrade(options: UpdateGradeOptions) {
    return await this._db.updateGrade(options);
  }

  async getEvaluation(options: GetEvaluationOptions) {
    return await this._db.getEvaluationWithGrade(options);
  }

  async getEvaluationsList(options: GetEvaluationsListOptions) {
    return await this._db.getEvaluationsListWithGrade(options);
  }
}

export const evaluatioRepository = new EvaluatioRepository(convexDatabase);
