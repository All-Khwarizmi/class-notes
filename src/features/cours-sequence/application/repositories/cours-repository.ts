import IDatabase from "@/core/data/idatabase";
import { Cours, Sequence } from "../../domain/entities/cours-schemas";
import { getAppDataBase } from "@/core/data/get-app-db";
import VisibilityRepository, {
  visibilityRepository,
} from "@/features/visibility/application/repositories/visibility-repository";
import { isLeft } from "fp-ts/lib/Either";

export default class CoursRepository {
  private readonly _db: IDatabase;
  private readonly _visibilityRepository: VisibilityRepository;

  constructor({
    db,
    visibilityRepository,
  }: {
    db: IDatabase;
    visibilityRepository: VisibilityRepository;
  }) {
    this._db = db;
    this._visibilityRepository = visibilityRepository;
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
    userId,
  }: {
    sequenceId: string;
    type: "template" | "sequence";
    userId: string;
  }) {
    if (type === "sequence") {
      await this._visibilityRepository.deleteClasseFromVisibility({
        userId,
        typeId: sequenceId,
        type,
      });
    }
    const operationResult = await this._db.deleteSequence({ sequenceId, type });

    return operationResult;
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
    userId,
  }: {
    sequenceId: string;
    classeId: string;
    userId: string;
  }) {
    const operationResult = await this._db.addClasseSequence({
      sequenceId,
      classeId,
    });
    if (isLeft(operationResult)) {
      return operationResult;
    }
    const id = operationResult.right;

    const sequence = await this.getSingleSequence({
      userId,
      sequenceId,
      type: "template",
    });

    if (isLeft(sequence)) {
      return sequence;
    }

    const visibilityOperationResult =
      await this._visibilityRepository.addSequenceToVisibility({
        userId,
        entity: {
          id,
          name: sequence.right.name,
          description: sequence.right.description ?? "",
          publish: false,
          classeId,
          classe: false,
        },
      });

    if (isLeft(visibilityOperationResult)) {
      return visibilityOperationResult;
    }

    return operationResult;
  }
  async getClasseSequences({ classeId }: { classeId: string }) {
    return this._db.getClasseSequences({ classeId });
  }
}

export const coursRepository = new CoursRepository({
  db: getAppDataBase(),
  visibilityRepository,
});
