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
import {
  Cours,
  Sequence,
} from "@/features/cours-sequence/domain/entities/cours-schemas";
import { Complement } from "@/features/complement/domain/complement-schemas";
import { Note } from "@/features/notes/domain/notes-schemas";

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
        sequenceId: cours.sequenceId,
        imageUrl: cours.imageUrl,
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
    cours,
  }: {
    cours: Cours;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.cours.updateCours, {
        coursId: cours._id,
        name: cours.name,
        body: cours.body,
        lessons: cours.lessons,
        competences: cours.competences,
        description: cours.description,
        category: cours.category,
        imageUrl: cours.imageUrl,
      });

      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: cours,
          message: "Error updating cours",
          code: "INF101",
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
    sequence: Omit<Sequence, "createdAt" | "_id">;
  }): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(this._db.sequence.createSequence, {
        userId,
        imageUrl: sequence.imageUrl,
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

  async updateSequence({
    sequence,
  }: {
    sequence: Sequence;
  }): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.sequence.updateSequence, {
        sequenceId: sequence._id,
        imageUrl: sequence.imageUrl,
        name: sequence.name,
        body: sequence.body,
        description: sequence.description,
        category: sequence.category,
        competencesIds: sequence.competencesIds,
      });

      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: sequence,
          message: "Error updating sequence",
          code: "INF101",
        })
      );
    }
  }

  async getSequences({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const result = await fetchQuery(this._db.sequence.getAllSequences, {
        userId,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: userId,
            message: "Error getting sequences",
            code: "INF103",
          })
        );
      }

      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: "Error getting sequences",
          code: "INF101",
        })
      );
    }
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

  async getAllCoursFromSequence({
    userId,
    sequenceId,
  }: {
    userId: string;
    sequenceId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const result = await fetchQuery(this._db.sequence.getAllCoursInSequence, {
        userId,
        sequenceId,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: sequenceId,
            message: "Error getting all cours from sequence",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: sequenceId,
          message: "Error getting all cours from sequence",
          code: "INF101",
        })
      );
    }
  }

  async addComplement({
    userId,
    complement,
  }: {
    userId: string;
    complement: Omit<Complement, "_id" | "createdAt">;
  }): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(this._db.complement.createComplement, {
        coursId: complement.coursId,
        name: complement.name,
        body: complement.body,
        description: complement.description,
        publish: complement.publish ?? false,
        type: complement.type,
        contentType: complement.contentType,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: complement,
            message: "Error adding complement",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: complement,
          message: "Error adding complement",
          code: "INF101",
        })
      );
    }
  }

  async getAllComplement({
    coursId,
  }: {
    coursId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const result = await fetchQuery(this._db.complement.getAllComplement, {
        coursId,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: coursId,
            message: "Error getting all cours complement",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: coursId,
          message: "Error getting all cours complement",
          code: "INF101",
        })
      );
    }
  }

  async getComplement({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData>> {
    try {
      const result = await fetchQuery(this._db.complement.getComplement, {
        id,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Error getting cours complement",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error getting cours complement",
          code: "INF101",
        })
      );
    }
  }

  async updateComplement({
    coursComplement,
  }: {
    coursComplement: Complement;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.complement.updateComplement, {
        id: coursComplement.id,
        name: coursComplement.name,
        body: coursComplement.body,
        sequenceId: coursComplement.sequenceId,
        description: coursComplement.description,
        publish: coursComplement.publish,
        publishDate: coursComplement.publishDate,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: coursComplement,
            message: "Error updating cours complement",
            code: "INF103",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: coursComplement,
          message: "Error updating cours complement",
          code: "INF101",
        })
      );
    }
  }

  async createNote({
    note,
  }: {
    note: Pick<
      Note,
      | "name"
      | "description"
      | "content"
      | "fullPath"
      | "pathDictionary"
      | "folders"
      | "createdBy"
      | "keywords"
      | "type"
      | "parentId"
      | "contentType"
    >;
  }): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(this._db.notes.createNote, {
        name: note.name,
        description: note.description,
        parentId: note.parentId,
        fullPath: note.fullPath,
        pathDictionary: note.pathDictionary,
        folders: note.folders,
        createdBy: note.createdBy,
        keywords: note.keywords,
        content: note.content,
        type: note.type,
        contentType: note.contentType,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: note,
            message: "Error creating note",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: note,
          message: "Error creating note",
          code: "INF101",
        })
      );
    }
  }

  async getNotes({
    parentId,
  }: {
    parentId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const result = await fetchQuery(this._db.notes.getNotes, {
        parentId,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: parentId,
            message: "Error getting notes",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: parentId,
          message: "Error getting notes",
          code: "INF101",
        })
      );
    }
  }

  async getNote({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData>> {
    try {
      const result = await fetchQuery(this._db.notes.getNote, {
        id,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Error getting note",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error getting note",
          code: "INF101",
        })
      );
    }
  }

  async updateNote({
    note,
  }: {
    note: Pick<
      Note,
      | "id"
      | "name"
      | "description"
      | "content"
      | "fullPath"
      | "pathDictionary"
      | "folders"
      | "createdBy"
      | "keywords"
    >;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.notes.updateNote, {
        id: note.id,
        name: note.name,
        description: note.description,
        content: note.content,
        fullPath: note.fullPath,
        pathDictionary: note.pathDictionary,
        folders: note.folders,
        keywords: note.keywords,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: note,
            message: "Error updating note",
            code: "INF103",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: note,
          message: "Error updating note",
          code: "INF101",
        })
      );
    }
  }

  async createClass({
    userId,
    name,
    description,
    imageUrl,
  }: {
    userId: string;
    name: string;
    description: string;
    imageUrl: string;
  }): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(this._db.classes.createClass, {
        userId,
        name,
        description,
        imageUrl,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: name,
            message: "Error creating class",
            code: "INF103",
          })
        );
      }
      if (!result.id || typeof result.id !== "string") {
        return left(
          Failure.invalidValue({
            invalidValue: name,
            message: "Error creating class",
            code: "INF103",
          })
        );
      }
      return right(result.id);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: name,
          message: "Error creating class",
          code: "INF101",
        })
      );
    }
  }

  async deleteClass({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.classes.deleteClass, {
        id,
      });
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error deleting class",
          code: "INF101",
        })
      );
    }
  }

  async getClasses({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const result = await fetchQuery(this._db.classes.getClasses, {
        id,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Error getting classes",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error getting classes",
          code: "INF101",
        })
      );
    }
  }

  async getClass({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData>> {
    try {
      const result = await fetchQuery(this._db.classes.getClass, {
        id,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Error getting class",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error getting class",
          code: "INF101",
        })
      );
    }
  }
}

export const convexDatabase = new ConvexDatabase({ db: api });
