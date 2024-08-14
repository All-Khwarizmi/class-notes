import { getAppDataBase } from "@/core/data/get-app-db";
import IDatabase from "@/core/data/idatabase";
import { Update } from "next/dist/build/swc";
import { GetVisibilityOptions, UpdateVisibilityOptions } from "../../domain/types";

export default class VisibilityRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async getVisibility({ userId }: GetVisibilityOptions) {
    return this._db.getVisibility({ id: userId });
  }

  async updateVisibility({
    userId,
    publish,
    type,
    typeId,
  }: UpdateVisibilityOptions) {
    return this._db.updateVisibility({ userId, publish, type, typeId });
  }

    async addClasseToVisibility({ userId, entity }: any) {
        return this._db.addClasseToVisibility({ userId, entity });
    }
}

export const visibilityRepository = new VisibilityRepository(getAppDataBase());
