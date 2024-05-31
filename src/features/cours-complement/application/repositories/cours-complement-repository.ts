import IDatabase from "@/core/data/idatabase";

export default class CoursComplementRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }
}
