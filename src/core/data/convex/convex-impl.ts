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
import {
  AssignEvaluationOptions,
  CreateEvaluationOptions,
  DeleteEvaluationBase,
  DeleteEvaluationWithGradesOptions,
  GetEvaluationBaseOptions,
  GetEvaluationBasesOptions,
  GetEvaluationOptions,
  GetEvaluationsListOptions,
  GetEvaluationsWithGradesByEvalauationBaseIdOptions,
  IsEvaluationAssigned,
  UpdateEvaluationBaseOptions,
  UpdateGradeOptions,
} from "@/features/evaluation/domain/entities/evaluation-types";
import {
  CreateStudentOptions,
  DeleteStudentOptions,
  UpdateStudentOptions,
} from "@/features/student/domain/entities/student-types";
import {
  CreateClasseOptions,
  DeleteClasseOptions,
} from "@/features/classe/domain/classe-types";
import { SaveUserOptions } from "@/features/user/domain/types/types";
import {
  AddClasseToVisibilityOptions,
  AddSequenceToVisibilityOptions,
  AddCoursToVisibilityOptions,
  AddComplementToVisibilityOptions,
} from "@/features/visibility/domain/types";

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
  }: SaveUserOptions): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.users.saveUserMutation, {
        userId,
        name: user.name,
        schoolSubject: user.schoolSubject,
        country: user.country,
        educationSystem: user.educationSystem,
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
        publish: cours.publish ?? false,
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
        publish: cours.publish ?? false,
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
      return left(
        Failure.invalidValue({
          invalidValue: body,
          message: "Error updating cours body: unknown",
        })
      );
    }
  }

  async deleteCourse({
    coursId,
  }: {
    coursId: string;
  }): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.cours.deleteCours, {
        coursId,
      });
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: coursId,
          message: "Error deleting cours",
          code: "INF101",
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
        publish: sequence.publish,
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
    type,
  }: {
    sequence: Sequence;
    type?: "template" | "sequence";
  }): Promise<Either<Failure<string>, void>> {
    try {
      const defaultType = type === "sequence" ? "sequence" : undefined;
      await fetchMutation(this._db.sequence.updateSequence, {
        sequenceId: sequence._id,
        imageUrl: sequence.imageUrl,
        name: sequence.name,
        body: sequence.body,
        description: sequence.description,
        category: sequence.category,
        competencesIds: sequence.competencesIds,
        type: defaultType,
        publish: sequence.publish,
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
    type,
    userId,
    sequenceId,
  }: {
    userId: string;
    sequenceId: string;
    type?: "template" | "sequence";
  }): Promise<Either<Failure<string>, DocumentData>> {
    try {
      if (!type || type === "template") {
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
      } else {
        if (type === "sequence") {
          const result = await fetchQuery(this._db.classes.getClassSequence, {
            id: sequenceId,
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
        }
        return left(
          Failure.invalidValue({
            invalidValue: sequenceId,
            message: "Error getting single sequence",
            code: "INF103",
          })
        );
      }
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

  async addClasseSequence({
    sequenceId,
    classeId,
  }: {
    sequenceId: string;
    classeId: string;
  }): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(this._db.classes.addSequenceClass, {
        classId: classeId,
        sequenceId,
      });
      if (result.error) {
        return left(
          Failure.invalidValue({
            invalidValue: sequenceId,
            message: "Error adding sequence to class",
            code: "INF103",
          })
        );
      }
      return right(result.id);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: sequenceId,
          message: "Error adding sequence to class",
          code: "INF101",
        })
      );
    }
  }

  async getClasseSequences({
    classeId,
  }: {
    classeId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const result = await fetchQuery(this._db.classes.getClassSequences, {
        classId: classeId,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: classeId,
            message: "Error getting class sequences",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: classeId,
          message: "Error getting class sequences",
          code: "INF101",
        })
      );
    }
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
  }): Promise<Either<Failure<string>, void>> {
    try {
      const defaultType = type === "sequence" ? "sequence" : undefined;
      await fetchMutation(this._db.sequence.addBodyToSequence, {
        userId,
        sequenceId,
        body,
        type: defaultType,
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

  async deleteSequence({
    sequenceId,
    type,
  }: {
    sequenceId: string;
    type: "template" | "sequence";
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.sequence.deleteSequence, {
        sequenceId,
        type,
      });

      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: sequenceId,
          message: "Error deleting sequence",
          code: "INF101",
        })
      );
    }
  }

  async getAllCoursFromSequence({
    userId,
    sequenceId,
    type,
  }: {
    userId: string;
    sequenceId: string;
    type?: "template" | "sequence";
  }): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const defaultType = type === "sequence" ? "sequence" : undefined;
      const result = await fetchQuery(this._db.sequence.getAllCoursInSequence, {
        userId,
        sequenceId,
        type: defaultType,
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

  async deleteComplement({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.complement.deleteComplement, {
        id,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Error deleting cours complement",
            code: "INF103",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error deleting cours complement",
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

  async deleteNote({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(this._db.notes.deleteNote, {
        id,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Error deleting note",
            code: "INF103",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error deleting note",
          code: "INF101",
        })
      );
    }
  }

  async createClass(
    options: CreateClasseOptions
  ): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(this._db.classes.createClass, options);
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

  async updateClassVisibility({
    id,
    visibility,
  }: {
    id: string;
    visibility: boolean;
  }): Promise<Either<Failure<string>, void>> {
    try {
      const result = await fetchMutation(
        this._db.classes.updateClassVisibility,
        {
          id,
          visibility,
        }
      );
      if (!result.success) {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Error updating class visibility",
            code: "INF103",
          })
        );
      }
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error updating class visibility",
          code: "INF101",
        })
      );
    }
  }

  async addClasseToVisibility(
    options: AddClasseToVisibilityOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(
        this._db.visibility.addClasseToVisibilityTable,
        options
      );
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Error adding class to visibility",
          code: "INF101",
        })
      );
    }
  }

  async addSequenceToVisibility(
    options: AddSequenceToVisibilityOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(
        this._db.visibility.addSequenceToVisibilityTable,
        options
      );
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Error adding sequence to visibility",
          code: "INF101",
        })
      );
    }
  }
  async addCoursToVisibility(
    options: AddCoursToVisibilityOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(
        this._db.visibility.addCoursToVisibilityTable,
        options
      );
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Error adding cours to visibility",
          code: "INF101",
        })
      );
    }
  }
  async addComplementToVisibility(
    options: AddComplementToVisibilityOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(
        this._db.visibility.addComplementToVisibilityTable,
        options
      );
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Error adding complement to visibility",
          code: "INF101",
        })
      );
    }
  }

  async getVisibility({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData>> {
    try {
      const result = await fetchMutation(this._db.visibility.getVisibility, {
        userId: id,
      });
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: id,
            message: "Error getting visibility",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: id,
          message: "Error getting visibility",
          code: "INF101",
        })
      );
    }
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
  }): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.visibility.updateVisibility, {
        userId,
        publish,
        type,
        typeId,
      });

      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: userId,
          message: "Error updating visibility",
          code: "INF101",
        })
      );
    }
  }

  async createEvaluationBase(
    options: CreateEvaluationOptions
  ): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(
        this._db.evaluation_base.createEvaluationBase,
        {
          name: options.name,
          description: options.description,
          createdBy: options.createdBy,
          gradeType: options.gradeType,
          criterias: options.criterias,
          isGraded: options.isGraded,
        }
      );
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: options,
            message: "Error creating evaluation base",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Error creating evaluation base",
          code: "INF101",
        })
      );
    }
  }

  async getEvaluationBase(
    options: GetEvaluationBaseOptions
  ): Promise<Either<Failure<string>, DocumentData>> {
    try {
      const result = await fetchQuery(
        this._db.evaluation_base.getEvaluationBase,
        {
          evaluationId: options.evaluationId,
        }
      );
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: options.evaluationId,
            message: "Error getting evaluation base",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options.evaluationId,
          message: "Error getting evaluation base",
          code: "INF101",
        })
      );
    }
  }

  async getEvaluationBases(
    options: GetEvaluationBasesOptions
  ): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const result = await fetchQuery(
        this._db.evaluation_base.listEvaluationsBase,
        {
          createdBy: options.createdBy,
        }
      );
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: options.createdBy,
            message: "Error getting evaluation bases",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options.createdBy,
          message: "Error getting evaluation bases",
          code: "INF101",
        })
      );
    }
  }

  async updateEvaluationBase(
    options: UpdateEvaluationBaseOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.evaluation_base.updateEvaluationBase, {
        evaluationId: options.evaluationId,
        updates: {
          name: options.name,
          description: options.description,
          gradeType: options.gradeType,
          criterias: options.criterias,
          isGraded: options.isGraded,
        },
      });
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Error updating evaluation base",
          code: "INF101",
        })
      );
    }
  }

  async assignEvaluationBaseToClasse(
    options: AssignEvaluationOptions
  ): Promise<Either<Failure<string>, string>> {
    try {
      const resultId = await fetchMutation(
        this._db.evaluation_with_grades.assignEvaluationToClasse,
        {
          classeId: options.classeId,
          evaluationId: options.evaluationId,
        }
      );
      if (!resultId) {
        return left(
          Failure.invalidValue({
            invalidValue: options,
            message: "Failed to assign evaluation to class",
            code: "INF103",
          })
        );
      }
      return right(resultId);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to create evaluation with grades",
          code: "INF101",
        })
      );
    }
  }

  async isEvaluationAssigned(options: IsEvaluationAssigned) {
    try {
      const result = await fetchQuery(
        this._db.evaluation_base.isEvaluationAssigned,
        {
          evaluationId: options.evaluationId,
        }
      );
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: options,
            message: "Failed to check if evaluation is assigned to class",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to check if evaluation is assigned to class",
          code: "INF101",
        })
      );
    }
  }

  async deleteEvaluationBase(
    options: DeleteEvaluationBase
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.evaluation_base.deleteEvaluationBase, {
        evaluationId: options.evaluationId,
      });
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to delete evaluation base",
          code: "INF101",
        })
      );
    }
  }

  async getEvaluationsWithGradesByEvaluationBaseId(
    options: GetEvaluationsWithGradesByEvalauationBaseIdOptions
  ): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const operationResult = await fetchQuery(
        this._db.evaluation_with_grades
          .getEvaluationsWithGradesByEvaluationBaseId,
        options
      );
      return right(operationResult);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message:
            "Failed to get evaluations with grades by evaluation base id",
          code: "INF101",
        })
      );
    }
  }
  async deleteEvaluationWithGrades(
    options: DeleteEvaluationWithGradesOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      fetchMutation(
        this._db.evaluation_with_grades.deleteEvaluationWithGrades,
        {
          evaluationId: options.evaluationId,
        }
      );
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to delete evaluation with grades",
          code: "INF101",
        })
      );
    }
  }

  async updateGrade(
    options: UpdateGradeOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.evaluation_with_grades.updateGrade, options);
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to update grade",
          code: "INF101",
        })
      );
    }
  }

  async getEvaluationWithGrade(
    options: GetEvaluationOptions
  ): Promise<Either<Failure<string>, DocumentData>> {
    try {
      const result = await fetchQuery(
        this._db.evaluation_with_grades.getEvaluationWithGrade,
        options
      );
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: options,
            message: "Error getting evaluation with grade",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Error getting evaluation with grade",
          code: "INF101",
        })
      );
    }
  }

  async getEvaluationsListWithGrade(
    options: GetEvaluationsListOptions
  ): Promise<Either<Failure<string>, DocumentData[]>> {
    try {
      const result = await fetchQuery(
        this._db.evaluation_with_grades.getEvaluationsWithGrades,
        options
      );
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: options,
            message: "Error getting evaluations with grades",
            code: "INF103",
          })
        );
      }
      return right(result);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Error getting evaluations with grades",
          code: "INF101",
        })
      );
    }
  }
  async createStudent(
    options: CreateStudentOptions
  ): Promise<Either<Failure<string>, string>> {
    try {
      const result = await fetchMutation(
        this._db.students.createStudent,
        options
      );
      if (!result) {
        return left(
          Failure.invalidValue({
            invalidValue: options,
            message: "Failed to create student",
            code: "INF103",
          })
        );
      }
      const userId = result as unknown as string;
      return right(userId);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to create student",
          code: "INF101",
        })
      );
    }
  }

  async deleteStudent(
    options: DeleteStudentOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.students.deleteStudent, options);
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to delete student",
          code: "INF101",
        })
      );
    }
  }
  async updateStudent(
    options: UpdateStudentOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.students.updateStudent, options);
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to update student",
          code: "INF101",
        })
      );
    }
  }
  async deleteClassesSequenceFromClasse(
    options: DeleteClasseOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(
        this._db.classes.deleteClasseSequencesFromClasseId,
        options
      );
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to delete classes sequence from class",
          code: "INF101",
        })
      );
    }
  }
  async deleteEvaluationsWithGradesFromClasse(
    options: DeleteClasseOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(
        this._db.classes.deleteEvualuationsWithGradesFromClasseId,
        options
      );
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to delete evaluations with grades from class",
          code: "INF101",
        })
      );
    }
  }

  async deleteStudentsFromClasseId(
    options: DeleteClasseOptions
  ): Promise<Either<Failure<string>, void>> {
    try {
      await fetchMutation(this._db.classes.deleteStudentsFromClasseId, options);
      return right(undefined);
    } catch (error) {
      return left(
        Failure.invalidValue({
          invalidValue: options,
          message: "Failed to delete students from class",
          code: "INF101",
        })
      );
    }
  }
}

export const convexDatabase = new ConvexDatabase({ db: api });
