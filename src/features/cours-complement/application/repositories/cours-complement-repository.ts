import IDatabase from "@/core/data/idatabase";
import { CoursComplement } from "../../domain/cours-complement-schemas";

export default class CoursComplementRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async addCoursComplement({
    userId,
    coursComplement,
  }: {
    userId: string;
    coursComplement: Omit<CoursComplement, "_id" | "createdAt">;
  }) {
    return this._db.addCoursComplement({ coursComplement, userId });
  }

  async getAllCoursComplement({ coursId }: { coursId: string }) {
    return this._db.getAllCoursComplement({ coursId });
  }

  async getCoursComplement({ id }: { id: string }) {
    return this._db.getCoursComplement({ id });
  }

  async updateCoursComplement({
    coursComplement,
  }: {
    coursComplement: CoursComplement;
  }) {
    return this._db.updateCoursComplement({ coursComplement });
  }
}
