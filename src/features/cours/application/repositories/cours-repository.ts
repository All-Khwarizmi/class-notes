import { convexDatabase } from "@/core/data/convex/convex-impl";
import IDatabase from "@/core/data/idatabase";
import { Cours } from "../../domain/entities/cours-schemas";

export default class CoursRepository {
  private readonly _db: IDatabase;

  constructor({ db }: { db: IDatabase }) {
    this._db = db;
  }

  async getAllCours({ userId }: { userId: string }) {
    return this._db.getAllCours({ userId });
  }

  async getSingleCours({
    userId,
    coursId,
  }: {
    userId: string;
    coursId: string;
  }) {
    return this._db.getSingleCours({ userId, coursId });
  }

  async addCours({
    userId,
    cours,
  }: {
    userId: string;
    cours: Omit<Cours, "_id" | "createdAt">;
  }) {
    return this._db.addCours({ userId, cours });
  }
}

export const coursRepository = new CoursRepository({ db: convexDatabase });
