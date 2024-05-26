import { isLeft, left } from "fp-ts/lib/Either";
import { Cours, CoursSchema, Sequence } from "../../domain/entities/cours-schemas";
import CoursRepository, {
  coursRepository,
} from "../repositories/cours-repository";
import { right } from "fp-ts/lib/Either";
import Failure from "@/core/failures/failures";

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
}

export const coursUsecases = new CoursUsecases({ repository: coursRepository });
