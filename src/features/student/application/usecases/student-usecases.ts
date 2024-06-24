import Failure from "@/core/failures/failures";
import { Either } from "fp-ts/lib/Either";
import {
  DeleteStudentOptions,
  UpdateStudentOptions,
} from "../../domain/entities/student-types";
import StudentRepository, {
  studentRepository,
} from "../repositories/student-repository";

export default class StudentUsecases {
  private readonly _studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this._studentRepository = studentRepository;
  }

  /**
   * Deletes a student.
   *
   * @param options - The options for deleting the student.
   * @returns A promise that resolves to either a failure with an error message or void.
   */
  /**
   * Deletes a student from the repository.
   *
   * @param {DeleteStudentOptions} options - The options for deleting the student.
   * @returns {Promise<Either<Failure<string>, void>>} - A promise that resolves to either a failure with an error message or void.
   * @remarks
   * ⚠️ WARNING: This method violates our architecture principles. According to our architecture, the deletion of resources where the student appears should be handled here in the application layer, not in the backend implementation. Please refactor this code accordingly.
   */
  async deleteStudent(
    options: DeleteStudentOptions
  ): Promise<Either<Failure<string>, void>> {
    return this._studentRepository.deleteStudent(options);
  }

  /**
   * Updates a student in the repository.
   *
   *
   * @param {UpdateStudentOptions} options - The options for updating the student.
   * @returns {Promise<Either<Failure<string>, void>>} - A promise that resolves to either a failure with an error message or void.
   */
  async updateStudent(
    options: UpdateStudentOptions
  ): Promise<Either<Failure<string>, void>> {
    return this._studentRepository.updateStudent(options);
  }
}

export const studentUsecases = new StudentUsecases(studentRepository);
