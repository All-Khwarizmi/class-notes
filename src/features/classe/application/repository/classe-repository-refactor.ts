import IDatabase from "@/core/data/idatabase";
import { isLeft, left } from "fp-ts/lib/Either";
import { ClassType } from "../../domain/class-schema";
import ClassEntity from "../../domain/class-entity";
import Failure from "@/core/failures/failures";
import { right } from "fp-ts/lib/Either";
import { getAppDataBase } from "@/core/data/get-app-db";
import {
  CreateClasseOptions,
  DeleteClasseOptions,
} from "../../domain/classe-types";

export default class ClasseRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }

  async createClasse(options: CreateClasseOptions) {
    return await this._db.createClass(options);
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

  async deleteClasseSequencesFromClasseId(options: DeleteClasseOptions) {
    return this._db.deleteClassesSequenceFromClasse(options);
  }

  async deleteEvualuationsWithGradesFromClasseId(options: DeleteClasseOptions) {
    return this._db.deleteEvaluationsWithGradesFromClasse(options);
  }

  async deleteStudentsFromClasseId(options: DeleteClasseOptions) {
    return this._db.deleteStudentsFromClasseId(options);
  }
}

export const classeRepository = new ClasseRepository(getAppDataBase());
