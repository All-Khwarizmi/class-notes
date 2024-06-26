import { convexDatabase } from "@/core/data/convex/convex-impl";
import IDatabase from "@/core/data/idatabase";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import { deleteSequence } from "../../../../../convex/sequence";
import { getAppDataBase } from "@/core/data/get-app-db";

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

  // async updateCours({
  //   userId,
  //   coursId,
  //   cours,
  // }: {
  //   userId: string;
  //   coursId: string;
  //   cours: Partial<Omit<Cours, "_id" | "createdAt">>;
  // }) {
  //   return this._db.updateCours({ userId, coursId, cours });
  // }

  async updateCoursBody({
    userId,
    coursId,
    body,
  }: {
    userId: string;
    coursId: string;
    body: string;
  }) {
    return this._db.updateCoursBody({ userId, coursId, body });
  }

  async deleteCourse({ coursId }: { coursId: string }) {
    return this._db.deleteCourse({ coursId });
  }

  async addSequence({
    userId,
    sequence,
  }: {
    userId: string;
    sequence: Omit<Sequence, "_id" | "createdAt" | "coursIds">;
  }) {
    return this._db.addSequence({ userId, sequence });
  }

  async getSingleSequence({
    userId,
    sequenceId,
    type,
  }: {
    userId: string;
    sequenceId: string;
    type?: "template" | "sequence";
  }) {
    return this._db.getSingleSequence({ userId, sequenceId, type });
  }

  async addBodyToSequence({
    userId,
    sequenceId,
    body,
    type,
  }: {
    userId: string;
    sequenceId: string;
    body: string;
    type?: "template" | "sequence";
  }) {
    return this._db.addBodyToSequence({ userId, sequenceId, body, type });
  }

  async getAllSequences({ userId }: { userId: string }) {
    return this._db.getSequences({ userId });
  }

  async deleteSequence({
    sequenceId,
    type,
  }: {
    sequenceId: string;
    type: "template" | "sequence";
  }) {
    return this._db.deleteSequence({ sequenceId, type });
  }

  async getAllCoursFromSequence({
    userId,
    sequenceId,
    type,
  }: {
    userId: string;
    sequenceId: string;
    type?: "template" | "sequence";
  }) {
    return this._db.getAllCoursFromSequence({ userId, sequenceId, type });
  }

  async updateCours({ cours }: { cours: Cours }) {
    return this._db.updateCours({ cours });
  }
  async updateSequence({
    sequence,
    type,
  }: {
    sequence: Sequence;
    type?: "template" | "sequence";
  }) {
    return this._db.updateSequence({ sequence, type });
  }

  async addClassSequence({
    sequenceId,
    classeId,
  }: {
    sequenceId: string;
    classeId: string;
  }) {
    return this._db.addClasseSequence({ sequenceId, classeId });
  }
  async getClasseSequences({ classeId }: { classeId: string }) {
    return this._db.getClasseSequences({ classeId });
  }
}

export const coursRepository = new CoursRepository({ db: getAppDataBase() });
