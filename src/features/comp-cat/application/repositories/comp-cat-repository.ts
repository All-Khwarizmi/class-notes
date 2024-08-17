import IDatabase from "@/core/data/idatabase";
import { Category } from "../../domain/entities/schemas";
import { convexDatabase } from "@/core/data/convex/convex-impl";
import { getAppDataBase } from "@/core/data/get-app-db";
import { GetCompetenceOptions } from "../../domain/types";

export default class CompCatRepository {
  private readonly _db: IDatabase;
  constructor(options: { db: IDatabase }) {
    this._db = options.db;
  }

  async getCategories({ userId }: { userId: string }) {
    return this._db.getCategories({ userId });
  }

  async addCategory({
    userId,
    category,
  }: {
    userId: string;
    category: Omit<Category, "_id">;
  }) {
    return this._db.addCategory({ userId, category });
  }

  async getCompetences({ userId }: { userId: string }) {
    return this._db.getCompetences({ userId });
  }

  async addCompetence({
    userId,
    category,
    competence,
  }: {
    userId: string;
    category: string;
    competence: any;
  }) {
    return this._db.addCompetence({ userId, category, competence });
  }

  async getCompetence(options: GetCompetenceOptions) {
    return this._db.getCompetence(options);
  }
}

export const compCatRepository = new CompCatRepository({
  db: getAppDataBase(),
});
