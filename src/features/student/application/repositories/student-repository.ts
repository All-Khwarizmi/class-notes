import IDatabase from "@/core/data/idatabase";
import {
  CreateStudentOptions,
  DeleteStudentOptions,
  UpdateStudentOptions,
} from "../../domain/entities/student-types";
import { getAppDataBase } from "@/core/data/get-app-db";

export default class StudentRepository {
  private readonly _db: IDatabase;

  constructor(db: IDatabase) {
    this._db = db;
  }
  async addStudent(options: CreateStudentOptions) {
    return this._db.createStudent(options);
  }

  async deleteStudent(options: DeleteStudentOptions) {
    return this._db.deleteStudent(options);
  }

  async updateStudent(options: UpdateStudentOptions) {
    return this._db.updateStudent(options);
  }
}

export const studentRepository = new StudentRepository(getAppDataBase());
