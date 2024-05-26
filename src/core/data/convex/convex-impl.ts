import IDatabase from "../idatabase";
import Failure from "@/core/failures/failures";
import { Either, left, right } from "fp-ts/lib/Either";
import { DocumentData } from "../database-types";
import { api } from "../../../../convex/_generated/api";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { UserType } from "@/features/user/domain/entities/user-schema";
import {
  Category,
  Competence,
} from "@/features/comp-cat/domain/entities/schemas";
import { Cours } from "@/features/cours-sequence/domain/entities/cours-schemas";

export interface ConvexDatabaseOptions {
  db: typeof api;
}
export default class ConvexDatabase extends IDatabase {
  private readonly _db: typeof api;

  constructor(options: ConvexDatabaseOptions) {
    super();
    this._db = options.db;
  }

  async getUser({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData>> {
    const doc = await fetchQuery(this._db.users.getUserQuery, {
      userId,
    });
    if (!doc) {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: `
          User not found with id: ${userId}`,
        })
      );
    }
    return right(doc);
  }
  async saveUser({
    userId,
    user,
  }: {
    userId: string;
    user: UserType;
  }): Promise<Either<Failure<string>, void>> {
    try {
      console.log({
        userId,
        user,
      });
      const result = await fetchMutation(this._db.users.saveUserMutation, {
        userId,
        name: user.name,
        schoolSubject: user.schoolSubject,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: user,
            message: "Error saving user",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: user,
          message: "Error saving user",
        })
      );
    }
  }

  async addCategory({
    userId,
    category,
  }: {
    userId: string;
    category: Omit<Category, "id">;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.category.createCategory, {
        userId,
        name: category.name,
        description: category.description,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: category,
            message: "Error adding category",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: category,
          message: "Error adding category",
        })
      );
    }
  }

  async getCategories({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    const docs = await fetchQuery(this._db.category.getCategories, {
      userId,
    });
    if (!docs) {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: `
          Categories not found with userId: ${userId}`,
        })
      );
    }
    return right(docs);
  }

  async getCompetences({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    const docs = await fetchQuery(this._db.competences.getCompetences, {
      userId,
    });
    if (!docs) {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: `
          Competences not found with userId: ${userId}`,
        })
      );
    }
    return right(docs);
  }

  async addCompetence({
    userId,
    competence,
  }: {
    userId: string;
    competence: Competence;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(
        this._db.competences.createCompetence,
        {
          userId,
          name: competence.name,
          description: competence.description,
          category: competence.category,
        }
      );
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: competence,
            message: "Error adding competence",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: competence,
          message: "Error adding competence",
        })
      );
    }
  }

  getAllCours({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    throw new Error("Method not implemented.");
  }
  async getSingleCours({
    userId,
    coursId,
  }: {
    userId: string;
    coursId: string;
  }): Promise<Either<Failure<string>, DocumentData>> {
    try {
      const result = await fetchQuery(this._db.cours.getSingleCours, {
        userId,
        coursId,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: coursId,
            message: `
          Cours not found with id: ${coursId}
          `,
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: coursId,
          message: "Error getting single cours",
        })
      );
    }
  }
  async addCours({
    userId,
    cours,
  }: {
    userId: string;
    cours: Omit<Cours, "_id" | "createdAt">;
  }): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(this._db.cours.createCours, {
        userId,
        name: cours.name,
        body: cours.body,
        lessons: cours.lessons,
        description: cours.description,
        competences: cours.competences,

        category: cours.category,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: cours,
            message: "Error adding cours",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: cours,
          message: "Error adding cours",
        })
      );
    }
  }

  async updateCours({
    userId,
    cours,
  }: {
    userId: string;
    cours: {
      _id: string;
      name: string;
      body: string;
      lessons: string[];
      competences: string[];
      description: string;
      createdBy: string;
      createdAt: number;
      category: string;
    };
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.cours.updateCours, {
        userId,
        coursId: cours._id,
        name: cours.name,
        body: cours.body,
        lessons: cours.lessons,
        competences: cours.competences,
        description: cours.description,
        category: cours.category,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: cours,
            message: "Error updating cours",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: cours,
          message: "Error updating cours",
        })
      );
    }
  }

  async updateCoursBody({
    userId,
    coursId,
    body,
  }: {
    userId: string;
    coursId: string;
    body: string;
  }): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.cours.updateCoursBody, {
        userId,
        coursId,
        body,
      });

      return right(undefined);
    } catch (error) {
      console.log({ error });
      return left(
        Failure.invalidValue({
          invalidValue: body,
          message: "Error updating cours body: unknown",
        })
      );
    }
  }

  async addSequence({
    userId,
    sequence,
  }: {
    userId: string;
    sequence: Omit<
      {
        category: string;
        name: string;
        description: string;
        createdBy: string;
        createdAt: number;
        body: string;
        competencesIds: string[];
        _id: string;
      },
      "createdAt" | "_id"
    >;
  }): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(this._db.sequence.createSequence, {
        userId,
        name: sequence.name,
        body: sequence.body,
        description: sequence.description,
        category: sequence.category,
        competencesIds: sequence.competencesIds,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: sequence,
            message: "Error adding sequence",
            code: "INF103",
          })
        );
      }

      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: sequence,
          message: "Error adding sequence",
          code: "INF101",
        })
      );
    }
  }
  getSequences({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    throw new Error("Method not implemented.");
  }
  async getSingleSequence({
    userId,
    sequenceId,
  }: {
    userId: string;
    sequenceId: string;
  }): Promise<Either<Failure<string>, DocumentData>> {
    try {
      const result = await fetchQuery(this._db.sequence.getSingleSequence, {
        userId,
        sequenceId,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: sequenceId,
            message: "Error getting single sequence",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: sequenceId,
          message: "Error getting single sequence",
          code: "INF101",
        })
      );
    }
  }
  addCoursToSequence({
    userId,
    sequenceId,
    coursId,
  }: {
    userId: string;
    sequenceId: string;
    coursId: string[];
  }): Promise<Either<Failure<string>, void>> {
    throw new Error("Method not implemented.");
  }

  async addBodyToSequence({
    userId,
    sequenceId,
    body,
  }: {
    userId: string;
    sequenceId: string;
    body: string;
  }): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.sequence.addBodyToSequence, {
        userId,
        sequenceId,
        body,
      });
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: body,
          message: "Error adding body to sequence",
          code: "INF101",
        })
      );
    }
  }
}

export const convexDatabase = new ConvexDatabase({ db: api });
