import { convexDatabase } from "@/core/data/convex/convex-impl";
import IDatabase from "@/core/data/idatabase";
import {
  CreateEvaluationOptions,
  GetEvaluationBaseOptions,
  GetEvaluationBasesOptions,
  UpdateEvaluationBaseOptions,
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
}

export const evaluatioRepository = new EvaluatioRepository(convexDatabase);
