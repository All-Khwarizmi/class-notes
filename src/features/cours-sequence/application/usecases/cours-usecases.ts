import { Either, isLeft, left } from "fp-ts/lib/Either";
import {
  ClasseSequence,
  ClasseSequenceSchema,
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
import ComplementUsecases, {
  complementUsecases,
} from "@/features/complement/application/usecases/complement-usecases";

export default class CoursUsecases {
  private readonly _repository: CoursRepository;
  private readonly _complementUsecases: ComplementUsecases;

  constructor({
    repository,
    complementUsecases,
  }: {
    repository: CoursRepository;
    complementUsecases: ComplementUsecases;
  }) {
    this._repository = repository;
    this._complementUsecases = complementUsecases;
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
  }): Promise<Either<Failure<string>, Cours>> {
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

  async deleteCourse({ coursId }: { coursId: string }) {
    const courseComplements =
      await this._complementUsecases.getAllCoursComplement({
        coursId,
      });
    if (isLeft(courseComplements)) {
      return courseComplements;
    }
    const complementsToDelete = courseComplements.right.map((complement) =>
      this._complementUsecases.deleteCoursComplement({ id: complement.id })
    );
    const complementsDeletionResult = await Promise.allSettled(
      complementsToDelete
    );
    // Check if all complements are deleted
    const complementsDeleted = complementsDeletionResult.every(
      (complement) => complement.status === "fulfilled"
    );
    if (!complementsDeleted) {
      return left(
        Failure.invalidValue({
          invalidValue: complementsDeletionResult,
          message: "Unable to delete all complements",
          code: "APP203",
        })
      );
    }
    // Thinking about consistency, we should delete the cours only if all complements are deleted. Also, we can think about the deleted complements as a log of the deleted cours.
    const coursDeletionResult = await this._repository.deleteCourse({
      coursId,
    });
    return coursDeletionResult;
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

  async updateSequence({
    sequence,
    type,
  }: {
    sequence: Sequence;
    type?: "template" | "sequence";
  }) {
    return this._repository.updateSequence({ sequence, type });
  }

  async getSingleSequence({
    userId,
    sequenceId,
    type,
  }: {
    userId: string;
    sequenceId: string;
    type?: "template" | "sequence";
  }): Promise<Either<Failure<string>, Sequence>> {
    const eitherSequence = await this._repository.getSingleSequence({
      userId,
      sequenceId,
      type,
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
    return this._repository.addBodyToSequence({
      userId,
      sequenceId,
      body,
      type,
    });
  }

  async getAllSequences({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, Sequence[]>> {
    const eitherSequences = await this._repository.getAllSequences({ userId });

    if (isLeft(eitherSequences)) {
      return eitherSequences;
    }
    const validateSequences: Sequence[] = [];

    for (const sequence of eitherSequences.right) {
      const validateSequence = SequenceSchema.safeParse(sequence);
      if (!validateSequence.success) {
        return left(
          Failure.invalidValue({
            invalidValue: sequence,
            message: `
            Unable to validate sequences
          
              ${JSON.stringify(validateSequence.error)}
            `,
            code: "APP203",
          })
        );
      }
      validateSequences.push(validateSequence.data);
    }
    return right(validateSequences);
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
    const coursFromSequence = await this.getAllCoursFromSequence({
      userId: "",
      sequenceId,
      type,
    });
    if (isLeft(coursFromSequence)) {
      return coursFromSequence;
    }

    const coursToDelete = coursFromSequence.right.map((cours) =>
      this.deleteCourse({ coursId: cours._id })
    );
    const coursDeletionResult = await Promise.allSettled(coursToDelete);

    const coursDeleted = coursDeletionResult.every(
      (cours) => cours.status === "fulfilled"
    );
    if (!coursDeleted) {
      return left(
        Failure.invalidValue({
          invalidValue: coursDeletionResult,
          message: "Unable to delete all cours",
          code: "APP203",
        })
      );
    }

    const sequenceDeletionResult = await this._repository.deleteSequence({
      sequenceId,
      type,
      userId
    });

    return sequenceDeletionResult;
  }

  async getAllCoursFromSequence({
    userId,
    sequenceId,
    type,
  }: {
    userId: string;
    sequenceId: string;
    type?: "template" | "sequence";
  }): Promise<Either<Failure<string>, Cours[]>> {
    const eitherSequencesCours = await this._repository.getAllCoursFromSequence(
      { userId, sequenceId, type }
    );
    if (isLeft(eitherSequencesCours)) {
      return eitherSequencesCours;
    }
    const validateCours: Cours[] = [];
    for (const cours of eitherSequencesCours.right) {
      const validateCoursSchema = CoursSchema.safeParse(cours);
      if (!validateCoursSchema.success) {
        return left(
          Failure.invalidValue({
            invalidValue: cours,
            message: `
            Unable to validate cours
          
              ${JSON.stringify(validateCoursSchema.error)}
            `,
            code: "APP203",
          })
        );
      }
      validateCours.push(validateCoursSchema.data);
    }
    return right(validateCours);
  }

  async updateCours({ cours }: { cours: Cours }) {
    return this._repository.updateCours({ cours });
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
    return this._repository.addClassSequence({ sequenceId, classeId, userId });
  }

  async getClasseSequences({
    classeId,
  }: {
    classeId: string;
  }): Promise<Either<Failure<string>, ClasseSequence[]>> {
    const eitherClasseSequences = await this._repository.getClasseSequences({
      classeId,
    });
    if (isLeft(eitherClasseSequences)) {
      return eitherClasseSequences;
    }
    const validateSequences: ClasseSequence[] = [];
    for (const sequence of eitherClasseSequences.right) {
      const validateSequence = ClasseSequenceSchema.safeParse(sequence);
      if (!validateSequence.success) {
        return left(
          Failure.invalidValue({
            invalidValue: sequence,
            message: `
            Unable to validate sequences
          
              ${JSON.stringify(validateSequence.error)}
            `,
            code: "APP203",
          })
        );
      }
      validateSequences.push(validateSequence.data);
    }
    return right(validateSequences);
  }
}

export const coursUsecases = new CoursUsecases({
  repository: coursRepository,
  complementUsecases: complementUsecases,
});
