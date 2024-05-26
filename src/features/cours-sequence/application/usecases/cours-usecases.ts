import { Either, isLeft, left } from "fp-ts/lib/Either";
import {
  Cours,
  CoursSchema,
  Sequence,
  SequenceSchema,
} from "../../domain/entities/cours-schemas";
import CoursRepository, {
  coursRepository,
} from "../repositories/cours-repository";
import { right } from "fp-ts/lib/Either";
import Failure from "@/core/failures/failures";
import { E } from "vitest/dist/reporters-P7C2ytIv.js";

export default class CoursUsecases {
  private readonly _repository: CoursRepository;

  constructor({ repository }: { repository: CoursRepository }) {
    this._repository = repository;
  }

  async getAllCours({ userId }: { userId: string }) {
    return this._repository.getAllCours({ userId });
  }

  async getSingleCours({
    userId,
    coursId,
  }: {
    userId: string;
    coursId: string;
  }) {
    const eitherCours = await this._repository.getSingleCours({
      userId,
      coursId,
    });

    if (isLeft(eitherCours)) {
      return eitherCours;
    }
    const validateCours = CoursSchema.safeParse(eitherCours.right);
    if (!validateCours.success) {
      return left(
        Failure.invalidValue({
          invalidValue: eitherCours.right,
          message: `
          Unable to validate cours with id: ${coursId}
          
            ${JSON.stringify(validateCours.error)}
          `,
        })
      );
    }
    return right(validateCours.data);
  }

  async addCours({
    userId,
    cours,
  }: {
    userId: string;
    cours: Omit<Cours, "_id" | "createdAt">;
  }) {
    return this._repository.addCours({ userId, cours });
  }

  async updateCourseBody({
    userId,
    coursId,
    body,
  }: {
    userId: string;
    coursId: string;
    body: string;
  }) {
    return this._repository.updateCoursBody({ userId, coursId, body });
  }

  async addSequence({
    userId,
    sequence,
  }: {
    userId: string;
    sequence: Omit<Sequence, "_id" | "createdAt" | "coursIds">;
  }) {
    return this._repository.addSequence({ userId, sequence });
  }

  async getSingleSequence({
    userId,
    sequenceId,
  }: {
    userId: string;
    sequenceId: string;
  }): Promise<Either<Failure<string>, Sequence>> {
    const eitherSequence = await this._repository.getSingleSequence({
      userId,
      sequenceId,
    });

    if (isLeft(eitherSequence)) {
      return eitherSequence;
    }
    const validateSequence = SequenceSchema.safeParse(eitherSequence.right);
    if (!validateSequence.success) {
      return left(
        Failure.invalidValue({
          invalidValue: eitherSequence.right,
          message: `
          Unable to validate sequence with id: ${sequenceId}
          
            ${JSON.stringify(validateSequence.error)}
          `,
          code: "APP203",
        })
      );
    }
    return right(validateSequence.data);
  }
}

export const coursUsecases = new CoursUsecases({ repository: coursRepository });