import { convexDatabase } from "@/core/data/convex/convex-impl";
import IDatabase from "@/core/data/idatabase";

export default class ClasseRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async createClasse({
    userId,
    name,
    description,
    imageUrl,
  }: {
    userId: string;
    name: string;
    description: string;
    imageUrl: string;
  }) {
    return await this._db.createClass({ userId, name, description, imageUrl });
  }

  async deleteClasse({ id }: { id: string }) {
    return await this._db.deleteClass({ id });
  }

  async getClasse({ id }: { id: string }) {
    return await this._db.getClass({ id });
  }

  async getClasses({ id }: { id: string }) {
    return await this._db.getClasses({ id });
  }
}

export const classeRepository = new ClasseRepository(convexDatabase);
