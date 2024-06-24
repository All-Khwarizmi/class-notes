import { convexDatabase } from "@/core/data/convex/convex-impl";
import IDatabase from "@/core/data/idatabase";
import { isLeft, left } from "fp-ts/lib/Either";
import { ClassType } from "../../domain/class-schema";
import ClassEntity from "../../domain/class-entity";
import Failure from "@/core/failures/failures";
import { right } from "fp-ts/lib/Either";
import { getAppDataBase } from "@/core/data/get-app-db";

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

  async updateClasseVisibility({
    id,
    visibility,
  }: {
    id: string;
    visibility: boolean;
  }) {
    return this._db.updateClassVisibility({ id, visibility });
  }

  async getVisibility({ userId }: { userId: string }) {
    return this._db.getVisibility({ id: userId });
  }

  async updateVisibility({
    userId,
    publish,
    type,
    typeId,
  }: {
    userId: string;
    publish: boolean;
    type: "classe" | "sequence" | "cours" | "complement";
    typeId: string;
  }) {
    return this._db.updateVisibility({ userId, publish, type, typeId });
  }
}

export const classeRepository = new ClasseRepository(getAppDataBase());
