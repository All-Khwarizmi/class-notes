import IDatabase from "@/core/data/idatabase";
import { Complement } from "../../domain/complement-schemas";
import { convexDatabase } from "@/core/data/convex/convex-impl";

export default class ComplementRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async addCoursComplement({
    userId,
    coursComplement,
  }: {
    userId: string;
    coursComplement: Omit<Complement, "_id" | "createdAt">;
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
    coursComplement: Complement;
  }) {
    return this._db.updateCoursComplement({ coursComplement });
  }
}

export const complementRepository = new ComplementRepository(convexDatabase);
