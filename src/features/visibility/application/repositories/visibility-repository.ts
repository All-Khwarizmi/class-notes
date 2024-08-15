import { getAppDataBase } from "@/core/data/get-app-db";
import IDatabase from "@/core/data/idatabase";
import { Update } from "next/dist/build/swc";
import {
  AddClasseToVisibilityOptions,
  AddComplementToVisibilityOptions,
  AddCoursToVisibilityOptions,
  AddSequenceToVisibilityOptions,
  DeleteEntityFromVisibilityOptions,
  GetVisibilityOptions,
  UpdateVisibilityOptions,
} from "../../domain/types";

export default class VisibilityRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async getVisibility({ userId }: GetVisibilityOptions) {
    return this._db.getVisibility({ id: userId });
  }
  async updateVisibility(options: UpdateVisibilityOptions) {
    return this._db.updateVisibility(options);
  }

  async addClasseToVisibility(options: AddClasseToVisibilityOptions) {
    return this._db.addClasseToVisibility(options);
  }

  async addSequenceToVisibility(options: AddSequenceToVisibilityOptions) {
    return this._db.addSequenceToVisibility(options);
  }

  async addCoursToVisibility(options: AddCoursToVisibilityOptions) {
    return this._db.addCoursToVisibility(options);
  }

  async addComplementToVisibility(options: AddComplementToVisibilityOptions) {
    return this._db.addComplementToVisibility(options);
  }

  async deleteClasseFromVisibility(options: DeleteEntityFromVisibilityOptions) {
    return this._db.deleteEntityFromVisibilityTable(options);
  }
}

export const visibilityRepository = new VisibilityRepository(getAppDataBase());
