import IDatabase from "@/core/data/idatabase";
import { Complement } from "../../domain/complement-schemas";
import { convexDatabase } from "@/core/data/convex/convex-impl";
import { getAppDataBase } from "@/core/data/get-app-db";

export default class ComplementRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async addComplement({
    userId,
    complement,
  }: {
    userId: string;
    complement: Pick<
      Complement,
      | "name"
      | "description"
      | "type"
      | "publish"
      | "coursId"
      | "body"
      | "contentType"
    >;
  }) {
    return this._db.addComplement({ complement, userId });
  }

  async getAllComplement({ coursId }: { coursId: string }) {
    return this._db.getAllComplement({ coursId });
  }

  async getComplement({ id }: { id: string }) {
    return this._db.getComplement({ id });
  }

  async updateComplement({ coursComplement }: { coursComplement: Complement }) {
    return this._db.updateComplement({ coursComplement });
  }

  async deleteComplement({ id }: { id: string }) {
    return this._db.deleteComplement({ id });
  }
}

export const complementRepository = new ComplementRepository(getAppDataBase());
