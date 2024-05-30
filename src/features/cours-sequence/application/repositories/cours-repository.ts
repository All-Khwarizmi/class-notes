import { convexDatabase } from "@/core/data/convex/convex-impl";
import IDatabase from "@/core/data/idatabase";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";

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
  }: {
    userId: string;
    sequenceId: string;
  }) {
    return this._db.getSingleSequence({ userId, sequenceId });
  }

  async addBodyToSequence({
    userId,
    sequenceId,
    body,
  }: {
    userId: string;
    sequenceId: string;
    body: string;
  }) {
    return this._db.addBodyToSequence({ userId, sequenceId, body });
  }

  async getAllSequences({ userId }: { userId: string }) {
    return this._db.getSequences({ userId });
  }

  async getAllCoursFromSequence({
    userId,
    sequenceId,
  }: {
    userId: string;
    sequenceId: string;
  }) {
    return this._db.getAllCoursFromSequence({ userId, sequenceId });
  }

  async updateCours({ cours }: { cours: Cours }) {
    return this._db.updateCours({ cours });
  }
}

export const coursRepository = new CoursRepository({ db: convexDatabase });
