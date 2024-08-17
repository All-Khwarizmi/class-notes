import { Either } from "fp-ts/lib/Either";
import { DocumentData } from "./database-types";
import Failure from "../failures/failures";
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
  GetEvaluationBaseOptions,
  GetEvaluationBasesOptions,
  GetEvaluationOptions,
  GetEvaluationsWithGradesByEvalauationBaseIdOptions,
  GetEvaluationsListOptions,
  IsEvaluationAssigned,
  UpdateEvaluationBaseOptions,
  UpdateGradeOptions,
  DeleteEvaluationWithGradesOptions,
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
  AddComplementToVisibilityOptions,
  AddCoursToVisibilityOptions,
  AddSequenceToVisibilityOptions,
  DeleteEntityFromVisibilityOptions,
  UpdateVisibilityOptions,
} from "@/features/visibility/domain/types";
import {
  DeleteCompCatOptions,
  GetCompetenceOptions,
  UpdateCompCatOptions,
} from "@/features/comp-cat/domain/types";

export default abstract class IDatabase {
  abstract getUser({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData>>;

  abstract saveUser({
    userId,
    user,
  }: SaveUserOptions): Promise<Either<Failure<string>, void>>;

  abstract getCategories({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract addCategory({
    userId,
    category,
  }: {
    userId: string;
    category: Omit<Category, "_id">;
  }): Promise<Either<Failure<string>, void>>;

  abstract getCompetences({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract getCompetence(
    options: GetCompetenceOptions
  ): Promise<Either<Failure<string>, DocumentData>>;

  abstract addCompetence({
    userId,
    category,
    competence,
  }: {
    userId: string;
    category: string;
    competence: Competence;
  }): Promise<Either<Failure<string>, void>>;

  abstract updateCategoryCompetence(
    options: UpdateCompCatOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract deleteCompCat(
    options: DeleteCompCatOptions
  ): Promise<Either<Failure<string>, void>>;
  abstract getAllCours({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract getSingleCours({
    userId,
    coursId,
  }: {
    userId: string;
    coursId: string;
  }): Promise<Either<Failure<string>, DocumentData>>;

  abstract addCours({
    userId,
    cours,
  }: {
    userId: string;
    cours: Omit<Cours, "_id" | "createdAt">;
  }): Promise<Either<Failure<string>, string>>;

  abstract updateCours({
    cours,
  }: {
    cours: Cours;
  }): Promise<Either<Failure<string>, void>>;

  abstract updateCoursBody({
    userId,
    coursId,
    body,
  }: {
    userId: string;
    coursId: string;
    body: string;
  }): Promise<Either<Failure<string>, void>>;

  abstract deleteCourse({
    coursId,
  }: {
    coursId: string;
  }): Promise<Either<Failure<string>, void>>;
  abstract addSequence({
    userId,
    sequence,
  }: {
    userId: string;
    sequence: Omit<Sequence, "_id" | "createdAt" | "coursIds">;
  }): Promise<Either<Failure<string>, string>>;

  abstract updateSequence({
    sequence,
    type,
  }: {
    sequence: Sequence;
    type?: "template" | "sequence";
  }): Promise<Either<Failure<string>, void>>;

  abstract getSequences({
    userId,
  }: {
    userId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract getSingleSequence({
    userId,
    sequenceId,
    type,
  }: {
    userId: string;
    sequenceId: string;
    type?: "template" | "sequence";
  }): Promise<Either<Failure<string>, DocumentData>>;

  abstract addCoursToSequence({
    userId,
    sequenceId,
    coursId,
  }: {
    userId: string;
    sequenceId: string;
    coursId: string[];
  }): Promise<Either<Failure<string>, void>>;

  abstract addBodyToSequence({
    userId,
    sequenceId,
    body,
    type,
  }: {
    userId: string;
    sequenceId: string;
    body: string;
    type?: "template" | "sequence";
  }): Promise<Either<Failure<string>, void>>;

  abstract deleteSequence({
    sequenceId,
    type,
  }: {
    sequenceId: string;
    type: "template" | "sequence";
  }): Promise<Either<Failure<string>, void>>;

  abstract getAllCoursFromSequence({
    userId,
    sequenceId,
    type,
  }: {
    userId: string;
    sequenceId: string;
    type?: "template" | "sequence";
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract addClasseSequence({
    sequenceId,
    classeId,
  }: {
    sequenceId: string;
    classeId: string;
  }): Promise<Either<Failure<string>, string>>;
  abstract getClasseSequences({
    classeId,
  }: {
    classeId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;
  abstract addComplement({
    userId,
    complement,
  }: {
    userId: string;
    complement: Pick<
      Complement,
      "name" | "description" | "type" | "publish" | "coursId" | "body"
    >;
  }): Promise<Either<Failure<string>, string>>;

  abstract getAllComplement({
    coursId,
  }: {
    coursId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract getComplement({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData>>;

  abstract updateComplement({
    coursComplement,
  }: {
    coursComplement: Complement;
  }): Promise<Either<Failure<string>, void>>;

  abstract deleteComplement({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, void>>;
  abstract createNote({
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
  }): Promise<Either<Failure<string>, string>>;
  abstract getNotes({
    parentId,
  }: {
    parentId: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;
  abstract getNote({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData>>;

  abstract updateNote({
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
  }): Promise<Either<Failure<string>, void>>;

  abstract deleteNote({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, void>>;
  abstract createClass(
    options: CreateClasseOptions
  ): Promise<Either<Failure<string>, string>>;

  abstract deleteClass({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, void>>;

  abstract getClasses({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract getClass({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData>>;

  // abstract updateClassVisibility({
  //   id,
  //   visibility,
  // }: {
  //   id: string;
  //   visibility: boolean;
  // }): Promise<Either<Failure<string>, void>>;

  abstract getVisibility({
    id,
  }: {
    id: string;
  }): Promise<Either<Failure<string>, DocumentData>>;

  abstract updateVisibility(
    options: UpdateVisibilityOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract createEvaluationBase(
    options: CreateEvaluationOptions
  ): Promise<Either<Failure<string>, string>>;

  abstract getEvaluationBase(
    options: GetEvaluationBaseOptions
  ): Promise<Either<Failure<string>, DocumentData>>;

  abstract getEvaluationBases(
    options: GetEvaluationBasesOptions
  ): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract updateEvaluationBase(
    options: UpdateEvaluationBaseOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract assignEvaluationBaseToClasse(
    options: AssignEvaluationOptions
  ): Promise<Either<Failure<string>, string>>;

  abstract deleteEvaluationBase(
    options: DeleteEvaluationBase
  ): Promise<Either<Failure<string>, void>>;

  abstract isEvaluationAssigned(
    options: IsEvaluationAssigned
  ): Promise<Either<Failure<string>, boolean>>;

  abstract getEvaluationsWithGradesByEvaluationBaseId(
    options: GetEvaluationsWithGradesByEvalauationBaseIdOptions
  ): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract deleteEvaluationWithGrades(
    options: DeleteEvaluationWithGradesOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract updateGrade(
    options: UpdateGradeOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract getEvaluationWithGrade(
    options: GetEvaluationOptions
  ): Promise<Either<Failure<string>, DocumentData>>;

  abstract getEvaluationsListWithGrade(
    options: GetEvaluationsListOptions
  ): Promise<Either<Failure<string>, DocumentData[]>>;

  abstract createStudent(
    options: CreateStudentOptions
  ): Promise<Either<Failure<string>, string>>;

  /**
   * Deletes a student from the database.
   *
   * @param options - The options for deleting the student.
   * @returns A promise that resolves to either a failure or void.
   *
   * @remarks
   * ⚠️ WARNING: This method violates our architecture principles. According to our architecture, the deletion of resources where the student appears should be handled in the application layer, not in the backend implementation. Please refactor this code accordingly.
   */
  abstract deleteStudent(
    options: DeleteStudentOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract updateStudent(
    options: UpdateStudentOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract deleteClassesSequenceFromClasse(
    options: DeleteClasseOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract deleteEvaluationsWithGradesFromClasse(
    options: DeleteClasseOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract deleteStudentsFromClasseId(
    options: DeleteClasseOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract addClasseToVisibility(
    options: AddClasseToVisibilityOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract addSequenceToVisibility(
    options: AddSequenceToVisibilityOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract addCoursToVisibility(
    options: AddCoursToVisibilityOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract addComplementToVisibility(
    options: AddComplementToVisibilityOptions
  ): Promise<Either<Failure<string>, void>>;

  abstract deleteEntityFromVisibilityTable(
    options: DeleteEntityFromVisibilityOptions
  ): Promise<Either<Failure<string>, void>>;
}
