import IDatabase from "@/core/data/idatabase";
import { Category } from "../../domain/entities/schemas";
import { convexDatabase } from "@/core/data/convex/convex-impl";

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
}

export const compCatRepository = new CompCatRepository({ db: convexDatabase });
